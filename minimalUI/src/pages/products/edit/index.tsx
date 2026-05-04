import { Box, Typography,} from "@mui/material";
import { FONTS } from "../../../constants/fonts";
import Breadcrumb from "../../../components/breadcrumbs";
import ProductForm from "../components/DetailBox";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { productRows } from "../../../components/contact/ProductContant";

const EditProduct = () => {
     const { id } = useParams();
    const [ProductData, setProductData] = useState<any>({
        name: "",
        description: "",
        contect: "",
    });

    useEffect(() => {
        if (id) {
            const Product = productRows.find((item: { id: number; }) => item.id === Number(id));

            if (Product) {
                setProductData(Product);
            }
        }
    }, [id]);
    return (
        <Box sx={{ pt: 0 ,px: 9}}>
                <Box>
                    <Typography variant="h5" fontWeight={700} mb={3} p={0} sx={{ fontFamily: FONTS.primary, }}>Edit</Typography>
                    <Breadcrumb link1="/" linkName1="Dashboard" link2="/app/products/list" linkName2="Product" link3="/app/products/list" linkName3={ProductData.name} />
                </Box>
               <ProductForm ProductName={ProductData.name} Productdescription={ProductData.description} ProductContent={ProductData.contect} />
        </Box>
    )
}

export default EditProduct

