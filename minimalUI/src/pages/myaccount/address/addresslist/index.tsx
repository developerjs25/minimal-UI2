import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Stack, Typography, IconButton } from "@mui/material";
import { MapPin, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import ActionMenu from "../../../../components/ActionMenu";
import DeletePopup from "../../../../components/popup/Deletepopup";
import { useNavigate } from "react-router-dom";
import AddAddressPopup from "../../../../components/popup/Addaddresspopup";

interface Address {
    _id: string;
    address1: string;
    address2?: string;
    city: string;
    stateName?: string;
    country?: string;
}

const AddressList = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [openDeletePopup, setOpenDeletePopup] = useState(false);
    const [openAddressPopup, setOpenAddressPopup] = useState(false);

    const navigate = useNavigate();

    const fetchAddresses = async () => {
        try {
            const res = await axios.get("http://localhost:3003/addresses", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setAddresses(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const deleteAddress = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3003/address/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            fetchAddresses();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box sx={{ p: 2 }}>

            {addresses.length === 0 && (
                <Typography color="text.secondary">
                    No address found
                </Typography>
            )}

            <Grid container spacing={4}>
                {addresses.map((addr, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={addr._id}>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <Box
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    transition: "0.3s",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        background: "rgba(255,255,255,0.1)",
                                    },
                                }}
                            >
                                <Stack direction="row" spacing={3} alignItems="center">

                                    <Box sx={{ width: 45, height: 45, borderRadius: 2, background: `linear-gradient(135deg, #45b7d120, #45b7d110)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <MapPin size={20} color="#45b7d1" />
                                    </Box>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">


                                            <Typography fontWeight={600}>
                                                {addr.country}
                                            </Typography>
                                            <ActionMenu
                                                firstlink="View"
                                                secoundlink="Edit"
                                                thirdlink="Delete"
                                                onView={() => navigate(`/app/address/view/${addr._id}`)}
                                                onEdit={() => {
                                                    setSelectedId(addr._id);
                                                    setOpenAddressPopup(true);
                                                }}
                                                onDelete={() => {
                                                    setSelectedId(addr._id);
                                                    setOpenDeletePopup(true);
                                                }}
                                            />
                                            <IconButton size="small" onClick={() => deleteAddress(addr._id)} >
                                                <Trash2 size={18} />
                                            </IconButton>
                                        </Stack>

                                        <Typography fontSize={14} color="text.secondary">
                                            {addr.city}, {addr.stateName}
                                        </Typography>
                                        <Typography fontSize={14} color="text.secondary">
                                            {addr.address1}, {addr.address2}
                                        </Typography>



                                    </Box>
                                </Stack>
                            </Box>
                        </motion.div>

                    </Grid>
                ))}
            </Grid>

            <DeletePopup open={openDeletePopup} onClose={() => setOpenDeletePopup(false)} onConfirm={() => {
                    if (selectedId) {
                        deleteAddress(selectedId);
                    }
                    setOpenDeletePopup(false);
                }}
            />
            <AddAddressPopup
                open={openAddressPopup}
                id={selectedId}
                onClose={(success: boolean) => {
                    setOpenAddressPopup(false);
                    setSelectedId(null);

                    if (success) fetchAddresses(); 
                }}
            />
        </Box>
    );
};

export default AddressList;