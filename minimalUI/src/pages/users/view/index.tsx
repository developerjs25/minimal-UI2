import { Box, Stack, Typography } from "@mui/material";
import Breadcrumb from "../../../components/breadcrumbs";
import Images from "../../../constants/Images";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

const Profile = () => {
    const { id } = useParams();
    const theme = useTheme();
    const [userData, setUserData] = useState<any>({
        id: 0,
        name: "",
        email: "",
        number: "",
        company: "",
        role: "",
        status: "",
    });

    useEffect(() => {
        const fetchUser = async () => {
            if (!id) return;

            try {
                const res = await axios.get(`http://localhost:3003/data/${id}`);
                setUserData(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUser();
    }, [id]);

    const defaultAddress = userData.addresses?.find(
        (addr: any) =>
            addr._id?.toString() ===
            userData.defaultAddressId?.toString()
    );

    return (
        <Box sx={{ maxWidth: 1500, mx: "auto", pb: 9, pt: 5 }}>
            <Box px={2} pb={3}>
                <Breadcrumb link1="/" linkName1="Users" link2="/app/user/list" linkName2="List" link3={`/app/user/view/${userData.id}`} linkName3={`${userData.firstName}${userData.lastName}`} />
            </Box>
            <Box sx={{ position: "relative", backgroundImage: `linear-gradient( #004b50cc, #004b50cc), url(${Images.profilebg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", minHeight: 300, color: "white.main", mt: 3, borderRadius: 4, boxShadow: `0 0 2px 0 rgba(145 158 171 / 20%), 0 12px 24px -4px rgba(145 158 171 / 12%)` }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ position: "absolute", left: 25, bottom: 35, zIndex: 999 }}>
                    <Box component="img" src={userData.image} alt="user" sx={{ borderRadius: "50%", width: 123 }} />
                    <Box >
                        <Typography variant="h5" fontWeight={700}>{userData.firstName}{userData.lastName}</Typography>
                        <Typography variant="h6" color="neutral.main" fontWeight={550} fontSize={15}>{userData.role}</Typography>
                    </Box>
                </Stack>
                <Box sx={{ position: "absolute", bottom: 0, width: "100%", backgroundColor: theme.palette.background.ViewPaperColor, height: 50 }}>
                </Box>
            </Box>
            <Box mt={3}>
                <Box sx={{ boxShadow: "0 0 2px 0 rgba(145,158,171,0.2), 0 12px 24px -4px rgba(145,158,171,0.12)", width: "100%", borderRadius: 4, overflow: "hidden", }}>
                    <Box sx={{ fontWeight: 600, fontSize: { xs: 16, sm: 17 }, px: 2, py: 1.5, backgroundColor: theme.palette.background.ViewPaperColor, }}>Personal Details</Box>
                    <Box sx={{}}>
                        <Box sx={{
                            display: "flex", justifyContent: "space-between", alignContent: "center", mb: 1.5, borderBottom: `1px dashed ${theme.palette.background.SidebarBorder}`, py: 1.5, px: { xs: 2, sm: 3 },
                        }}>
                            <Typography variant="subtitle2" fontWeight={550}>Name</Typography>
                            <Typography variant="body2">{userData.firstName}{userData.lastName}</Typography>
                        </Box>
                        <Box sx={{
                            display: "flex", justifyContent: "space-between", alignContent: "center", mb: 1.5, borderBottom: `1px dashed ${theme.palette.background.SidebarBorder}`, py: 1.5, px: { xs: 2, sm: 3 },
                        }}>
                            <Typography variant="subtitle2" fontWeight={550}>Email Address</Typography>
                            <Typography variant="body2">{userData.email}</Typography>
                        </Box>
                        <Box sx={{
                            display: "flex", justifyContent: "space-between", alignContent: "center", mb: 1.5, borderBottom: `1px dashed ${theme.palette.background.SidebarBorder}`, py: 1.5, px: { xs: 2, sm: 3 },
                        }}>
                            <Typography variant="subtitle2" fontWeight={550}>Phone Number</Typography>
                            <Typography variant="body2">{userData.phone}</Typography>
                        </Box>
                        <Box sx={{
                            display: "flex", justifyContent: "space-between", alignContent: "center", mb: 1.5, borderBottom: `1px dashed ${theme.palette.background.SidebarBorder}`, py: 1.5, px: { xs: 2, sm: 3 },
                        }}>
                            <Typography variant="subtitle2" fontWeight={550}>Country</Typography>
                            <Typography variant="body2">{defaultAddress?.country || "-"}</Typography>
                        </Box>
                        <Box sx={{
                            display: "flex", justifyContent: "space-between", alignContent: "center", mb: 1.5, borderBottom: `1px dashed ${theme.palette.background.SidebarBorder}`, py: 1.5, px: { xs: 2, sm: 3 },
                        }}>
                            <Typography variant="subtitle2" fontWeight={550}>State</Typography>
                            <Typography variant="body2">{defaultAddress?.stateName || "-"}</Typography>
                        </Box>
                        <Box sx={{
                            display: "flex", justifyContent: "space-between", alignContent: "center", mb: 1.5, borderBottom: `1px dashed ${theme.palette.background.SidebarBorder}`, py: 1.5, px: { xs: 2, sm: 3 },
                        }}>
                            <Typography variant="subtitle2" fontWeight={550}>City</Typography>
                            <Typography variant="body2">{defaultAddress?.city || "-"}</Typography>
                        </Box>
                        <Box sx={{
                            display: "flex", justifyContent: "space-between", alignContent: "center", mb: 1.5, borderBottom: `1px dashed ${theme.palette.background.SidebarBorder}`, py: 1.5, px: { xs: 2, sm: 3 },
                        }}>
                            <Typography variant="subtitle2" fontWeight={550}>Address</Typography>
                            <Typography variant="body2">{defaultAddress?.address1 || "-"}{defaultAddress?.address2 ? `, ${defaultAddress.address2}` : ""}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Profile