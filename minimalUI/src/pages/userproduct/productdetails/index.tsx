import { useState } from "react";
import { Box, Button, IconButton, Stack, Typography, Tooltip, Rating, CircularProgress, } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from "@mui/icons-material/Share";
import StyledChip from "../../../components/chip";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { ChevronLeft, } from "@mui/icons-material";
import { ListButton } from "../../../components/button/CustomButton";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { UserSelecter } from "../../../components/select";
import Toaster from "../../../components/toaster";
import ProductCart from "../productCard";


export default function UserProductDetails() {
    const [toast, setToast] = useState({ open: false, message: "", type: "", });
    const [selectedSize, setSelectedSize] = useState("");
    const [cartOpen, setCartOpen] = useState(false);
    const [availableSizes, setAvailableSizes] = useState<string[]>([]);
    const [colors, setColors] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const theme = useTheme();
    const { id } = useParams();
    const [address, setAddress] = useState<any>({});
    const [ProductData, setProductData] = useState<any>({
        productName: "",
        imageName: "",
        Productdescription: "",
        regularprice: "",
        quantity: "",
        saleprice: "",
        sizes: "",
        color: "",
    });

    useEffect(() => {
        const FetchProduct = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(`http://localhost:3003/product/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setProductData(res.data);

                setAvailableSizes(
                    res.data.sizes ? typeof res.data.sizes === "string" ? res.data.sizes.split(",") : res.data.sizes : []
                );

                setColors(
                    res.data.color ? typeof res.data.color === "string" ? res.data.color.split(",") : res.data.color : []
                );
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            FetchProduct();
        }
    }, [id]);

    const handleChange = (field: string, value: any) => {
        if (field === "sizes") {
            setAvailableSizes(value);
        }

        if (field === "colors") {
            setColors(value);
        }
    };

    const AvailableSizes = ProductData.sizes
        ? ProductData.sizes.split(",")
        : [];

    const availableColors = ProductData.colors
        ? ProductData.colors.split(",")
        : [];

    const available = ProductData.quantity || 0;

    const handleIncrease = () => {
        if (quantity < available) {
            setQuantity(prev => prev + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

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
                setToast({ open: true, message: "Error fetching default address", type: "error", });
                console.log(error);
            }
        };
        fetchDefaultAddress();
    }, [user.defaultAddressId]);

    const handleAddToCart = async () => {

        if (!colors || colors.length === 0) {
            setToast({ open: true, message: "Please select a color", type: "error", });
            return;
        }

        if (!selectedSize) {
            setToast({ open: true, message: "Please select a size", type: "error", });
            return;
        }

        if (quantity <= 0) {
            setToast({ open: true, message: "Please select quantity", type: "error", });
            return;
        }

        try {

            const user = JSON.parse(localStorage.getItem("user") || "{}");

            const cartData = {
                userId: user._id,
                customerName: user.firstName + " " + user.lastName,
                email: user.email,
                address: address,
                products: [
                    {
                        productId: ProductData._id,
                        productImage: ProductData.imageName,
                        productName: ProductData.productName,
                        productCode: ProductData.productCode,
                        category: ProductData.category,
                        quantity: quantity,
                        price: ProductData.saleprice,
                        selectedSizes: selectedSize,
                        selectedColors: colors,
                    },
                ],
            };
            try {
                if (!address || Object.keys(address).length === 0) {
                    setToast({ open: true, message: "No default address found. Please add an address before adding to cart.", type: "error", });
                    return;
                }

                const response = await fetch("http://localhost:3003/cart", { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify(cartData), });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to add to cart");
                }

                setCartOpen(true);

                setToast({
                    open: true,
                    message: "Item added to cart",
                    type: "success",
                });
            } catch (error: any) {
                setToast({
                    open: true,
                    message: error.message,
                    type: "error",
                });
            }

        } catch (err) {
            console.log("Add To Cart Error:", err);
            setToast({ open: true, message: "Something went wrong", type: "error", });
        }
    };

    return (
        <Box sx={{ px: 9, flexDirection: { xs: "column", md: "row" }, gap: { xs: 3, md: 6 } }}>
            <Box flex={1} sx={{ position: "relative" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={5} >
                    <Button onClick={() => navigate("/user/product")} startIcon={<ChevronLeft fontSize="small" />} sx={{ color: theme.palette.background.whiteBlack, fontWeight: 700, fontSize: 14, textTransform: "none", minWidth: "auto", padding: 0, "&:hover": { backgroundColor: "transparent" }, }} >Back</Button>
                    <Stack direction="row" spacing={1}>
                        <Tooltip title="Open in new tab">
                            <IconButton size="small" sx={{ color: "#637381" }}><OpenInNewIcon fontSize="small" /></IconButton>
                        </Tooltip>
                        <Tooltip title="Edit product">
                            <IconButton size="small" sx={{ color: "#637381" }}><EditIcon fontSize="small" /></IconButton>
                        </Tooltip>
                        <ListButton contant="Published" />
                    </Stack>
                </Stack>
                <Stack direction={{ xs: "column", md: "row" }} spacing={7} mb={1}>
                    <Box sx={{ width: "100%", maxWidth: { xs: "100%", sm: 500, md: 590 }, maxHeight: { xs: "auto", sm: 500, md: 590 }, mx: "auto", }}>
                        <Box sx={{ position: "relative", borderRadius: 4, overflow: "hidden", width: "100%", height: "100%", aspectRatio: "1 / 1", }}>
                            <Box component="img" src={`http://localhost:3003/uploads/${ProductData.imageName}`} sx={{ width: "100%", height: "100%", objectFit: "cover", }} />
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, width: "100%", mt: { xs: 3, md: 0 }, }}>
                        <StyledChip label="NEW" bgcolor="rgba(0 ,184 ,217, 0.16)" color="#006C9C" />
                        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 15, lineHeight: 1, mt: 2, }}
                            color={Number(ProductData.quantity) > 0 ? "#22C55E" : "error.main"} mb={2} >
                            {Number(ProductData.quantity) > 0 ? "IN STOCK " : "OUT OF STOCK"}
                        </Typography>
                        <Typography variant="h6" fontWeight={700} mt={1.5}>{ProductData.productName}</Typography>
                        <Stack direction="row" alignItems="center" spacing={0.5} mb={2}>
                            <Typography variant="caption" color="#919EAB" ml={0.7} fontSize={14} display="flex" alignItems="center" py={2}>
                                <Rating name="half-rating-read" defaultValue={3.7} precision={0.5} readOnly />
                                (9.12k reviews)
                            </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                            <Typography variant="h6" fontSize={22} fontWeight={700}> ${ProductData.saleprice} </Typography>
                            {ProductData.regularprice !== ProductData.saleprice && (
                                <Typography variant="h6" fontSize={15} sx={{ textDecoration: "line-through", color: "#767E95", }} > ${ProductData.regularprice} </Typography>)}
                        </Stack>
                        <Typography variant="body2" color="#767E95" pb={2} sx={{ lineHeight: 1.5, maxWidth: { xs: "100%", md: 410 }, borderBottom: "1px dashed #919eab33" }}>
                            {ProductData.Productdescription}
                        </Typography>
                        <Box display="flex" justifyContent="space-between" alignItems="center" py={2}>
                            <Typography fontWeight={600} mt={2} fontSize={15}>Color</Typography>
                            <UserSelecter label="Color" options={availableColors} value={colors} setSelected={setColors} handleChange={handleChange} fieldName="colors" />
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" py={2}>
                            <Typography fontWeight={600} mt={2} fontSize={15}>Size</Typography>
                            <UserSelecter label="Sizes" options={AvailableSizes} value={selectedSize} setSelected={setSelectedSize} handleChange={handleChange} fieldName="sizes" />
                        </Box>
                        <Box py={2} sx={{ borderBottom: "1px dashed #919eab33" }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" >
                                <Typography fontWeight={600} mt={2} fontSize={15}>Quantity</Typography>
                                <Box textAlign="center">
                                    <Box sx={{ display: "inline-flex", alignItems: "center", border: "1px solid #dcdcdc", borderRadius: "10px", overflow: "hidden", }}>
                                        <IconButton onClick={handleDecrease} sx={{ borderRadius: 0 }}> <RemoveIcon /></IconButton>
                                        <Typography sx={{ px: 3, py: 1, fontWeight: 500, minWidth: 30, textAlign: "center", backgroundColor: "#919eab14" }} > {quantity}</Typography>
                                        <IconButton onClick={handleIncrease} sx={{ borderRadius: 0 }}><AddIcon /></IconButton>
                                    </Box>
                                </Box>
                            </Box>
                            <Typography sx={{ mt: 1, fontSize: 12, color: "#4e6e8e", textAlign: "end" }} > Available: {ProductData.quantity || 0}</Typography>
                        </Box>

                        <Stack direction="row" spacing={2} py={3}>
                            <Button fullWidth onClick={handleAddToCart} sx={{ py: 1.5, borderRadius: 2, backgroundColor: "#919eab3d", textTransform: "none", fontWeight: 700, boxShadow: "none", }} startIcon={<LocalGroceryStoreIcon />} >Add to cart </Button>
                            <Button fullWidth onClick={() => navigate(`/user/order/product/${ProductData._id}`)} sx={{ py: 1.5, borderRadius: 2, backgroundColor: "#919eab3d", textTransform: "none", fontWeight: 600, boxShadow: "none" }}>{isLoading ? (<CircularProgress size={20} color="inherit" />) : ("Buy now")}</Button>
                        </Stack>
                        <Stack direction="row" justifyContent="center" alignItems="center" gap={3} color="#a0a8b9" fontSize={14}>
                            <Stack direction="row" gap={1} alignItems="center" color="#637381" sx={{ cursor: "pointer", fontWeight: 500 }} >
                                <AddIcon fontSize="small" />Compare
                            </Stack>
                            <Stack direction="row" gap={1} alignItems="center" color="#637381" sx={{ cursor: "pointer", fontWeight: 500 }}>
                                <FavoriteIcon sx={{ fontSize: 15 }} />
                                Favorite
                            </Stack>
                            <Stack direction="row" gap={1} alignItems="center" color="#637381" sx={{ cursor: "pointer", fontWeight: 500 }}>
                                <ShareIcon sx={{ fontSize: 15 }} />
                                Share
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
                <Box sx={{ display: "none" }}>
                    <ProductCart open={cartOpen} setOpen={setCartOpen} />
                </Box>
                <Toaster openToast={toast.open} setOpenToast={(open: boolean) => setToast({ ...toast, open })} contant={toast.message} color={toast.type} />
            </Box>
        </Box>
    );
}