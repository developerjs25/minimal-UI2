import React, { useState } from "react";
import { Box, Button, IconButton, MenuItem, Select, Stack, Typography, Tooltip, Rating, Paper, type SelectChangeEvent, } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from "@mui/icons-material/Share";
import StyledChip from "../../../components/chip";
import CheckIcon from "@mui/icons-material/Check";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Thumbs, FreeMode } from "swiper/modules";
// import Images from "../../../constants/Images";
import { ListButton } from "../../../components/button/CustomButton";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
// const productImages = [Images.product1, Images.product2, Images.product3, Images.product4, Images.product5, Images.product6, Images.product7, Images.product8,];
import axios from "axios";

const sizes = ["7", "8", "9", "10", "11"];

export default function ProductDetailSlider() {
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = React.useState('9');
    // const [activeIndex, setActiveIndex] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const { id } = useParams();
    const [ProductData, setProductData] = useState<any>({
        productName: "",
        Productdescription: "",
        regularprice: "",
        quantity: "",
        saleprice: "",
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
    const handleChange = (event: SelectChangeEvent) => {
        setSelectedSize(event.target.value as string);
    };

    const [quantity, setQuantity] = useState(0);
    const available = ProductData.stock || 0;

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


    return (
        <Box sx={{ px: 9, flexDirection: { xs: "column", md: "row" }, gap: { xs: 3, md: 6 } }}>
            <Box flex={1} sx={{ position: "relative" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={5} >
                    <Button onClick={() => navigate("/app/products/list")} startIcon={<ChevronLeft fontSize="small" />} sx={{ color: theme.palette.background.whiteBlack, fontWeight: 700, fontSize: 14, textTransform: "none", minWidth: "auto", padding: 0, "&:hover": { backgroundColor: "transparent" }, }} >Back</Button>
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

                            {/* <Swiper onSlideChange={(swiper) => setActiveIndex(swiper.realIndex + 1)}
                                navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn", }} modules={[FreeMode, Navigation, Thumbs]}>
                                {productImages.map((img, i) => (
                                    <SwiperSlide key={i}>
                                        <Box component="img" src={`${img}?auto=format&fit=crop&w=800&q=80`} sx={{ width: "100%", height: "100%",  objectFit: "cover", }} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <Box sx={{ position: "absolute", bottom: 16, right: 16, zIndex: 9, display: "flex", alignItems: "center", bgcolor: "#141a217a", color: "#fff", borderRadius: 2, px: 1, }}>
                                <IconButton className="prev-btn" size="small" sx={{ color: "white.main" }}><ChevronLeft /></IconButton>
                                <Box sx={{ fontSize: 15, fontWeight: 600, }}>{activeIndex}/{productImages.length}</Box>
                                <IconButton className="next-btn" size="small" sx={{ color: "white.main" }}><ChevronRight /></IconButton>
                            </Box> */}
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
                            <Stack direction="row" spacing={2}>
                                <Box onClick={() => setSelectedColor("blue")} sx={{
                                    width: 20, height: 20, borderRadius: "50%", backgroundColor: "rgb(24, 144, 255);", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform 0.2s ease",
                                    boxShadow: selectedColor === "blue" ? "rgba(24, 144, 255, 0.48) 4px 4px 8px 0px" : "none",
                                    transform: selectedColor === "blue" ? "scale(1.5)" : "scale(1)"
                                }} >
                                    {selectedColor === "blue" && <CheckIcon sx={{ fontSize: 10, color: "white.main" }} />}
                                </Box>
                                <Box onClick={() => setSelectedColor("pink")} sx={{
                                    width: 20, height: 20, borderRadius: "50%", backgroundColor: "rgb(255, 192, 203)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform 0.2s ease",
                                    boxShadow: selectedColor === "blue" ? "none" : "rgba(255, 192, 203, 0.48) 4px 4px 8px 0px",
                                    transform: selectedColor === "pink" ? "scale(1.5)" : "scale(1)"
                                }} >
                                    {selectedColor === "pink" && <CheckIcon sx={{ fontSize: 10, color: "black.main" }} />}
                                </Box>
                            </Stack>
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" py={2}>
                            <Typography fontWeight={600} mt={2} fontSize={15}>Size</Typography>
                            <Select value={selectedSize} onChange={handleChange} size="small" sx={{ width: 90 }} >
                                {sizes.map((size) => (
                                    <MenuItem key={size} value={size}>{size}</MenuItem>
                                ))}
                            </Select>
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
                            <Button fullWidth disabled sx={{ py: 1.5, borderRadius: 2, backgroundColor: "#919eab3d", color: "#919eabcc", textTransform: "none", fontWeight: 700, boxShadow: "none", }} startIcon={<LocalGroceryStoreIcon />} >Add to cart </Button>
                            <Button fullWidth disabled sx={{ py: 1.5, borderRadius: 2, backgroundColor: "#919eab3d", color: "#919eabcc", textTransform: "none", fontWeight: 600, boxShadow: "none" }}>Buy now</Button>
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
            </Box>
        </Box>
    );
}