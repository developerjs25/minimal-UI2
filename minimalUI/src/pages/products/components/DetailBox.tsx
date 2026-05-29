import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, Stack, } from "@mui/material";
import { UserInputField } from "../../../components/input/CustomInput";
import { ListButton } from "../../../components/button/CustomButton";
import { ProductSelecter, RoleSelecter, Selecter } from "../../../components/select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../../components/breadcrumbs";
import Toaster from "../../../components/toaster";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import ProductImage from "./ProductImage";
import axios from "axios";

const sizesNumber = ["8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13"];
const colorsList = ["Red", "Blue", "Pink", "Green", "Yellow", "Orange", "Black", "White"];


const ProductDetails = () => {
    const [toast, setToast] = useState({ open: false, message: "", type: "", });
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const theme = useTheme();
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [productData, setProductData] = useState({
        imageName: "",
        imageFile: null as File | null, 
        productName: "",
        Productdescription: "",
        publish: "",
        productcode: "",
        quantity: "",
        colors: "",
        category: "",
        sizes: "",
        regularprice: "",
        saleprice: "",
        gender: "",
        tax: "",
    });

    const handleChange = (field: string, value: any) => {

        setProductData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: false }));

    };
    const handleImageChange = (file: File) => {
        setProductData((prev) => ({
            ...prev,
            imageFile: file,
            imageName: file.name,
        }));
    };
    useEffect(() => {
        const FetchProduct = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(`http://localhost:3003/product/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                setProductData({
                    imageName: res.data.imageName || "",
                    imageFile: null,
                    productName: res.data.productName || "",
                    Productdescription: res.data.Productdescription || "",
                    publish: res.data.publish || "",
                    productcode: res.data.productcode || "",
                    quantity: res.data.quantity || "",
                    colors: res.data.colors || "",
                    category: res.data.category || "",
                    sizes: res.data.sizes || "",
                    regularprice: res.data.regularprice || "",
                    saleprice: res.data.saleprice || "",
                    gender: res.data.gender || "",
                    tax: res.data.tax || "",
                });
                setSelectedSizes(
                    res.data.sizes ? res.data.sizes.split(",") : []
                );
                setSelectedColors(
                    res.data.colors ? res.data.colors.split(",") : []
                );
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        FetchProduct();
    }, [id])

    const validate = () => {
        const newErrors: any = {};

        if (!productData.productName) newErrors.productName = true;
        if (!productData.productcode) newErrors.productcode = true;
        if (!productData.Productdescription) newErrors.Productdescription = true;
        if (!productData.publish) newErrors.publish = true;
        if (!productData.quantity) newErrors.quantity = true;
        if (!productData.colors) newErrors.colors = true;
        if (!productData.category) newErrors.category = true;
        if (!productData.saleprice) newErrors.saleprice = true;
        if (!productData.tax) newErrors.tax = true;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        setIsLoading(true);

        try {
            const formData = new FormData();


            if (productData.imageFile) {
                formData.append("image", productData.imageFile);
            }

            formData.append("productName", productData.productName);
            formData.append("Productdescription", productData.Productdescription);
            formData.append("productcode", productData.productcode);
            formData.append("quantity", productData.quantity);
            formData.append("category", productData.category);
            formData.append("gender", productData.gender);
            formData.append("tax", productData.tax);
            formData.append("publish", productData.publish);
            formData.append("regularprice", productData.regularprice);
            formData.append("saleprice", productData.saleprice);
            formData.append("sizes", selectedSizes.join(","));
            formData.append("colors", selectedColors.join(","));

            if (id) {
                await axios.put(`http://localhost:3003/product/${id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
            } else {
                await axios.post("http://localhost:3003/product", formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
            }

            setToast({ open: true, message: id ? "Product update successfully!" : "Product created successfully!", type: "success", });

            setTimeout(() => {
                navigate("/app/products/list");
            }, 1500);

            setProductData({
                imageName: "",
                imageFile: null,
                productName: "",
                Productdescription: "",
                publish: "",
                productcode: "",
                quantity: "",
                colors: "",
                category: "",
                sizes: "",
                regularprice: "",
                saleprice: "",
                gender: "",
                tax: "",
            });

        } catch (err) {
            console.error(err);
            setToast({ open: true, message: "Failed to create product", type: "error", });
        } finally {
            setIsLoading(false);
        }
    };
    console.log(productData.imageName, "this is image name");

    return (
        <Box>
            <Box sx={{ pt: 3 }}>
                <Breadcrumb link1="/app/products/list" linkName1="Product" link2={id ? `/app/products/edit/${id}` : "/app/products/create"} linkName2={id ? "Edit" : "List"} link3="/app/products/list" linkName3={id ? productData.productName : "Create"} />
            </Box>
            <Box p={{ xs: 2, md: 3 }} sx={{ backgroundColor: theme.palette.background.default, borderRadius: 3, }}>
                {/* DETAILS */}
                <Accordion defaultExpanded disableGutters sx={{
                    mb: 3, borderRadius: "18px !important", overflow: "hidden", boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                    backgroundColor: theme.palette.background.default, "&:before": { display: "none" },
                }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: { xs: 2, md: 3 }, py: 1, }}>
                        <Box>
                            <Typography fontWeight={700} fontSize={18}> Details</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}> Title, description and product image</Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ borderTop: "1px solid #919eab22", p: { xs: 2, md: 3 }, }}>
                        <Grid container spacing={4} alignItems="stretch">
                            {/* IMAGE */}
                            <Grid size={{ xs: 12, md: 5 }}>
                                <ProductImage
                                    error={errors.image}
                                    image={productData.imageName}
                                    onChange={handleImageChange}
                                />
                            </Grid>
                            {/* INFO */}
                            <Grid size={{ xs: 12, md: 7 }}>
                                <Stack spacing={3}>
                                    <Typography fontWeight={700} fontSize={15}>Product Information</Typography>
                                    <UserInputField PlaceHolder="Product name" value={productData.productName} onChange={(e) => handleChange("productName", e.target.value)}
                                        error={errors.productName} />
                                    <UserInputField PlaceHolder="Description" value={productData.Productdescription} onChange={(e) => handleChange("Productdescription", e.target.value)} row={5} error={errors.Productdescription} />
                                </Stack>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>

                {/* PROPERTIES */}
                <Accordion defaultExpanded disableGutters sx={{
                    mb: 3, borderRadius: "18px !important", overflow: "hidden", boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                    backgroundColor: theme.palette.background.default, "&:before": { display: "none" },
                }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: { xs: 2, md: 3 }, py: 1, }}>
                        <Box>
                            <Typography fontWeight={700} fontSize={18}>Properties</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }} > Product specifications and attributes... </Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ borderTop: "1px solid #919eab22", p: { xs: 2, md: 3 }, }}>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <UserInputField PlaceHolder="Product code" value={productData.productcode} onChange={(e) => handleChange("productcode", e.target.value)}
                                    error={errors.productcode} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <UserInputField PlaceHolder="Quantity" value={productData.quantity} onChange={(e) => handleChange("quantity", e.target.value)} error={errors.quantity} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <ProductSelecter label="Colors" options={colorsList} value={selectedColors} setSelected={setSelectedColors} handleChange={handleChange} fieldName="colors" />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <ProductSelecter label="Sizes" options={sizesNumber} value={selectedSizes} setSelected={setSelectedSizes} handleChange={handleChange}
                                    fieldName="sizes" />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography fontWeight={600} mb={1} fontSize={14}>Gender</Typography>
                                <Selecter value={productData.gender} onChange={(value: string) => handleChange("gender", value)} error={errors.gender} label="Select Gender" FirstItem="Male" SecondItem="Female" ThridItem="Kids" />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography fontWeight={600} mb={1} fontSize={14}>Category</Typography>
                                <UserInputField PlaceHolder="Category" value={productData.category} onChange={(e) => handleChange("category", e.target.value)}
                                    error={errors.category} />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>

                {/* PRICING */}
                <Accordion defaultExpanded disableGutters sx={{
                    mb: 3, borderRadius: "18px !important", overflow: "hidden", boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                    backgroundColor: theme.palette.background.default, "&:before": { display: "none" },
                }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: { xs: 2, md: 3 }, py: 1, }}>
                        <Box>
                            <Typography fontWeight={700} fontSize={18}>Pricing</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Product pricing details</Typography>
                        </Box>
                    </AccordionSummary>

                    <AccordionDetails sx={{ borderTop: "1px solid #919eab22", p: { xs: 2, md: 3 }, }} >
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <UserInputField PlaceHolder="Regular price" startContant="$" value={productData.regularprice} onChange={(e) => handleChange("regularprice", e.target.value)}
                                    error={errors.regularprice} />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <UserInputField PlaceHolder="Sale price" startContant="$" value={productData.saleprice} onChange={(e) => handleChange("saleprice", e.target.value)}
                                    error={errors.saleprice} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <UserInputField PlaceHolder="Tax (%)" startContant="%" value={productData.tax} onChange={(e) => handleChange("tax", e.target.value)}
                                    error={errors.tax} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <RoleSelecter value={productData.publish} onChange={(value: string) => handleChange("publish", value)} error={errors.publish} label="Publish or Draft"
                                    FirstItem="Publish" SecondItem="Draft" />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>

                {/* BUTTON */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, }} >
                    <ListButton contant={id ? "Update Product" : "Create Product"} click={handleSubmit} loading={isLoading} />
                </Box>
                <Toaster openToast={toast.open} setOpenToast={(open: boolean) => setToast({ ...toast, open })} contant={toast.message} color={toast.type} />
            </Box>
        </Box>
    );
};

export default ProductDetails;

