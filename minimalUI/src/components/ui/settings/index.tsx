import * as React from "react";
import { Box, Drawer, IconButton, Stack, Typography, Button, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { COLORS } from "../../../constants/colors";
import { useColorSettings } from "../../../theme/ThemeContext";
import { useTheme } from "@mui/material/styles";
import { ColorImage } from "../Contant";
import Images  from "../../../constants/Images";


export default function Settings() {
    const [open, setOpen] = React.useState(false);
    const { setMainColor, toggleMode, mode } = useColorSettings();
    const theme = useTheme();

    const toggleDrawer = (value: boolean) => () => {
        setOpen(value);
    };


    return (
        <>
            <Box onClick={toggleDrawer(true)} sx={{ cursor: "pointer" }}>
                <SettingsIcon sx={{
                    color: "neutral.main", animation: "rotateIcon 10s linear infinite",
                    "@keyframes rotateIcon": { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" }, },
                }} />
            </Box>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)} PaperProps={{ sx: { width: 320, backdropFilter: "blur(4px)", transition: "all 0.3s ease", }, }}
                ModalProps={{ BackdropProps: { sx: { backgroundColor: 'transparent' }, }, }} >
                <Box sx={{ display: "flex", flexDirection: "column", px: 2, backgroundColor: theme.palette.background.blurBackground, height: "100%",}}>
                    <Box sx={{ py: 2, display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                        <Typography variant="h6" fontWeight={600}>Settings</Typography>
                        <IconButton onClick={toggleDrawer(false)}><CloseIcon /></IconButton>
                    </Box>
                    <Box sx={{ position: "relative", border: "1px solid #919eab1f", borderRadius: 4, p: 3, mb: 3.5, }}>
                        <Stack direction="row" spacing={2} alignItems="center" mb={3} justifyContent="space-between">
                            <Typography fontWeight={600} fontSize={15} color="text.primary">Mode</Typography>
                            <Box sx={{
                                width: 26, height: 26, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "green.main", color: "white",
                                transition: "all 0.25s ease",
                                "&:hover": { transform: "scale(1.1)", boxShadow: "0 3px 10px rgba(52, 211, 153, 0.4)", },
                            }}>
                                {mode === "dark" ? (<DarkModeIcon sx={{ fontSize: 16 }} />) : (<LightModeIcon sx={{ fontSize: 16 }} />)}
                            </Box>
                        </Stack>
                        <Box sx={{ display: "flex", position: "relative", border: "1px solid #919eab1f", borderRadius: 4, overflow: "hidden", height: 44, }}>
                            <Box sx={{
                                position: "absolute", left: mode === "light" ? 0 : "50%", width: "50%", height: "100%", bgcolor: "green.main", borderRadius: 4,
                                transition: "left 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)", zIndex: 1, boxShadow: "0 2px 8px rgba(52,211,153,0.35)",
                            }} />

                            <Button onClick={() => toggleMode("light")} fullWidth disableRipple sx={{
                                zIndex: 2, fontWeight: 600, textTransform: "none", fontSize: 14, color: theme.palette.background.whiteBlack, 
                                "&:hover": { bgcolor: "transparent" },
                            }}>
                                Light
                            </Button>
                            <Button onClick={() => toggleMode("dark")} fullWidth disableRipple sx={{
                                zIndex: 2, fontWeight: 600, textTransform: "none", fontSize: 14, color: theme.palette.background.whiteBlack,
                                 "&:hover": { bgcolor: "transparent" },
                            }}>
                                Dark
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{ border: "1px solid #919eab1f", borderRadius: 4, p: 2 ,mb: 3.5}}>
                        <Typography fontWeight={600} mb={2}>Color</Typography>
                        <Grid container spacing={1}>
                            <Grid size={{ xs: 13, sm: 6, md: 4 }}>
                                <Button variant="outlined" onClick={() => setMainColor(COLORS.green)} sx={{
                                    flexDirection: "column", gap: 1, borderRadius: 3, width: "100%", py: 3, border: "none", color: "#00a76f",
                                    "&:focus": { backgroundColor: "#00a76f14" },
                                }}>
                                    <ColorImage />
                                </Button>
                            </Grid>
                            <Grid size={{ xs: 13, sm: 6, md: 4 }}>
                                <Button variant="outlined" onClick={() => setMainColor(COLORS.lightBlue)} sx={{
                                    flexDirection: "column", gap: 1, borderRadius: 3, width: "100%", py: 3, border: "none", color: "#078dee",
                                    "&:focus": { backgroundColor: "#078dee14" },
                                }}>
                                    <ColorImage />
                                </Button>
                            </Grid>
                            <Grid size={{ xs: 13, sm: 6, md: 4 }}>
                                <Button variant="outlined" onClick={() => setMainColor(COLORS.purple)} sx={{
                                    flexDirection: "column", gap: 1, borderRadius: 3, width: "100%", py: 3, border: "none", color: "#7635dc",
                                    "&:focus": { backgroundColor: "#7635dc14" },
                                }}>
                                    <ColorImage />
                                </Button>
                            </Grid>
                            <Grid size={{ xs: 13, sm: 6, md: 4 }}>
                                <Button variant="outlined" onClick={() => setMainColor(COLORS.darkBlue)} sx={{
                                    flexDirection: "column", gap: 1, borderRadius: 3, width: "100%", py: 3, border: "none", color: "#0c68e9",
                                    "&:focus": { backgroundColor: "#0c68e914" },
                                }}>
                                    <ColorImage />
                                </Button>
                            </Grid>
                            <Grid size={{ xs: 13, sm: 6, md: 4 }}>
                                <Button variant="outlined" onClick={() => setMainColor(COLORS.yellow)} sx={{
                                    flexDirection: "column", gap: 1, borderRadius: 3, width: "100%", py: 3, border: "none", color: "yellow.main",
                                    "&:focus": { backgroundColor: "#fda92d14" },
                                }}>
                                    <ColorImage />
                                </Button>
                            </Grid>
                            <Grid size={{ xs: 13, sm: 6, md: 4 }}>
                                <Button variant="outlined" onClick={() => setMainColor(COLORS.red)} sx={{
                                    flexDirection: "column", gap: 1, borderRadius: 3, width: "100%", py: 3, border: "none", color: "#ff3030",
                                    "&:focus": { backgroundColor: "#ff303014" },
                                }}>
                                    <ColorImage />
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ border: "1px solid #919eab1f", borderRadius: 4, p: 2 }}>
                        <Typography fontWeight={600} mb={2}>Font Family</Typography>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 13, sm: 6, md: 6 }}>
                                <Button variant="outlined" sx={{
                                    flexDirection: "column", gap: 1, borderRadius: 3, width: "100%", py: 3, border: "none",color: "#919EAB" ,
                                    "&:focus": { backgroundColor:theme.palette.background.buttonHover, boxShadow: "0px 3px 18px 1px rgba(77, 77, 77, 0.2)"  },
                                }}>
                                    <Box component="img" src={Images.fontfamily} alt="font"/>
                                    <Typography fontWeight={600} fontSize={12} sx={{ textTransform: 'none',}} > Public Sans</Typography>
                                </Button>
                            </Grid>
                            <Grid size={{ xs: 13, sm: 6, md: 6 }}>
                                <Button variant="outlined" sx={{
                                    flexDirection: "column", gap: 1, borderRadius: 3, width: "100%", py: 3, border: "none",color: "#919EAB" ,
                                    "&:focus": { backgroundColor:theme.palette.background.buttonHover, boxShadow: "0px 3px 18px 1px rgba(77, 77, 77, 0.2)" },
                                }}>
                                    <Box component="img" src={Images.fontfamily} alt="font"/>
                                    <Typography fontWeight={600} fontSize={12} sx={{ textTransform: 'none' }} >Inter</Typography>
                                </Button>
                            </Grid>
                            <Grid size={{ xs: 13, sm: 6, md: 6 }}>
                                <Button variant="outlined" sx={{
                                    flexDirection: "column", gap: 1, borderRadius: 3, width: "100%", py: 3, border: "none",color: "#919EAB" ,
                                    "&:focus": { backgroundColor:theme.palette.background.buttonHover, boxShadow: "0px 3px 18px 1px rgba(77, 77, 77, 0.2)" },
                                }}>
                                     <Box component="img" src={Images.fontfamily} alt="font"/>
                                    <Typography fontWeight={600} fontSize={12} sx={{ textTransform: 'none'}} >DM Sans</Typography>
                                </Button>
                            </Grid>
                            <Grid size={{ xs: 13, sm: 6, md: 6 }}>
                                <Button variant="outlined" sx={{
                                    flexDirection: "column", gap: 1, borderRadius: 3, width: "100%", py: 3, border: "none",color: "#919EAB" ,
                                    "&:focus": { backgroundColor:theme.palette.background.buttonHover, boxShadow: "0px 3px 18px 1px rgba(77, 77, 77, 0.2)"},
                                }}>
                                     <Box component="img" src={Images.fontfamily} alt="font"/>
                                    <Typography fontWeight={600} fontSize={12} sx={{ textTransform: 'none' }} >Nunito Sans</Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}
