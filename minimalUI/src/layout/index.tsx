import { useState } from "react";
import Sidebar from "../components/ui/sidebar/index";
import { Box, useMediaQuery} from "@mui/material";
import Header from "../components/ui/header/index";
// import Footer from "../components/ui/footer";

const Layout = ({ children }: any) => {
  const isMobile = useMediaQuery("(max-width:1200px)");

  const [open, setOpen] = useState<boolean>(!isMobile);

  const toggleSidebar = () => {
    setOpen((prev) => !prev);
  };

  const drawerWidth = open ? 276 : 90;

  return (
    <Box sx={{}}>
      <Sidebar open={open} toggleSidebar={toggleSidebar} isMobile={isMobile} />
      <Box sx={{ transition: "margin 0.2s", marginLeft: { xs: 0, lg: `${drawerWidth}px`, }, }}>
        <Header toggleSidebar={toggleSidebar} showMenu={isMobile} open={open} />
        <Box>
          {children}
        </Box>
        {/* <Footer/> */}
      </Box>
    </Box>

  );
};

export default Layout;