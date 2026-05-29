// import { useEffect, useState } from "react";
// import {
//     Box,
//     Grid,
//     Card,
//     CardContent,
//     Typography,
//     CardMedia,
//     Chip,
//     CircularProgress,
//     TextField,
//     InputAdornment,
//     Stack,
//     Button,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import axios from "axios";
// import { useTheme } from "@mui/material/styles";
// import BarLoader from "react-spinners/BarLoader";

// const UserProducts = () => {
//     const [products, setProducts] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [search, setSearch] = useState("");
//     const theme = useTheme();
//     useEffect(() => {
//         fetchProducts();
//     }, [search]);

//     const fetchProducts = async () => {
//         try {
//             setLoading(true);

//             const res = await axios.get("http://localhost:3003/product", {
//                 params: {
//                     search,
//                     publish: "Publish",
//                 },
//             });

//             // only published products
//             const publishedProducts = res.data.data.filter(
//                 (item: any) => item.publish === "Publish"
//             );

//             setProducts(publishedProducts);
//         } catch (error) {
//             console.log(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Box p={3}>
//             {/* Header */}
//             <Stack direction={{ xs: "column", sm: "row" }} justifyContent="center" alignItems="center" mb={4} gap={2} >
//                 <TextField placeholder="Search..." size="small" value={search} onChange={(e) => setSearch(e.target.value)} sx={{
//                     width: 550,
//                     "& .MuiOutlinedInput-root": { borderRadius: 2, py: 0.7, m: 2, },
//                     "&.Mui-focused fieldset": { borderColor: "#3b444e" },
//                 }}
//                     InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>), }}
//                 />
//             </Stack>
//             {/* Loader */}
//             {loading ? (
//                 <Box display="flex" justifyContent="center" mt={10}>
//                     <CircularProgress sx={{ color: theme.palette.green.main }} />
//                 </Box>
//             ) : (
//                 <Grid container spacing={3}>
//                     {products.map((item) => (
//                         <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item._id}>
//                             <Card sx={{
//                                 borderRadius: 4, overflow: "hidden", transition: "0.3s", backgroundColor: theme.palette.background.default, boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//                                 "&:hover": { transform: "translateY(-6px)", boxShadow: "0 10px 30px rgba(0,0,0,0.15)", },
//                             }}>
//                                 {/* Product Image */}
//                                 <CardMedia component="img" height="240" image={item.image} alt={item.productName} sx={{ objectFit: "cover", }} />
//                                 <CardContent>
//                                     <Chip label={item.category} size="small" sx={{ mb: 1.5, backgroundColor: "#E8F5E9", color: "#2E7D32", fontWeight: 600, }} />
//                                     <Typography variant="h6" fontWeight={700} gutterBottom >{item.productName}</Typography>
//                                     <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 45, }} > {item.Productdescription} </Typography>
//                                     <Stack direction="row" alignItems="center" spacing={1} mb={2}>
//                                         <Typography variant="h6" color="success.main" fontWeight={700}> ${item.saleprice} </Typography>
//                                         {item.regularprice !== item.saleprice && (
//                                             <Typography variant="body2" sx={{ textDecoration: "line-through", color: "#999", }} > ${item.regularprice} </Typography>)}
//                                     </Stack>
//                                     <Typography variant="body2" color={Number(item.quantity) > 0 ? "success.main" : "error.main"} mb={2} >
//                                         {Number(item.quantity) > 0 ? `In Stock (${item.quantity})` : "Out of Stock"}
//                                     </Typography>
//                                     <Button fullWidth variant="contained" sx={{
//                                         py: 1.2, borderRadius: 3, textTransform: "none", fontWeight: 600,
//                                         background: "linear-gradient(90deg,#00A76F,#00C853)",
//                                     }}>View Product</Button>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     ))}
//                 </Grid>
//             )}
//             {!loading && products.length === 0 && (
//                 <Box textAlign="center" mt={10}>
//                     <Typography variant="h6" color="text.secondary">
//                         No products found
//                     </Typography>
//                 </Box>
//             )}
//         </Box>
//     );
// };

// export default UserProducts;