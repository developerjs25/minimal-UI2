import ProductCart from "../../../pages/userproduct/productCard";
import IconButton from "@mui/material/IconButton";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Images from "../../../constants/Images";
import { useLocation } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Notification from "../notification";
import Settings from "../settings";
import Profile from "../profile";
import { useState } from "react";

export default function Header({ toggleSidebar, showMenu, open }: any) {
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();

  const pageTitles: Record<string, string> = {
    "/app/user/list": "User List",
    "/app/user/profile": "User Profile",
    "/app/user/create": "Create User",
    "/app/products/create": "Create Product",
    "/app/products/list": "Product List",
    "/app/order/list": "Order List",
    "/app/notification": "Notification",
    "/app/myaccount": "My Account",
    "/user/product": "Our Products",
  };
  const getPageTitle = (pathname: string) => {
    if (pathname.startsWith("/app/user/edit")) return "Edit User";
    if (pathname.startsWith("/app/user/view")) return "User Details";
    if (pathname.startsWith("/app/products/edit")) return "Edit Product";
    if (pathname.startsWith("/app/products/details")) return "Product Details";
    if (pathname.startsWith("/app/order/details")) return "Order Details";

    return pageTitles[pathname] || "Users";
  };


  const currentPage = getPageTitle(location.pathname);

  return (
    <Box sx={{ flexGrow: 1, backdropFilter: "blur(4px)", backgroundColor: theme.palette.background.blurBackground, transition: "all 0.3s ease", position: "sticky", top: 0, zIndex: 1100, }} >
      <Toolbar sx={{ px: 2 , transition: "all 0.3s ease", }}>
        {showMenu && (
          <IconButton color="inherit" edge="start" onClick={toggleSidebar}>
            <Box component="img" src={Images.responsiveheadericon} sx={{ width: 26 }} />
          </IconButton>
        )}
        <Typography variant="h6" fontWeight={600}sx={{ display: { xs: "none", sm: "block" } }}>
          {currentPage}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {/* <IconButton sx={{ display: { xs: "none", md: "flex" }, "&:hover": { backgroundColor: "transparent" }, }} >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, backgroundColor: "neutral.light", px: 1.5, py: 0.75, borderRadius: 2, }}>
            <SearchIcon sx={{ color: "neutral.main", fontSize: 20 }} />
            <Box component="span" sx={{ fontSize: 12, fontWeight: 600, px: 1, py: 0.25, borderRadius: 1, backgroundColor: "white.main", }} > ⌘K </Box>
          </Box>
        </IconButton> */}
        <IconButton size="large" color="inherit" sx={{ "&:hover": { backgroundColor: "transparent" } }}>
           <ProductCart open={cartOpen} setOpen={setCartOpen} />
        </IconButton>
        <IconButton size="large" color="inherit" sx={{ "&:hover": { backgroundColor: "transparent" } }}>
          <Notification />
        </IconButton>
        <IconButton size="large" color="inherit" sx={{ "&:hover": { backgroundColor: "transparent" }, }} >
          <Settings />
        </IconButton>
        <Profile />
        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 0.50, ml: 2, 
          backgroundColor: theme.palette.background.whiteBlack,  p: 0.50, borderRadius: 50, cursor: "pointer", }}>
        <Box sx={{ position: 'relative', width: 38, height: 38, }}>
          <Box sx={{
            position: 'absolute', inset: 0, borderRadius: '50%', padding: '2px',
            background: `conic-gradient(#FFAB00, ${theme.palette.success.main}, ${theme.palette.warning.main})`,
            animation: 'rotateBorder 4s linear infinite',
            '@keyframes rotateBorder': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' }, },
          }}
          />
          <Box sx={{ position: 'absolute', inset: '2px', borderRadius: '50%', backgroundColor: theme.palette.background.default, zIndex: 1, }} />
          <Avatar src={Images.Profile} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 34, height: 34, zIndex: 2, }} />
          </Box>
          <Typography variant="body2" sx={{ color: theme.palette.background.TableRowColor,fontSize: 15 ,fontWeight: 500}} >
            John Doe
          </Typography>
        </Box> */}
      </Toolbar>
    </Box>
  );
}