import { Box, Typography,} from "@mui/material";
import { FONTS } from "../../../constants/fonts";
import Breadcrumb from "../../../components/breadcrumbs";
import ProductForm from "../components/DetailBox";

const CreateProduct = () => {
    return (
        <Box sx={{ pt: 0 ,px: 9}}>
                <Box>
                    <Typography variant="h5" fontWeight={700} mb={3} p={0} sx={{ fontFamily: FONTS.primary, }}>Create</Typography>
                    <Breadcrumb link1="/" linkName1="Dashboard" link2="/app/products/list" linkName2="Product" link3="/app/products/create" linkName3="Create" />
                </Box>
               <ProductForm/>
        </Box>
    )
}

export default CreateProduct

