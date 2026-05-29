import { Box,} from "@mui/material";
import List from "../../../components/list/OrderList";
import Breadcrumb from "../../../components/breadcrumbs";


const OrderList = () => {
    return (
          <Box sx={{ maxWidth: 1500 , mx: "auto", pt: 3.25,  pb: 9 }}>
            <Box px={2}>
                <Breadcrumb link1="/app/order/list" linkName1="Order" link2="/app/order/list" linkName2="List" />
            </Box>
            <List />
        </Box>
    )
}

export default OrderList
