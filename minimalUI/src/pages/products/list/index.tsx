import { Box, Stack, Typography, } from "@mui/material";
import List from "../../../components/list/ProductList";
import { FONTS } from "../../../constants/fonts";
import Breadcrumb from "../../../components/breadcrumbs";
import { ListButton } from "../../../components/button/CustomButton";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

const ProductList = () => {
     const navigate = useNavigate();
    return (
          <Box sx={{ pt: 0 ,px: 9}}>
            <Stack direction="row" spacing={3} mt={3} justifyContent="space-between" alignItems="center" px={2}>
                <Box>
                    <Typography variant="h5" fontWeight={700} mb={3} p={0} sx={{ fontFamily: FONTS.primary, }}>Product List</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end", }}>
                    <ListButton contant="Add Product" icon={<AddIcon sx={{ fontSize: 16, mr: 1 }} />} click={() => navigate("/app/products/create")} />
                </Box>
            </Stack>
            <Box px={2}>
                <Breadcrumb link1="/" linkName1="Dashboard" link2="/app/products/list" linkName2="Product" link3="/app/products/list" linkName3="List" />
            </Box>
            <List />
        </Box>
    )
}

export default ProductList
