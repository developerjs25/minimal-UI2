import { Box, Stack, Typography, } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate, useParams } from "react-router-dom";
import { ListButton } from "../../../components/button/CustomButton";
import CreateIcon from '@mui/icons-material/Create';
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import Toaster from "../../../components/toaster";
import type { CartItem } from "../../../Types";


const ProductOrderDetails = () => {
    const [toast, setToast] = useState({ open: false, message: "", type: "", });
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [address, setAddress] = useState<any>({});
    const { productId, userId } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const [ProductData, setProductData] = useState<any>({
        productId: "",
        productName: "",
        productcode: "",
        category: "",
        Productdescription: "",
        regularprice: "",
        quantity: "",
        saleprice: "",
        taxes: "",
        sizes: "",
        color: "",
        productImage: "",
    });


    const user = JSON.parse(localStorage.getItem("user") || "{}");

    useEffect(() => {
        const fetchDefaultAddress = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user") || "{}");

                const addressId = user?.defaultAddressId;

                if (!addressId) { console.log("No default address found"); return; }

                const token = localStorage.getItem("token");

                const res = await axios.get(`http://localhost:3003/address/${addressId}`, { headers: { Authorization: `Bearer ${token}`, }, });

                setAddress(res.data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchDefaultAddress();
    }, [user.defaultAddressId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const token = localStorage.getItem("token");

                if (productId) {
                    const res = await axios.get(`http://localhost:3003/product/${productId}`, { headers: { Authorization: `Bearer ${token}`, }, });

                    setProductData(res.data);

                    setCartItems([]);
                }

                else if (userId) {
                    const res = await axios.get(
                        `http://localhost:3003/cart/${userId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    setCartItems(res.data.products || []);

                    setProductData(null);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [productId, userId]);

    const handleCreateOrder = async () => {
        try {
            setIsLoading(true);

            const token = localStorage.getItem("token");

            const orderData = {
                userId: user._id,

                customerimage: user.image,

                customerName: `${user.firstName} ${user.lastName}`,
                email: user.email,
                phone: user.phone,

                address: {
                    address1: address.address1,
                    address2: address.address2,
                    city: address.city,
                    state: address.stateName,
                    country: address.country,
                },

                products: cartItems.map((item) => ({
                    productId: item.productId,
                    productImage: item.productImage,
                    category: item.category,
                    productName: item.productName,
                    productCode: item.productCode,
                    quantity: item.quantity,
                    taxes: item.taxes || 0,
                    price: item.price,
                    total: item.price * item.quantity!,
                })),

                total: cartItems.reduce(
                    (acc, item) => acc + item.price * item.quantity!,
                    0
                ),

                status: "pending",
            };
            await axios.post("http://localhost:3003/order", orderData, { headers: { Authorization: `Bearer ${token}`, }, });
            
            if (userId) {
                await axios.delete(`http://localhost:3003/cart/${userId}`, { headers: { Authorization: `Bearer ${token}`, }, });
            }
            setCartItems([]);

            setToast({ open: true, message: "Order placed successfully", type: "success", });

            setTimeout(() => {
                navigate("/user/product");
            }, 2000);

        } catch (error) {
            console.error("Order Error:", error);
        } finally {
            setIsLoading(false);
        }
    };
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );


    const taxes = cartItems.reduce(
        (acc, item) => acc + (item.taxes || 0) - item.quantity!,
        0
    );

    const grandTotal = subtotal + taxes;

    return (
        <>
            <Box sx={{ px: { xs: 2, sm: 3, md: 6 }, pb: 4, }}>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", gap: 2, }}>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                        <ArrowBackIosIcon sx={{ width: 14, }} onClick={() => navigate(-1)} />
                        <Typography variant="h5" fontWeight={700}>Order </Typography>
                    </Stack>
                    <ListButton contant="Edit" icon={<CreateIcon sx={{ fontSize: 16, mr: 1 }} />} click={() => navigate("")} />
                </Box>
                <Box sx={{ mt: 4, height: "auto", boxShadow: "0 3px 10px rgba(133, 131, 131, 0.12)", borderRadius: 2, alignItems: "center", gap: 3, }}>
                    <Typography variant="h5" fontSize={19} fontWeight={600} p={3} > Details </Typography>
                    {productId ? (
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `2px dashed ${theme.palette.background.SidebarBorder}`, p: 3, }}>
                            <Box>
                                <Box display="flex" gap={2}>
                                    <Box component="img" src={`http://localhost:3003/uploads/${ProductData?.imageName}`} alt="image"
                                        sx={{ width: 50, height: 50, borderRadius: 3, }} />
                                    <Stack>
                                        <Typography fontSize={14}>{ProductData?.productName}</Typography>
                                        <Typography fontSize={14} color="#919EAB">{ProductData?.category}</Typography>
                                    </Stack>
                                </Box>
                            </Box>
                            <Box display="flex" gap={6} alignItems="center">
                                <Typography fontSize={14}> x1</Typography>
                                <Typography fontSize={14} fontWeight={550} > ${ProductData?.saleprice} </Typography>
                            </Box>
                        </Box>
                    ) : (
                        cartItems.map((item) => (
                            <Box key={item._id} sx={{
                                display: "flex", justifyContent: "space-between", alignItems: "center",
                                borderBottom: `2px dashed ${theme.palette.background.SidebarBorder}`, p: 3,
                            }} >
                                <Box>
                                    <Box display="flex" gap={2} >
                                        <Box component="img" src={`http://localhost:3003/uploads/${item.productImage}`} alt="image" sx={{ width: 50, height: 50, borderRadius: 3, }} />
                                        <Stack>
                                            <Typography fontSize={14}> {item.productName} </Typography>
                                            <Typography fontSize={14} color="#919EAB" > {item.category} </Typography>
                                        </Stack>
                                    </Box>
                                </Box>

                                <Box display="flex" gap={6} alignItems="center" >
                                    <Typography fontSize={14}> x{item.quantity} </Typography>
                                    <Typography fontSize={14} fontWeight={550} > ${item.price * item.quantity!}</Typography>
                                </Box>
                            </Box>
                        ))
                    )}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", textAlign: { xs: "left", sm: "right" }, gap: 2, p: 3, }}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
                            <Typography fontSize={14} color="#637381" >Subtotal</Typography>
                            <Typography fontSize={14} color="#637381" >Taxes</Typography>
                            <Typography fontSize={16} fontWeight={600} >Total</Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", width: 220, gap: 2 }}>
                            <Typography fontSize={14} fontWeight={550}>${subtotal.toFixed(2)}</Typography>
                            <Typography fontSize={14} fontWeight={550}>${taxes.toFixed(2)}</Typography>
                            <Typography fontSize={16} fontWeight={550}>${grandTotal.toFixed(2)}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ my: 4, height: "auto", boxShadow: "0 3px 10px rgba(133, 131, 131, 0.12)", borderRadius: 2, alignItems: "center", gap: 3, }}>
                    <Box sx={{ borderBottom: `2px dashed ${theme.palette.background.SidebarBorder}`, p: { xs: 2, sm: 3 }, }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                            <Typography variant="h5" fontSize={19} fontWeight={600}>Customer</Typography>
                            <CreateIcon sx={{ color: "#637381" }} />
                        </Box>
                        <Box sx={{
                            display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" },
                            justifyContent: "space-between", gap: 2, mt: 3,
                        }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, }}>
                                <Box component="img" src={user.image} alt="image" sx={{
                                    width: { xs: 40, sm: 50 }, height: { xs: 40, sm: 50 },
                                    borderRadius: "50%",
                                }} />
                                <Stack spacing={0.5}>
                                    <Typography fontSize={14}>{user.firstName} {user.lastName}</Typography>
                                    <Typography fontSize={13} color="#919EAB">{user.email}</Typography>
                                </Stack>
                            </Box>
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
                            <Typography fontSize={14} fontWeight={550}>DHL</Typography>
                            <Typography fontSize={14} fontWeight={550}>Standard</Typography>
                            <Typography fontSize={14} fontWeight={550} sx={{ textDecoration: "underline" }}>SPX037739199373</Typography>
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
                            <Typography fontSize={14} fontWeight={550}>{address.address1}, {address.address2}, {address.city}, {address.stateName}, {address.country}</Typography>
                            <Typography fontSize={14} fontWeight={550}>{user.phone}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, }}>
                    <ListButton contant="Cancel" click={() => navigate(-1)} loading={isLoading} />
                    <ListButton contant="Buy Now" click={handleCreateOrder} loading={isLoading} />
                </Box>
                <Toaster openToast={toast.open} setOpenToast={(open: boolean) => setToast({ ...toast, open })} contant={toast.message} color={toast.type} />
            </Box>
        </>
    )
}
export default ProductOrderDetails