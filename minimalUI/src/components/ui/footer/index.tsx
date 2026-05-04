import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{flexGrow: 1, backdropFilter: "blur(4px)",backgroundColor: "#e2e2e2",transition: "all 0.3s ease",position: "sticky",buttom: 0,zIndex: 1100,}}>
      <Toolbar sx={{ display:"flex", justifyContent:"center", alignItems:"center" }}>
        <Box>@Copyright 2026</Box>
      </Toolbar>
    </Box>
  );
}