import { Box, Stack, Typography, } from "@mui/material";
import List from "../../../components/list/ProductList";
import Breadcrumb from "../../../components/breadcrumbs";
import { ListButton } from "../../../components/button/CustomButton";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ pt: 0, px: 9 }}>
            <Stack direction="row" spacing={3} mt={3} justifyContent="space-between" alignItems="center" px={2}>
                <Box px={2}>
                    <Breadcrumb link1="/app/products/list" linkName1="Product" link2="/app/products/list" linkName2="List" />
                </Box>
                <ListButton contant="Add Product" icon={<AddIcon sx={{ fontSize: 16, mr: 1 }} />} click={() => navigate("/app/products/create")} />
            </Stack>

            <List />
        </Box>
    )
}

export default ProductList
