import React from "react";
import { Box, TextField, Typography, Link, IconButton, InputAdornment, Stack, } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ListButton } from "../../components/button/CustomButton";
import Images from "../../constants/Images";
import { useTheme } from "@mui/material/styles";
import { Logosvg } from "../../components/svgs";
import Settings from "../../components/ui/settings";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Toaster from "../../components/toaster";
import { UserInputField } from "../../components/input/CustomInput";


const SigninPage: React.FC = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const theme = useTheme();
    const navigate = useNavigate();
    const [toast, setToast] = useState({ open: false, message: "", type: "", });
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => {
            const updated = {
                ...prev,
                [field]: value,
            };

            return updated;
        });
    };

    const handleSubmit = async () => {
        const newErrors: { [key: string]: boolean } = {};

        Object.keys(formData).forEach((key) => {
            if (!String(formData[key as keyof typeof formData]).trim()) {
                newErrors[key] = true;
            }
        });

        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        if (!emailRegex.test(formData.email)) {
            setToast({ open: true, message: "Invalid email format", type: "error", });
            return;
        }


        try {
            setIsLoading(true);

            const resp = await axios.post("http://localhost:3003/signup", formData, {
                headers: { "Content-Type": "application/json" },
            }
            );
            const { user, token } = resp.data;
            const { firstName, lastName, email, password } = formData;

            if (!firstName || !lastName || !email || !password) {
                setToast({
                    open: true,
                    message: "Please fill all fields",
                    type: "warning",
                });
                return;
            }
            localStorage.setItem("token", token);
            localStorage.setItem("userId", user._id);
            localStorage.setItem("user", JSON.stringify(user));

            setToast({ open: true, message: "Sign up successfully!", type: "success", });

            setTimeout(() => {
                navigate("/app/user/list");
            }, 1500);
        } catch (err: any) {
            const message = err.response?.data?.message === "User already exists" ? "This email is already registered" : err.response?.data?.message || "Signup failed";
            setToast({ open: true, message, type: "error", });
        } finally {
            setIsLoading(false);
        }
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
                        <Typography sx={{ color: "#6B7280", mb: 4 }}>A whole new productive journey starts right here</Typography>
                        <Box component="img" src={Images.signinImage} alt="illustration" sx={{ width: "80%", maxWidth: 420, }} />
                    </Box>
                    <Box sx={{ p: 6 }}>
                        <Typography variant="h5" fontWeight={600} mb={3} p={0}>Sign up to your account</Typography>
                        <Stack direction="row" spacing={3} mb={3}>
                            <UserInputField PlaceHolder="First Name" value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} />
                            <UserInputField PlaceHolder="Last Name" value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} />
                        </Stack>
                        <UserInputField PlaceHolder="Email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />
                        <TextField fullWidth label="Enter your password" type={showPassword ? "text" : "password"}
                            value={formData.password} onChange={(e) => handleChange("password", e.target.value)} sx={{
                                my: 3,
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

                        <Typography variant="h5" fontWeight={500} fontSize={15} mb={3} p={0}>Already have an account?<span>
                            <Link href="/login" underline="hover" color="green.main" ml={0.5}>Login</Link></span></Typography>

                        <ListButton contant="Sign up" width="100%" click={handleSubmit} loading={isLoading} />
                    </Box>
                </Stack>
            </Box>
            <Toaster openToast={toast.open} setOpenToast={(open: boolean) => setToast({ ...toast, open })} contant={toast.message} color={toast.type} />
        </Box>
    );
};

export default SigninPage;