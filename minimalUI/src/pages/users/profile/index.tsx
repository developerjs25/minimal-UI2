import { Box, Stack, Typography,} from "@mui/material";
import Breadcrumb from "../../../components/breadcrumbs";
import Images from "../../../constants/Images";
import { FONTS } from "../../../constants/fonts";


const Profile = () => {
  return (
    <Box sx={{maxWidth: 1500 , mx: "auto", pt: 0 }}>
      <Box>
        <Typography variant="h5" fontWeight={700} mb={3} sx={{ fontFamily: FONTS.primary }}> Profile</Typography>
        <Breadcrumb link1="/" linkName1="Dashboard" link2="/user/profile" linkName2="User" link3="/user/userlist" linkName3="Jaydon Frankie" />
      </Box>
      <Box sx={{  height: { xs: 180, md: 250 }, mt: 3, backgroundImage: `linear-gradient(#004b50cc, #004b50cc), url(${Images.profilebg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", borderRadius: 4, position: "relative", color: "white.main", boxShadow: `0 0 2px 0 rgba(145 158 171 / 20%), 0 12px 24px -4px rgba(145 158 171 / 12%)` }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ position: "absolute", left: { xs: 16, md: 25 },
            bottom: { xs: 20, md: 35 }, zIndex: 999 }}>
          <Box component="img" src={Images.Profile} alt="user"   sx={{ width: { xs: 80, md: 100 }, height: { xs: 80, md: 100 } ,borderRadius: "50%" }}/>
          <Box>
            <Typography variant="h5" fontWeight={700} fontSize={{ xs: 16, md: 20 }}> Jaydon Frankie</Typography>
            <Typography variant="h6" color="neutral.main" fontWeight={550}  fontSize={{ xs: 12, md: 15 }}> CTO</Typography>
          </Box>
        </Stack>
        <Box sx={{ position: "absolute", bottom: 0, width: "100%", bgcolor: "white.main",  height: { xs: 40, md: 50 },}} />
      </Box>
      <Stack direction={{ xs: "column", md: "row" }} spacing={4} marginTop={3}>
        <Box sx={{ boxShadow: `0 0 2px 0 rgba(145 158 171 / 20%), 0 12px 24px -4px rgba(145 158 171 / 12%)`, width: "100%", p: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight={550} fontSize={15}> Name</Typography>
            <Typography variant="h4" fontSize={14}> Jaydon Frankie </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight={550} fontSize={15}> Phone Number </Typography>
            <Typography variant="h4" fontSize={14}>+46 8 123 456 </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight={550} fontSize={15}> Status </Typography>
            <Typography variant="h4" fontSize={14}> CTO </Typography>
          </Box>
        </Box>
        <Box sx={{ boxShadow: `0 0 2px 0 rgba(145 158 171 / 20%), 0 12px 24px -4px rgba(145 158 171 / 12%)`, width: "100%", p: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight={550} fontSize={15}> Email Address </Typography>
            <Typography variant="h4" fontSize={14}> ashlynn.ohara62@gmail.com</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight={550} fontSize={15}> Role</Typography>
            <Typography variant="h4" fontSize={14}> Admin</Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Profile;