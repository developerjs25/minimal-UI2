import { Box, Stack, Grid, Typography } from "@mui/material";
import ImageBox from "../components/ImageBox";
import { CountryInput, PhoneNumberInput, StateInput, UserInputField, } from "../../../components/input/CustomInput";
import { ListButton } from "../../../components/button/CustomButton";
import Breadcrumb from "../../../components/breadcrumbs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Toaster from "../../../components/toaster";
import { StatusSelecter, RoleSelecter } from "../../../components/select";

const CreateUser = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        image: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        countryNumber: "",
        countrycode: "",
        stateName: "",
        stateCode: "",
        city: "",
        address1: "",
        address2: "",
        status: "",
        role: ""
    });

    const [toast, setToast] = useState({ open: false, message: "", type: "", });
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => {
            const updated = {
                ...prev,
                [field]: value,
            };
            setErrors((prev) => ({
                ...prev,
                [field]: false,
            }));
            if (field === "countrycode") {
                updated.stateName = "";
                updated.stateCode = "";
            }

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

        if (errors.email) {
            if (!emailRegex.test(formData.email)) {
                setToast({ open: true, message: "Invalid email format", type: "error", });
                return;
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setIsLoading(true);

            const payload = { ...formData, state: formData.stateCode, };

            const resp = await axios.post("http://localhost:3003/data", payload, {
                headers: { "Content-Type": "application/json" },
            }
            );

            console.log(resp.data);
            setToast({ open: true, message: "User created successfully!", type: "success", });

            setTimeout(() => {
                navigate("/app/user/list");
            }, 1500);
        } catch (err) {
            console.error("Error submitting form:", err);
            setToast({ open: true, message: "Something went wrong", type: "error" });

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 1500, mx: "auto", pb: 9, pt: 5 }}>
            <Box px={2} pb={3}>
                <Breadcrumb link1="/" linkName1="Users" link2="/app/user/list" linkName2="List" link3="/app/user/create" linkName3="Create user" />
            </Box>

            <Stack direction={{ xs: "column", md: "row" }} spacing={10} mt={3}>
                <Box sx={{ width: { xs: "100%", md: 450 }, height: 420, boxShadow: "0 3px 10px rgba(133, 131, 131, 0.12)", borderRadius: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 2, p: 2, position: "relative", }}>
                    <ImageBox error={errors.image} image={formData.image} onChange={(img) => handleChange("image", img)} />
                    <Typography variant="body2" sx={{ color: "#919EAB", textAlign: "center", fontSize: 12 }}>Allowed *.jpeg, *.jpg, *.png, *.gif<br />max size of 3 Mb</Typography>
                </Box>
                <Box sx={{ width: { xs: "100%", md: 1010 }, boxShadow: "0 3px 10px rgba(133, 131, 131, 0.12)", borderRadius: 2, p: 3, }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <UserInputField PlaceHolder="First name" value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} error={errors.firstName} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <UserInputField PlaceHolder="Last name" value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} error={errors.lastName} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <UserInputField PlaceHolder="Email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} error={errors.email} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <PhoneNumberInput value={formData.phone} country={formData.countryNumber} error={errors.phone}
                                onChange={(data) => setFormData((prev) => ({ ...prev, phone: data.phone, countryNumber: data.countryNumber, }))}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <UserInputField PlaceHolder="City" value={formData.city} onChange={(e) => handleChange("city", e.target.value)} error={errors.city} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <StateInput countryCode={formData.country} error={errors.stateName || errors.stateCode}
                                value={formData.stateCode ? { label: formData.stateName, code: formData.stateCode, } : null}
                                onChange={(state) => { setFormData((prev) => ({ ...prev, stateName: state?.label || "", stateCode: state?.code || "", })); }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <CountryInput PlaceHolder="Country" value={formData.country} error={errors.country}
                                onChange={(e: any) => { handleChange("country", e.target.value); handleChange("countrycode", e.target.countryCode); }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <UserInputField PlaceHolder="Address1" value={formData.address1} onChange={(e) => handleChange("address1", e.target.value)} error={errors.address1} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <UserInputField PlaceHolder="Address2" value={formData.address2} onChange={(e) => handleChange("address2", e.target.value)} error={errors.address2} />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <RoleSelecter onChange={(value: string) => handleChange("role", value)} error={errors.role} />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <StatusSelecter onChange={(value: string) => handleChange("status", value)} error={errors.status} />
                        </Grid>
                    </Grid>

                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <ListButton contant="Create user" click={handleSubmit} loading={isLoading} />
                    </Box>
                </Box>
            </Stack>

            <Toaster openToast={toast.open} setOpenToast={(open: boolean) => setToast({ ...toast, open })} contant={toast.message} color={toast.type} />
        </Box>
    );
};

export default CreateUser;