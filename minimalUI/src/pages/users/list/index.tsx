import { Box, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import List from "../../../components/list/UserList";
import Breadcrumb from "../../../components/breadcrumbs";
import { ListButton } from "../../../components/button/CustomButton";
import { useNavigate } from "react-router-dom";

const UserList = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ maxWidth: 1500 , mx: "auto", pt: 3.25,  pb: 9 }}>
            <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center" px={2}>
                <Box >
                    <Breadcrumb link1="/app/user/list" linkName1="Users" link2="/app/user/list" linkName2="List" />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end", }}>
                    <ListButton contant="Add user" icon={<AddIcon sx={{ fontSize: 16, mr: 1 }} />} click={() => navigate("/app/user/create")} />
                </Box>

            </Stack>

            <List />
        </Box>
    )
}

export default UserList