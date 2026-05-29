import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import ActionMenu from "../../../../components/ActionMenu";
import DeletePopup from "../../../../components/popup/Deletepopup";
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
    const [defaultAddressId, setDefaultAddressId] = useState<string | null>(null);

    const theme = useTheme();

    // const fetchAddresses = async () => {
    //     try {
    //         const res = await axios.get("http://localhost:3003/addresses", {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
    //             },
    //         });
    //         setAddresses(res.data);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    useEffect(() => {
        fetchAddresses();
    }, []);
    const fetchAddresses = async () => {
        try {
            const res = await axios.get("http://localhost:3003/addresses", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setAddresses(res.data.addresses);
            setDefaultAddressId(res.data.defaultAddressId);

        } catch (err) {
            console.error(err);
        }
    };

    // const deleteAddress = async (id: string) => {
    //     try {
    //         await axios.delete(`http://localhost:3003/address/${id}`, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
    //             },
    //         });
    //         fetchAddresses();
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };
   const deleteAddress = async (addressId: string) => {
    try {
        const userId = localStorage.getItem("userId"); 

        await axios.delete(`http://localhost:3003/address/${addressId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const res = await axios.get(`http://localhost:3003/data/${userId}`);
        const user = res.data;

        const remainingAddresses = user.addresses?.filter(
            (a: any) => a._id !== addressId
        );

        let newDefaultId = user.defaultAddressId;

        if (user.defaultAddressId === addressId) {
            newDefaultId = remainingAddresses?.[0]?._id || null;
        }

        await axios.put(`http://localhost:3003/data/${userId}`, {
            addresses: remainingAddresses,
            defaultAddressId: newDefaultId,
        });

        setAddresses(remainingAddresses);
        setDefaultAddressId(newDefaultId);

    } catch (err) {
        console.error("Delete address failed:", err);
    }
};
    const makeDefaultAddress = async (id: string) => {
        try {
            await axios.put(
                `http://localhost:3003/user/default-address/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

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
                            <Box sx={{
                                p: 3, borderRadius: 3,
                                background: defaultAddressId === addr._id ? "#45b7d120" : "rgba(255,255,255,0.05)",
                                border: `1px solid ${defaultAddressId === addr._id ? "#45b7d1" : theme.palette.background.addressborder}`,

                                transition: "0.3s",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    background: defaultAddressId === addr._id ? "#45b7d130" : "rgba(255,255,255,0.1)",
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
                                            <ActionMenu firstlink={defaultAddressId === addr._id ? "Default Address" : "Make Default"}
                                                secoundlink="Edit"
                                                thirdlink="Delete"
                                                onView={() => { if (defaultAddressId !== addr._id) { makeDefaultAddress(addr._id); } }}
                                                onEdit={() => { setSelectedId(addr._id); setOpenAddressPopup(true); }}
                                                onDelete={() => { setSelectedId(addr._id); setOpenDeletePopup(true); }}
                                            />
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

            <DeletePopup open={openDeletePopup} onClose={() => setOpenDeletePopup(false)}
                onConfirm={() => { if (selectedId) { deleteAddress(selectedId); } setOpenDeletePopup(false); }}
            />
            <AddAddressPopup open={openAddressPopup} id={selectedId}
                onClose={() => { setOpenAddressPopup(false); setSelectedId(null); }}
                onConfirm={(success: boolean) => { setOpenAddressPopup(false); setSelectedId(null); if (success) { fetchAddresses(); } }}
            />
        </Box>
    );
};

export default AddressList;