import { List, ListItemText, Typography, Collapse, Box, Avatar, Stack, IconButton, ListItemButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Images from "../../../constants/Images";
import { productItems, userItems, orderItems } from "../Contant";
import { Drawer } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Logosvg } from "../../svgs";

const Sidebar = ({ open, toggleSidebar, isMobile }: any) => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();

    const handleHover = (event: any, type: string) => {
        if (!open) {
            const rect = event.currentTarget.getBoundingClientRect();

            setPopupPosition({
                top: rect.top,
                left: rect.right,
            });

            setHoveredItem(type);
        }
    };

    const handleMenuToggle = (menu: string) => {
        setOpenMenu((prev) => (prev === menu ? null : menu));
    };

    return (
       <Drawer variant={isMobile ? "temporary" : "permanent"}
  open={open}
  onClose={toggleSidebar}
  sx={{
    "& .MuiDrawer-paper": {
      width: open ? 276 : 90,
      transition: "width 0.2s",
      backgroundColor: "transparent !important", 
      borderRight: "none",
      boxShadow: "none",
    },
    "& .MuiBackdrop-root": {
      backgroundColor: "transparent",
    },
  }}
>
            <Box sx={{
                position: "fixed", top: 0, left: 0, width: open ? 270 : 90, height: "97.5vh", display: "flex", flexDirection: "column", borderRadius: 4,
                border: `1px solid ${theme.palette.background.SidebarBorder}`, transition: "width 0.4s", zIndex: 1200, m: 1,my: 1.5, backgroundColor: theme.palette.background.default,
            }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pt: 2.5, pb: 1, px: 3, position: "relative", }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography sx={{ width: 40, color: "green.main" }}><Logosvg /></Typography>
                        {open && (<Typography fontWeight={600} color="green.main">Minimals</Typography>)}
                    </Stack>
                    {!isMobile && (
                        <IconButton onClick={toggleSidebar}
                            sx={{
                                position: "absolute", top: 40, right: 0, transform: "translate(50%, -50%)", width: 25, height: 25, borderRadius: "50%",
                                border: `1px solid ${theme.palette.background.SidebarBorder}`, backgroundColor: theme.palette.background.default, color: "#637381",
                                zIndex: 1300, "&:hover": { backgroundColor: theme.palette.background.buttonHover, },
                            }}
                        >
                            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    )}
                </Box>
                <Box sx={{ flex: 1,  px: open ? 2 : 0, }}>
                    <List disablePadding>
                        {/* USER */}
                        <ListItemButton onClick={() => handleMenuToggle("user")} onMouseEnter={(e) => handleHover(e, "user")} onMouseLeave={() => setHoveredItem(null)}
                            sx={{
                                flexDirection: open ? "row" : "column", px: 1.5, borderRadius: 2, mb: 0.5,
                                "&:focus": {
                                    backgroundColor: "rgba(0 167 111 / 16%)", color: "green.main",
                                    filter: "invert(46%) sepia(69%) saturate(413%) hue-rotate(115deg) brightness(90%) contrast(90%)",
                                },
                            }}>
                            <Avatar src={Images.Usericon} sx={{ width: 24, height: 24, mr: 1, filter: "invert(45%) sepia(8%) saturate(500%) hue-rotate(170deg) brightness(90%)", }} />
                            <ListItemText primary="User" primaryTypographyProps={{ sx: { color: "#637381", fontSize: open ? 17 : 13 }, }} />
                            {open &&
                                (openMenu === "user" ? (<ExpandMoreIcon sx={{ color: "#637381" }} />) : (<ChevronRightIcon sx={{ color: "#637381" }} />))}
                        </ListItemButton>
                        {open && (
                            <Collapse in={openMenu === "user"}>
                                <Box sx={{ ml: 5, mt: 0.5, position: "relative" }}>
                                    <Box sx={{ position: "absolute", left: 0, top: -3, bottom: 25, width: "2px", backgroundColor: theme.palette.background.SidebarBorder, }} />
                                    {userItems.map((item) => (
                                        <Box key={item.path} sx={{ position: "relative", pl: 2 }}>
                                            <Box sx={{ position: "absolute", left: 0, top: 5, width: 16, height: 16, borderLeft: `2px solid ${theme.palette.background.SidebarBorder}`, borderBottom: `2px solid ${theme.palette.background.SidebarBorder}`, borderBottomLeftRadius: "8px", }} />
                                            <ListItemButton selected={location.pathname === item.path} onClick={() => navigate(item.path)}
                                                sx={{ py: 0.5, my: 0.5, minHeight: 36, borderRadius: 1, color: "#637381", }}>
                                                <ListItemText primary={item.label} />
                                            </ListItemButton>
                                        </Box>
                                    ))}
                                </Box>
                            </Collapse>
                        )}
                    </List>
                    <List disablePadding>
                        {/* PRODUCTS */}
                        <ListItemButton onClick={() => handleMenuToggle("products")} onMouseEnter={(e) => handleHover(e, "products")} onMouseLeave={() => setHoveredItem(null)}
                            sx={{
                                flexDirection: open ? "row" : "column", px: 1.5, borderRadius: 2, mb: 0.5,
                                "&:focus": {
                                    backgroundColor: "rgba(0 167 111 / 16%)", color: "green.main",
                                    filter: "invert(46%) sepia(69%) saturate(413%) hue-rotate(115deg) brightness(90%) contrast(90%)",
                                },
                            }}>
                            <Avatar src={Images.Producticon} sx={{ width: 24, height: 24, mr: 1, filter: "invert(45%) sepia(8%) saturate(500%) hue-rotate(170deg) brightness(90%)", }} />
                            <ListItemText primary="Products" primaryTypographyProps={{ sx: { color: "#637381", fontSize: open ? 17 : 13 }, }} />
                            {open &&
                                (openMenu === "products" ? (<ExpandMoreIcon sx={{ color: "#637381" }} />) : (<ChevronRightIcon sx={{ color: "#637381" }} />))}
                        </ListItemButton>
                        {open && (
                            <Collapse in={openMenu === "products"}>
                                <Box sx={{ ml: 5, mt: 0.5, position: "relative" }}>
                                    <Box sx={{ position: "absolute", left: 0, top: -3, bottom: 25, width: "2px", backgroundColor: theme.palette.background.SidebarBorder, }} />
                                    {productItems.map((item) => (
                                        <Box key={item.path} sx={{ position: "relative", pl: 2 }}>
                                            <Box sx={{ position: "absolute", left: 0, top: 5, width: 16, height: 16, borderLeft: `2px solid ${theme.palette.background.SidebarBorder}`, borderBottom: `2px solid ${theme.palette.background.SidebarBorder}`, borderBottomLeftRadius: "8px", }} />
                                            <ListItemButton selected={location.pathname === item.path} onClick={() => navigate(item.path)}
                                                sx={{ py: 0.5, my: 0.5, minHeight: 36, borderRadius: 1, color: "#637381", }}>
                                                <ListItemText primary={item.label} />
                                            </ListItemButton>
                                        </Box>
                                    ))}
                                </Box>
                            </Collapse>
                        )}
                    </List>
                    <List disablePadding>
                        {/* ORDER */}
                        <ListItemButton onClick={() => handleMenuToggle("order")} onMouseEnter={(e) => handleHover(e, "order")} onMouseLeave={() => setHoveredItem(null)}
                            sx={{
                                flexDirection: open ? "row" : "column", px: 1.5, borderRadius: 2, mb: 0.5,
                                "&:focus": {
                                    backgroundColor: "rgba(0 167 111 / 16%)", color: "green.main",
                                    filter: "invert(46%) sepia(69%) saturate(413%) hue-rotate(115deg) brightness(90%) contrast(90%)",
                                },
                            }}>
                            <Avatar src={Images.Ordericon} sx={{ width: 24, height: 24, mr: 1, filter: "invert(45%) sepia(8%) saturate(500%) hue-rotate(170deg) brightness(90%)", }} />
                            <ListItemText primary="Order" primaryTypographyProps={{ sx: { color: "#637381", fontSize: open ? 17 : 13 }, }} />
                            {open &&
                                (openMenu === "order" ? (<ExpandMoreIcon sx={{ color: "#637381" }} />) : (<ChevronRightIcon sx={{ color: "#637381" }} />))}
                        </ListItemButton>
                        {open && (
                            <Collapse in={openMenu === "order"}>
                                <Box sx={{ ml: 5, mt: 0.5, position: "relative" }}>
                                    <Box sx={{ position: "absolute", left: 0, top: -3, bottom: 25, width: "2px", backgroundColor: theme.palette.background.SidebarBorder, }} />
                                    {orderItems.map((item) => (
                                        <Box key={item.path} sx={{ position: "relative", pl: 2 }}>
                                            <Box sx={{ position: "absolute", left: 0, top: 5, width: 16, height: 16, borderLeft: `2px solid ${theme.palette.background.SidebarBorder}`, borderBottom: `2px solid ${theme.palette.background.SidebarBorder}`, borderBottomLeftRadius: "8px", }} />
                                            <ListItemButton selected={location.pathname === item.path} onClick={() => navigate(item.path)}
                                                sx={{ py: 0.5, my: 0.5, minHeight: 36, borderRadius: 1, color: "#637381", }}>
                                                <ListItemText primary={item.label} />
                                            </ListItemButton>
                                        </Box>
                                    ))}
                                </Box>
                            </Collapse>
                        )}
                    </List>
                </Box>

                {/* HOVER POPUP */}
                {!open && hoveredItem && !isMobile && (
                    <Box
                        sx={{
                            position: "fixed", top: popupPosition.top, left: popupPosition.left + 3, backgroundColor: theme.palette.background.Sidebarmenu,
                            boxShadow: "0 3px 10px rgba(0,0,0,0.15)", borderRadius: "8px", minWidth: "160px", zIndex: 999, p: 1,
                        }}
                        onMouseEnter={() => setHoveredItem(hoveredItem)} onMouseLeave={() => setHoveredItem(null)}>
                        {(hoveredItem === "user" ? userItems : hoveredItem === "product" ? productItems : orderItems).map((item) => (
                            <Box key={item.path} onClick={() => navigate(item.path)}
                                sx={{ px: 1.5, py: 0.8, fontSize: 14, cursor: "pointer", borderRadius: 1,
                                 "&:hover": { backgroundColor: theme.palette.background.buttonHover, }, }}>
                                {item.label}
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
        </Drawer>
    );
};

export default Sidebar;
