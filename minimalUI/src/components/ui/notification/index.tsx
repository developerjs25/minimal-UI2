import * as React from 'react';
import { Box, Drawer, Button, Badge } from '@mui/material';
import { Card, CardContent, Typography, Tabs, Tab, Stack, Chip } from "@mui/material";
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import { NotificationContant } from './../Contant';
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function Notification() {
    const [open, setOpen] = React.useState(false);
    const [tab, setTab] = React.useState(0);
    const navigate = useNavigate();
    const theme = useTheme();

    const toggleDrawer = (value: boolean) => () => {
        setOpen(value);
    };
    const unreadCount = NotificationContant.filter(n => !n.read).length;

    const notificationbutton = () => {
        navigate("/app/notification")
        setOpen(false);
    }
    return (
        <>
            <Box onClick={toggleDrawer(true)} sx={{ px: 1, cursor: 'pointer', }}>
                <Badge badgeContent={NotificationContant.length} sx={{ "& .MuiBadge-badge": { backgroundColor: "orange.main", color: "white.main", }, }}>
                    <NotificationImportantIcon sx={{ color: "neutral.main" }} />
                </Badge>
            </Box>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)} ModalProps={{ BackdropProps: { sx: { backgroundColor: 'transparent' }, }, }}>
                <Box sx={{ width: 380, height: '100vh', backgroundColor: theme.palette.background.blurBackground,}} role="presentation">
                    <Card sx={{ border: 0 }} elevation={0}>
                        <CardContent sx={{ p: 0, backgroundColor: theme.palette.background.blurBackground, }}>
                            <Typography variant="h6" fontWeight={600} p={3}>Notification</Typography>
                            <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} variant="fullWidth" sx={{ mb: 2, backgroundColor: theme.palette.background.TableRowColor, p: 2 }} TabIndicatorProps={{ sx: { display: 'none' } }}>
                                <Tab disableRipple sx={{
                                    textTransform: 'none', fontWeight: 600, color: 'primary.light', borderRadius: 2, minHeight: 36, height: 36, minWidth: 20, '&.Mui-selected': { backgroundColor: 'white.main', color: 'black.main', },
                                }}
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}> All
                                            <Chip label={NotificationContant.length} size="small" sx={{
                                                fontSize: 12, fontWeight: 700, borderRadius: 1, backgroundColor: 'black.gray', color: 'white.main',
                                            }} />
                                        </Box>
                                    } />
                                <Tab disableRipple sx={{
                                    textTransform: 'none', fontWeight: 600, color: 'primary.light', borderRadius: 2, minHeight: 36, height: 36, minWidth: 20, '&.Mui-selected': { backgroundColor: 'white.main', color: 'black.main', },
                                }}
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}> Unread
                                            <Chip label={unreadCount} size="small" sx={{
                                                fontSize: 12, fontWeight: 700, borderRadius: 1, backgroundColor: '#97e7f5',
                                                color: 'primary.main',
                                                '.Mui-selected &': {
                                                    backgroundColor: '#32d5f1',
                                                    color: 'white.main',
                                                },
                                            }} />
                                        </Box>
                                    } />
                            </Tabs>
                            {NotificationContant.map((notification, index) => (
                                <Stack key={index} spacing={2} borderBottom={`1px solid ${theme.palette.background.SidebarBorder}`}>
                                    <Box paddingX={3} paddingY={2}>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Box component="img" sx={{ width: 20, height: 20, borderRadius: 1 }} src={notification.img} alt="shipping app" />
                                            <Box flexGrow={1}>
                                                <Typography variant="body1" fontWeight={550} fontSize={13}>{notification.title}</Typography>
                                                <Typography variant="body1" fontWeight={550} fontSize={12} color='#919EAB'>{notification.time}</Typography>
                                            </Box>
                                            {!notification.read && (<Box sx={{
                                                width: 8, height: 8, borderRadius: "50%", backgroundColor: "#FF5630",
                                            }} />)}
                                        </Stack>
                                    </Box>
                                </Stack>
                            ))}
                            <Box>
                                <Button fullWidth onClick={notificationbutton} sx={{
                                    textTransform: "none", fontWeight: 600, py: 1.2, color:  theme.palette.background.whiteBlack, borderRadius: 0.1,
                                    backgroundColor: theme.palette.background.TableRowColor, '&:hover': { backgroundColor: theme.palette.background.buttonHover, },
                                }}>
                                    View All Notifications
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Drawer>
        </>
    );
}