import { Box, Button, Stack, Typography, } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import StyledChip from "../../../components/chip";
import { useNavigate } from "react-router-dom";
import { ListButton } from "../../../components/button/CustomButton";
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Order } from "../../../Types";
import { orders } from ".././../../components/contact/OrderContant";
import { useTheme } from "@mui/material/styles";


const OrderDetails = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { id } = useParams();
    const [order, setOrderData] = useState<Order>();

    useEffect(() => {
        if (!id) return;

        const foundOrder = orders.find(
            (order) => order.id === Number(id)
        );

        if (foundOrder) {
            setOrderData(foundOrder);
        } else {
            console.error("Order not found");
        }
    }, [id]);

    if (!order) return <Box>Loading...</Box>;

    return (
        <>
            <Box sx={{ px: { xs: 2, sm: 3, md: 6 }, }}>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", gap: 2, }}>
                    <Stack direction="row" spacing={1}>
                        <ArrowBackIosIcon sx={{ width: 14, mt: 5 }} />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography variant="h5" fontWeight={700}>Order #{order.id}</Typography>
                                <StyledChip label={order.status} bgcolor="rgba(34, 197, 94, 0.16)" color="#118D57" />
                            </Stack>
                            <Typography fontSize={15} color="text.secondary">{order.date}</Typography>
                        </Box>
                    </Stack>
                    <ListButton contant="Edit" icon={<CreateIcon sx={{ fontSize: 16, mr: 1 }} />} click={() => navigate("")} />
                </Box>
                <Box sx={{ mt: 4, height: "auto", boxShadow: "0 3px 10px rgba(133, 131, 131, 0.12)", borderRadius: 2, alignItems: "center", gap: 3, }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `2px dashed ${theme.palette.background.SidebarBorder}`, p: 3 }}>
                        <Box>
                            <Typography variant="h5" fontSize={19} fontWeight={600}>Details</Typography>
                            <Box display="flex" gap={2} mt={3} sx={{ flexDirection: { xs: "column", sm: "row" }, }}>
                                <Box component="img" src={order.product.image} alt="image" sx={{ width: 50, height: 50, borderRadius: 3 }} />
                                <Stack>
                                    <Typography fontWeight={400} fontSize={14}>{order.product.name}</Typography>
                                    <Typography fontSize={14} color="#919EAB">{order.product.sku}</Typography>
                                </Stack>
                            </Box>
                        </Box>
                        <Box>
                            <Box sx={{ display: "flex", justifyContent: "end" }}>
                                <CreateIcon sx={{ color: "#637381", }} />
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "space-between", sm: "flex-end" }, gap: { xs: 2, sm: 6 }, mt: 3, }}>
                                <Typography fontSize={14} >x{order.product.quantity}</Typography>
                                <Typography fontSize={14} fontWeight={550}>$83.74</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", textAlign: { xs: "left", sm: "right" }, gap: 2, p: 3, }}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
                            <Typography fontSize={14} color="#637381" >Subtotal</Typography>
                            <Typography fontSize={14} color="#637381" >Shipping</Typography>
                            <Typography fontSize={14} color="#637381" >Discount</Typography>
                            <Typography fontSize={14} color="#637381" >Taxes</Typography>
                            <Typography fontSize={16} fontWeight={600} >Total</Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", width: 220, gap: 2 }}>
                            <Typography fontSize={14} fontWeight={550}> ${order.subtotal}</Typography>
                            <Typography fontSize={14} fontWeight={550} color="#FF5630">- ${order.shipping}</Typography>
                            <Typography fontSize={14} fontWeight={550} color="#FF5630">- ${order.discount}</Typography>
                            <Typography fontSize={14} fontWeight={550} >${order.taxes}</Typography>
                            <Typography fontSize={16} fontWeight={550}>${order.total}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ my: 4, height: "auto", boxShadow: "0 3px 10px rgba(133, 131, 131, 0.12)", borderRadius: 2, alignItems: "center", gap: 3, }}>
                    <Box sx={{ borderBottom: `2px dashed ${theme.palette.background.SidebarBorder}`, p: { xs: 2, sm: 3 }, }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                            <Typography variant="h5" fontSize={19} fontWeight={600}>Customer</Typography>
                            <CreateIcon sx={{ color: "#637381" }} />
                        </Box>
                        {/* CUSTOMER DETAILS */}
                        <Box sx={{
                            display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" },
                            justifyContent: "space-between", gap: 2, mt: 3,
                        }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, }}>
                                <Box component="img" src={order.customer.image} alt="image" sx={{
                                    width: { xs: 40, sm: 50 }, height: { xs: 40, sm: 50 },
                                    borderRadius: "50%",
                                }} />
                                <Stack spacing={0.5}>
                                    <Typography fontSize={14}>{order.customer.name}</Typography>
                                    <Typography fontSize={13} color="#919EAB">{order.customer.email}</Typography>
                                    <Typography fontSize={13} color="#919EAB">IP: {order.customer.ip}</Typography>
                                </Stack>
                            </Box>
                            <Button variant="contained" startIcon={<AddIcon />}
                                sx={{
                                    textTransform: "none", borderRadius: 2, fontWeight: 600, color: "#FF5630", boxShadow: "none", width: { xs: "100%", sm: "auto" },
                                    "&:hover": { backgroundColor: "#fad6ce80", boxShadow: "none", },
                                }}>Add to blacklist
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 3 }}>
                        <Box><Typography variant="h5" fontSize={19} fontWeight={600}>Delivery</Typography></Box>
                        <Box sx={{ display: "flex", justifyContent: "end" }}><CreateIcon sx={{ color: "#637381", }} /></Box>
                    </Box>
                    <Box sx={{ display: "flex", borderBottom: `2px dashed ${theme.palette.background.SidebarBorder}`, p: 3, gap: { xs: 4, sm: 12, md: 24 } }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Typography fontSize={14} color="#637381" >Ship by</Typography>
                            <Typography fontSize={14} color="#637381" >Speedy</Typography>
                            <Typography fontSize={14} color="#637381" >Tracking No.</Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Typography fontSize={14} fontWeight={550}> {order.delivery.shipBy}</Typography>
                            <Typography fontSize={14} fontWeight={550}>{order.delivery.speed}</Typography>
                            <Typography fontSize={14} fontWeight={550} sx={{ textDecoration: "underline" }}>{order.delivery.tracking}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 3 }}>
                        <Box>
                            <Typography variant="h5" fontSize={19} fontWeight={600}>Shipping</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "end" }}>
                            <CreateIcon sx={{ color: "#637381", }} />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: { xs: 4, sm: 12, md: 24 }, p: 3, }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Typography fontSize={14} color="#637381" >Address</Typography>
                            <Typography fontSize={14} color="#637381" >Phone number</Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Typography fontSize={14} fontWeight={550}>{order.shippingAddress.address}</Typography>
                            <Typography fontSize={14} fontWeight={550}>{order.shippingAddress.phone}</Typography>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </>
    )
}
export default OrderDetails