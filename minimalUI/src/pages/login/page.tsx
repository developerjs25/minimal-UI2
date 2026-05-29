import { Box, TextField, Typography,  Link, IconButton, InputAdornment, Stack, } from "@mui/material";
import React from "react";
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

const LoginPage: React.FC = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [toast, setToast] = useState({ open: false, message: "", type: "", });
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        identifier: "",
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

        try {
            setIsLoading(true);

            const resp = await axios.post("http://localhost:3003/login", {
                identifier: formData.identifier,
                password: formData.password
            })
            if (!formData.identifier || !formData.password) {
                setToast({ open: true, message: "Please fill all fields", type: "warning", });
                return;
            }
            const { user, token, role } = resp.data;

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("userId", user._id);
            localStorage.setItem("user", JSON.stringify(user));
            setToast({ open: true, message: "Login successfully!", type: "success", });

            setTimeout(() => {
                if (role === "Admin") {
                    navigate("/app/user/list");
                } else {
                    navigate("/user/product");
                }
            }, 1500);
        } catch (err: any) {
            console.error("Error submitting form:", err);

            setToast({ open: true, message: err.response?.data?.message, type: "error", });

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
                        <Typography sx={{ color: "#6B7280", mb: 4 }}>Thank you for starting with us</Typography>
                        <Box component="img" src={Images.signinImage} alt="illustration" sx={{ width: "80%", maxWidth: 420, }} />
                    </Box>
            
                    <Box sx={{ p: 6 }}>
                        <Typography variant="h5" fontWeight={600} mb={3} p={0}>Login to your account</Typography>
                        <UserInputField PlaceHolder="Email or Phone Number" value={formData.identifier} onChange={(e) => handleChange("identifier", e.target.value)} />
                        <TextField fullWidth label="Password" type={showPassword ? "text" : "password"}
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

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, }} >
                            <Typography variant="h5" fontWeight={500} fontSize={15} p={0}>Don't have an account?<span>
                                <Link href="/signup" underline="hover" color="green.main" ml={0.5}>Sign up</Link></span></Typography>
                            <Link href="/forgetpassword" underline="hover" color="#bbbbbb"> Forgot Password </Link>
                        </Box>
                        <ListButton contant="Login" width="100%" click={handleSubmit} loading={isLoading} />
                    </Box>
                </Stack>
            </Box>
            <Toaster openToast={toast.open} setOpenToast={(open: boolean) => setToast({ ...toast, open })} contant={toast.message} color={toast.type} />
        </Box>
    );
};

export default LoginPage;

