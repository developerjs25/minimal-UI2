import { Box, Typography, Avatar, Stack, Divider, Grid, Fade, Slide, useTheme, TextField, InputAdornment, IconButton, Button, alpha } from '@mui/material';
import { getUserStatusStyle } from "../../components/contact/UserContant";
import React, { useState, useEffect, type ChangeEvent } from "react";
import { ListButton } from '../../components/button/CustomButton';
import { VisibilityOff, Visibility, } from "@mui/icons-material";
import MyAccountProfile from './components/profile';
import Toaster from '../../components/toaster';
import StyledChip from "../../components/chip";
import { useParams } from "react-router-dom";
import OtpBox from '../../components/otpBox';
import { Sparkles, } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from "axios";
import AddAddressPopup from '../../components/popup/Addaddresspopup';
import AddressList from './address/addresslist';

const MyAccount: React.FC = () => {
    const [userData, setUserData] = useState({
        image: "", firstName: "", lastName: "", email: "", phone: "", country: "", countryNumber: "",
        stateName: "", city: "", address1: "", address2: "", status: "", role: "",
    });
    const [loading, setLoading] = useState({ sendOtp: false, data: false, resetPassword: false, });
    const [toast, setToast] = useState({ open: false, message: "", type: "", });
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [openDeletePopup, setOpenDeletePopup] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [openAddressPopup, setOpenAddressPopup] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [preview, setPreview] = useState<string>("");
    const [timer, setTimer] = useState(0);
    const { id } = useParams();
    const theme = useTheme();


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:3003/data/${id}`);
                const data = res.data;
                setUserData({ ...data, stateCode: data.stateCode || data.state || "", stateName: data.stateName || "", });
            } catch (err) {
                console.error(err);
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUserData((prev) => ({ ...prev, [name]: value, }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3003/data/${id}`, userData,);
            setToast({ open: true, message: "Profile updated successfully", type: "success" });
            setIsEditingProfile(false);
            setIsEditingAddress(false);
        } catch (err) {
            console.error(err);
        }
    };

    const image = userData.image;

    useEffect(() => {
        if (image && typeof image === "string") { setPreview(image); }
    }, [image]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
            "image/webp",
        ];

        if (!allowedTypes.includes(selectedFile.type)) {
            setToast({
                open: true,
                message: "Only JPG, JPEG, PNG, GIF, and WEBP files are allowed",
                type: "error",
            });
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;

            setPreview(result);

            setUserData((prev) => ({ ...prev, image: result, }));
        };

        reader.readAsDataURL(selectedFile);
    };
    const handleSendOtp = async () => {
        try {
            setLoading(prev => ({ ...prev, sendOtp: true }));
            const email = userData.email;
            if (!email) {
                setToast({ open: true, message: "Email is required to send OTP", type: "error", });
                return;
            }
            const res = await axios.post("http://localhost:3003/send-otp", { email, });

            setToast({ open: true, message: res.data.message, type: "success", });
            setTimer(300);

        } catch (err: any) {
            setToast({ open: true, message: err.response?.data?.message || "Failed to send OTP", type: "error", });
        } finally {
            setLoading(prev => ({ ...prev, sendOtp: false }));
        }

    };
    const handleNewPassword = async () => {
        try {
            const otpValue = otp.join("");
            const email = userData.email;
            if (!email || otpValue.length !== 6) { return setToast({ open: true, message: "Enter valid OTP", type: "error", }); }

            if (!newPassword) { return setToast({ open: true, message: "New password is required", type: "error", }); }

            if (newPassword !== confirmPassword) { return setToast({ open: true, message: "Passwords do not match", type: "error", }); }


            await axios.post("http://localhost:3003/verify-otp", { email, otp: otpValue, });

            await axios.post("http://localhost:3003/reset-password", { email, newPassword, });

            setToast({ open: true, message: "Password reset successful", type: "success", });
            setTimer(0);

        } catch (err: any) {
            setToast({ open: true, message: err.response?.data?.message || "Invalid OTP or failed to reset password", type: "error", });
        } finally {
            setOtp(["", "", "", "", "", ""]);
            setNewPassword("");
            setConfirmPassword("");
        }
    };
    useEffect(() => {
        if (timer <= 0) {
            const otpValue = otp.join("").trim();

            if (otpValue.length === 6) {
                setToast({ open: true, message: "OTP expired. Please request a new one.", type: "error", });
            }
            return;
        }

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, otp]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };
    return (
        <Box sx={{ maxWidth: 1500, mx: "auto", minHeight: '100vh', pb: 8, py: 4, position: 'relative', }}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
                <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} >
                    <Typography variant="h3" fontWeight={900} mb={6} textAlign="center">My Account</Typography>
                </motion.div>
                <Fade in={true} timeout={1000}>
                    <Box sx={{
                        p: { xs: 4, md: 8 }, borderRadius: 5,
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
                        mb: 6,
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0, left: 0, right: 0, height: 4,
                            background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c)',
                            backgroundSize: '300% 300%',
                            animation: 'gradientShift 3s ease infinite'
                        }
                    }}>
                        <Stack direction={{ xs: "column", md: "row" }} spacing={6} alignItems="center">
                            <motion.div initial={{ scale: 0.8, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 0.6, delay: 0.2 }} >
                                <Box sx={{ position: 'relative' }}>

                                    <input hidden accept="image/*" id="avatar-upload" type="file" onChange={handleFileChange} />
                                    <Avatar src={preview || undefined} sx={{
                                        width: 160, height: 160, border: `5px solid rgba(255,255,255,0.3)`, boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                    }} >
                                    </Avatar>
                                    <label htmlFor="avatar-upload">
                                        <Box sx={{
                                            position: 'absolute', bottom: -10, right: -10, width: 50, height: 50, borderRadius: '50%',
                                            background: 'linear-gradient(45deg, #f093fb, #f5576c)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            boxShadow: '0 8px 20px rgba(240,87,108,0.4)'
                                        }}>
                                            <Sparkles size={20} color="white" />
                                        </Box>
                                    </label>
                                </Box>
                            </motion.div>

                            <Box flex={1} sx={{ pt: { xs: 2, md: 0 } }}>
                                <Stack direction="row" alignItems="center" spacing={3} mb={2}>
                                    <Typography variant="h3" fontWeight={900} sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
                                        {userData.firstName} {userData.lastName}
                                    </Typography>
                                </Stack>

                                <Typography variant="h6" sx={{ fontSize: { xs: 16, md: 18 }, mb: 3, fontWeight: 400 }}>
                                    {userData.email}
                                </Typography>

                                <StyledChip label={userData.status} bgcolor={getUserStatusStyle(userData.status).backgroundColor}
                                    color={getUserStatusStyle(userData.status).color} />
                            </Box>
                            <Button onClick={handleSubmit} sx={{
                                px: 4, py: 1.5, fontSize: '17px', fontWeight: 600, textTransform: 'none', borderRadius: 5, minWidth: 200, color: theme.palette.background.listColor,
                                boxShadow: `0 8px 32px ${alpha(theme.palette.primary.dark, 0.4)}`, backgroundColor: theme.palette.background.whiteBlack,
                                '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 16px 48px ${alpha(theme.palette.primary.dark, 0.6)}`, },
                            }}>
                                Save Changes
                            </Button>
                        </Stack>
                    </Box>
                </Fade>

                <Divider sx={{ my: 6, bgcolor: 'rgba(255,255,255,0.15)' }} />
                <MyAccountProfile userData={userData} isEditingProfile={isEditingProfile} handleChange={handleChange} handleSubmit={handleSubmit} setIsEditingProfile={setIsEditingProfile} />

                <Divider sx={{ my: 6, bgcolor: 'rgba(255,255,255,0.15)' }} />
                <Slide direction="up" in={true} timeout={1200}>
                    <Box sx={{ p: { xs: 4, md: 6 }, borderRadius: 4, background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.4)' }}>
                        <Stack spacing={6}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                <Typography variant="h4" fontWeight={800} sx={{
                                    position: 'relative',
                                    '&::after': { content: '""', position: 'absolute', bottom: -8, left: 0, width: 60, height: 4, background: 'linear-gradient(90deg, #4ecdc4, #45b7d1)' }
                                }}>
                                    Address Information
                                </Typography>
                                <Stack direction="row" gap={3}>
                                    <Button onClick={() => { setSelectedAddressId(null); setOpenAddressPopup(true); }} sx={{
                                        px: 4, py: 1.5, fontSize: '17px', fontWeight: 600, textTransform: 'none', borderRadius: 5, minWidth: 200, color: theme.palette.background.listColor,
                                        boxShadow: `0 8px 32px ${alpha(theme.palette.primary.dark, 0.4)}`, backgroundColor: theme.palette.background.whiteBlack,
                                        '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 16px 48px ${alpha(theme.palette.primary.dark, 0.6)}`, },
                                    }}>
                                        Add Address
                                    </Button>
                                    <AddAddressPopup open={openAddressPopup} id={selectedAddressId}
                                        onClose={(success: boolean) => { setOpenAddressPopup(false); if (success) { window.location.reload(); } }} />
                                </Stack>
                            </Stack>
                            <AddressList />
                        </Stack>
                    </Box>
                </Slide>

                <Divider sx={{ my: 6, bgcolor: 'rgba(255,255,255,0.15)' }} />

                <Slide direction="up" in={true} timeout={1400}>
                    <Box sx={{
                        p: { xs: 4, md: 6 }, borderRadius: 4, background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.4)',
                    }} >
                        <Stack spacing={6}>
                            <Typography variant="h4" fontWeight={800} sx={{
                                position: 'relative',
                                '&::after': {
                                    content: '""', position: 'absolute', bottom: -8, left: 0, width: 60, height: 4,
                                    background: 'linear-gradient(90deg, #f093fb, #f5576c)',
                                },
                            }}>
                                Change Password
                            </Typography>

                            <Stack direction="column" spacing={4}>
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                                            <Box sx={{
                                                p: 3, borderRadius: 3, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                                transition: 'all 0.3s ease',
                                                '&:hover': { background: 'rgba(255,255,255,0.1)', transform: 'translateY(-4px)', boxShadow: '0 15px 30px rgba(0,0,0,0.3)', },
                                            }}>
                                                <TextField label="New Password" type={showPassword ? "text" : "password"}
                                                    value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                                    fullWidth required variant="outlined"
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                                    {showPassword ? <Visibility sx={{ color: theme.palette.background.whiteBlack, }} /> : <VisibilityOff sx={{ color: theme.palette.background.whiteBlack, }} />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    sx={{
                                                        "& .MuiOutlinedInput-root": {
                                                            borderRadius: 2,
                                                            "&.Mui-focused fieldset": { borderColor: theme.palette.background.Inputborder, borderWidth: '1px', },
                                                        },
                                                        "& .MuiInputLabel-root": { color: '#999fa5', },
                                                        "& .MuiInputLabel-root.Mui-focused": { color: theme.palette.background.whiteBlack, },
                                                    }}
                                                />
                                            </Box>
                                        </motion.div>
                                    </Grid>

                                    {/* Confirm Password */}
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                                            <Box sx={{
                                                p: 3, borderRadius: 3, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                                transition: 'all 0.3s ease',
                                                '&:hover': { background: 'rgba(255,255,255,0.1)', transform: 'translateY(-4px)', boxShadow: '0 15px 30px rgba(0,0,0,0.3)', },
                                            }}
                                            >
                                                <TextField label="Confirm New Password" type={showConfirmPassword ? "text" : "password"}
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    fullWidth required variant="outlined"
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                                    {showConfirmPassword ? <Visibility sx={{ color: theme.palette.background.whiteBlack, }} /> : <VisibilityOff sx={{ color: theme.palette.background.whiteBlack, }} />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    sx={{
                                                        "& .MuiOutlinedInput-root": {
                                                            borderRadius: 2,
                                                            "&.Mui-focused fieldset": { borderColor: theme.palette.background.Inputborder, borderWidth: '1px', },
                                                        },
                                                        "& .MuiInputLabel-root": { color: '#999fa5', },
                                                        "& .MuiInputLabel-root.Mui-focused": { color: theme.palette.background.whiteBlack, },
                                                    }} />
                                            </Box>
                                        </motion.div>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <OtpBox otp={otp} setOtp={setOtp} />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Box sx={{ display: 'flex', gap: 2, justifyContent: "end" }}>
                                            <ListButton contant={timer > 0 ? `Expires in ${formatTime(timer)}` : "Send OTP"} width="170px" click={handleSendOtp}
                                                loading={loading.sendOtp} disabled={timer > 0} />
                                            <ListButton contant="Update Password" width="160px" click={handleNewPassword} />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Stack>
                    </Box>
                </Slide>
            </Box>
            <Toaster openToast={toast.open} setOpenToast={(open: boolean) => setToast({ ...toast, open })} contant={toast.message} color={toast.type} />
        </Box>
    );
};

export default MyAccount;