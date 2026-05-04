import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Menu, Avatar, ListItemIcon, ListItemText, Divider, ListItemButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AccountCircle, Logout, } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [user, setUser] = useState<any>(null);

  const theme = useTheme();
  const closeTimer = useRef<any>(null);
  const navigate = useNavigate();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    closeTimer.current = setTimeout(() => {
      setAnchorEl(null);
    }, 200);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const syncUser = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      }
    };

    window.addEventListener("storage", syncUser);

    const interval = setInterval(syncUser, 500);

    return () => {
      window.removeEventListener("storage", syncUser);
      clearInterval(interval);
    };
  }, []);

  const Image = user?.image || "";
  const Name = user ? `${user.firstName} ${user.lastName}` : "User";
  const Userid = user?._id;

  return (
    <Box onMouseEnter={handleOpen} onMouseLeave={handleClose}
      sx={{ display: "flex", alignItems: "center", gap: 0.5, ml: 2, backgroundColor: theme.palette.background.whiteBlack, p: 0.5, borderRadius: 50, cursor: "pointer", }}>
      <Box sx={{ position: "relative", width: 38, height: 38 }}>
        <Box sx={{
          position: "absolute", inset: 0, borderRadius: "50%", padding: "2px",
          background: `conic-gradient(#FFAB00, ${theme.palette.success.main}, ${theme.palette.warning.main})`,
          animation: "rotateBorder 4s linear infinite",
          "@keyframes rotateBorder": { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" }, },
        }} />
        <Box sx={{ position: "absolute", inset: "2px", borderRadius: "50%", backgroundColor: theme.palette.background.default, zIndex: 1, }} />
        <Avatar src={Image} sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 34, height: 34, zIndex: 2, }} />
      </Box>
      <Typography variant="body2" sx={{ color: theme.palette.background.TableRowColor, fontSize: 15, fontWeight: 500, }}>{Name}</Typography>


      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}
        MenuListProps={{ onMouseEnter: () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, onMouseLeave: handleClose, }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left", }}
        transformOrigin={{ vertical: "top", horizontal: "left", }}
        slotProps={{
          paper: {
            elevation: 4,
            sx: {
              borderRadius: 2, minWidth: 170, overflow: "visible", mt: 1, backgroundColor: theme.palette.background.Menubg,
              "&::before": { content: '""', display: "block", position: "absolute", top: 0, right: 40, width: 12, height: 12, backgroundColor: theme.palette.background.listColor, transform: "translateY(-50%) rotate(45deg)", },
            },
          },
        }}>

        <ListItemButton onClick={() => navigate(`/app/myaccount/${Userid}`)} sx={{ py: 0.8, px: 2, mx: 0.75, borderRadius: 2, }} >
          <ListItemIcon>
            <AccountCircle fontSize="small" sx={{ color: "text.secondary" }} />
          </ListItemIcon>
          <ListItemText sx={{}}>
            <Typography variant="body2">My Account</Typography>
          </ListItemText>
        </ListItemButton>

        <Divider sx={{ my: 1 }} />

        <ListItemButton onClick={() => { localStorage.clear(); setUser(null); navigate("/login"); }} sx={{
          py: 0.8, px: 2, color: theme.palette.background.logoutButtonColor, mx: 0.75, borderRadius: 2,
          "&:hover": { backgroundColor: theme.palette.background.logoutButtonbg, },
        }}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: theme.palette.background.logoutButtonColor }} />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body2" fontWeight={500}>Logout</Typography>
          </ListItemText>
        </ListItemButton>
      </Menu>
    </Box>
  );
}