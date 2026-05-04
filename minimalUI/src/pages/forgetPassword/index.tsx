import { Box, TextField, Typography, Link, IconButton, InputAdornment, Stack, } from "@mui/material";
import { UserInputField } from "../../components/input/CustomInput";
import { ListButton } from "../../components/button/CustomButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Settings from "../../components/ui/settings";
import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Logosvg } from "../../components/svgs";
import { useNavigate } from "react-router-dom";
import Toaster from "../../components/toaster";
import OtpBox from "../../components/otpBox";
import Images from "../../constants/Images";
import axios from "axios";

const ForgetPassword: React.FC = () => {
    const [loading, setLoading] = useState({ sendOtp: false, verifyOtp: false, resetPassword: false, });
    const [toast, setToast] = useState({ open: false, message: "", type: "", });
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [email, setEmail] = useState("");
    const [timer, setTimer] = useState(0);
    const navigate = useNavigate();
    const theme = useTheme();

    const handleSendOtp = async () => {
        try {
            setLoading(prev => ({ ...prev, sendOtp: true }));

            const res = await axios.post("http://localhost:3003/send-otp", { email, });

            setToast({ open: true, message: res.data.message, type: "success", });
            setIsOtpSent(true);
            setTimer(300);
            setIsOtpSent(true);

        } catch (err: any) {
            setToast({ open: true, message: err.response?.data?.message || "Failed to send OTP", type: "error", });
        } finally {
            setLoading(prev => ({ ...prev, sendOtp: false }));
        }
    };

    const handleNewPassword = async () => {
        try {
            const otpValue = otp.join("");

            if (!email || otpValue.length !== 6) { return setToast({ open: true, message: "Enter valid OTP", type: "error", }); }

            if (!newPassword) { return setToast({ open: true, message: "New password is required", type: "error", }); }

            if (newPassword !== confirmPassword) { return setToast({ open: true, message: "Passwords do not match", type: "error", }); }

            setLoading(prev => ({ ...prev, verifyOtp: true, resetPassword: true, }));

            await axios.post("http://localhost:3003/verify-otp", { email, otp: otpValue, });

            await axios.post("http://localhost:3003/reset-password", { email, newPassword, });

            setToast({ open: true, message: "Password reset successful", type: "success", });

            setTimeout(() => { navigate("/login"); }, 1500);

        } catch (err: any) {
            setToast({ open: true, message: err.response?.data?.message || "Invalid OTP or failed to reset password", type: "error", });
        } finally {
            setLoading(prev => ({ ...prev, verifyOtp: false, resetPassword: false, }));
        }
    };


    useEffect(() => {
        if (timer <= 0) {
            const otpValue = otp.join("").trim();
            if (!otpValue) { setIsOtpSent(false); }
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
        <Box sx={{ minHeight: "100vh", backgroundColor: theme.palette.background.default, }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }} >
                <Typography variant="h6" sx={{ width: 40, color: "green.main" }}> <Logosvg /></Typography>
                <Settings />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 4, }}>

                <Stack direction="row" spacing={16} alignItems="center">
                    <Box sx={{ p: 6, display: "flex", flexDirection: "column", justifyContent: "center", }} >
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }} > Welcome to our Minimals</Typography>
                        <Typography sx={{ color: "#6B7280", mb: 4 }}>More effectively with optimized workflows.</Typography>
                        <Box component="img" src={Images.forgetpasswordImage} alt="illustration" sx={{ width: "80%", maxWidth: 420, }} />
                    </Box>
                    <Box sx={{ p: 6 }}>
                        <Typography variant="h6" fontWeight={600} mb={3} p={0}>Forgot your password?</Typography>
                        <Typography fontWeight={500} fontSize={15} mb={3} p={0} color="#bbbbbb">Please enter the email address associated with your account and <br /> we'll email you a link to reset your password.</Typography>
                        <Stack spacing={3} width="100%">
                            <Stack spacing={2} alignItems="center" my={3}>
                                <UserInputField PlaceHolder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isOtpSent} />

                                {/* <Box sx={{ minWidth: "140px" }}> */}
                                <ListButton contant={timer > 0 ? `Expires in ${formatTime(timer)}` : "Send OTP"} width="100%" click={handleSendOtp}
                                    loading={loading.sendOtp} disabled={timer > 0 } />
                                {/* </Box> */}
                            </Stack>

                            {isOtpSent && (
                                <>
                                    <TextField fullWidth label="New Password" type={showPassword ? "text" : "password"}
                                        value={newPassword} onChange={(e) => setNewPassword(e.target.value)} sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 2,
                                                "&.Mui-focused fieldset": { borderColor: theme.palette.background.Inputborder, borderWidth: "1px", },
                                            },
                                            "& .MuiInputLabel-root": { color: "#999fa5", },
                                            "& .MuiInputLabel-root.Mui-focused": { color: theme.palette.background.whiteBlack, },
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                        {showPassword ? <Visibility sx={{ color: theme.palette.background.whiteBlack, }} /> : <VisibilityOff sx={{ color: theme.palette.background.whiteBlack, }} />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField fullWidth label="Confirm New Password" type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)} sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 2,
                                                "&.Mui-focused fieldset": { borderColor: theme.palette.background.Inputborder, borderWidth: "1px", },
                                            },
                                            "& .MuiInputLabel-root": { color: "#999fa5", },
                                            "& .MuiInputLabel-root.Mui-focused": { color: theme.palette.background.whiteBlack, },
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                        {showConfirmPassword ? <Visibility sx={{ color: theme.palette.background.whiteBlack, }} /> : <VisibilityOff sx={{ color: theme.palette.background.whiteBlack, }} />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <OtpBox otp={otp} setOtp={setOtp} />
                                    <ListButton contant="Reset Password" width="100%" click={handleNewPassword} loading={loading.resetPassword} />
                                </>
                            )}
                        </Stack>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 3, }} >
                            <Link href="/login" underline="hover" sx={{ fontSize: 14 }}> Back to Login</Link>
                        </Box>
                    </Box>
                </Stack>
            </Box>
            <Toaster openToast={toast.open} setOpenToast={(open: boolean) => setToast({ ...toast, open })} contant={toast.message} color={toast.type} />
        </Box>
    );
};

export default ForgetPassword;