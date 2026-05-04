import { Box, Stack, Typography, } from "@mui/material";
import List from "../../../components/list/OrderList";
import { FONTS } from "../../../constants/fonts";
import Breadcrumb from "../../../components/breadcrumbs";


const OrderList = () => {
    return (
          <Box sx={{ pt: 0 ,px: 9}}>
            <Stack direction="row" spacing={3} mt={3} justifyContent="space-between" alignItems="center" px={2}>
                <Box>
                    <Typography variant="h5" fontWeight={700} mb={3} p={0} sx={{ fontFamily: FONTS.primary, }}>Order List</Typography>
                </Box>
            </Stack>
            <Box px={2}>
                <Breadcrumb link1="/" linkName1="Dashboard" link2="/app/order/list" linkName2="Order" link3="/app/order/list" linkName3="List" />
            </Box>
            <List />
        </Box>
    )
}

export default OrderList
