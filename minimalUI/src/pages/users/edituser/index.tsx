import { Box, Stack, Grid, Typography, } from "@mui/material";
import ImageBox from "../components/ImageBox";
import { CountryInput, PhoneNumberInput, StateInput, UserInputField } from "../../../components/input/CustomInput";
import { ListButton } from "../../../components/button/CustomButton";
import Breadcrumb from "../../../components/breadcrumbs";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Selecter, RoleSelecter } from "../../../components/select";
import Toaster from "../../../components/toaster";


const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [openToast, setOpenToast] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const [userData, setUserData] = useState({
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
        role: "",
        defaultAddressId: null,
    });
    useEffect(() => {
        const fetchUser = async () => {
            if (!id) return;

            try {
                const res = await axios.get(`http://localhost:3003/data/${id}`);
                const data = res.data;

                const defaultAddress = data.addresses?.find((a: any) => a._id === data.defaultAddressId) || data.addresses?.[0];

                setUserData({
                    ...data,

                    stateName: defaultAddress?.stateName || "",
                    stateCode: defaultAddress?.stateCode || "",
                    country: defaultAddress?.country || "",
                    countrycode: defaultAddress?.countrycode || "",
                    countryNumber: defaultAddress?.countryNumber || "",
                    address1: defaultAddress?.address1 || "",
                    address2: defaultAddress?.address2 || "",
                    city: defaultAddress?.city || "",

                    defaultAddressId: defaultAddress?._id || null,
                });
            } catch (err) {
                console.error(err);
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (field: string, value: string) => {
        setUserData((prev: any) => ({
            ...prev,
            [field]: value,

        }));
        setErrors((prev) => ({
            ...prev,
            [field]: false,
        }));
    };

    const handleSubmit = async () => {
        const isValid = validate();

        if (!isValid) return;

        try {
            await axios.put(`http://localhost:3003/data/${id}`, {
                image: userData.image,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                phone: userData.phone,
                role: userData.role,
                status: userData.status,
            });
            const addressPayload = {
                address1: userData.address1,
                address2: userData.address2,
                city: userData.city,
                stateCode: userData.stateCode,
                stateName: userData.stateName,
                country: userData.country,
                countrycode: userData.countrycode,
                countryNumber: userData.countryNumber,
                userId: id,
            };


            if (userData.defaultAddressId) {
                await axios.put(`http://localhost:3003/address/${userData.defaultAddressId}`, addressPayload,
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, },
                    }
                );
            } else {
                const addressRes = await axios.post(`http://localhost:3003/address`, addressPayload,
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, },
                    }
                );

                if (addressRes.data?._id) {
                    await axios.put(`http://localhost:3003/data/${id}`, { defaultAddressId: addressRes.data._id, });
                }
            }

            setOpenToast(true);

            setTimeout(() => {
                navigate("/app/user/list");
            }, 1500);

        } catch (err) {
            console.error("Update failed:", err);
        }
    };
    const validate = () => {
        const newErrors: any = {};

        if (!userData.firstName) newErrors.firstName = true;
        if (!userData.lastName) newErrors.lastName = true;

        if (!userData.email) {
            newErrors.email = true;
        } else {
            const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            if (!emailRegex.test(userData.email)) {
                newErrors.email = true;
            }
        }

        if (!userData.country) newErrors.country = true;
        if (!userData.stateCode) newErrors.stateCode = true;
        if (!userData.city) newErrors.city = true;

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    return (
        <Box sx={{ maxWidth: 1500, mx: "auto", pb: 9, pt: 5 }}>
            <Box px={2} pb={3}>
                <Breadcrumb link1="/" linkName1="Users" link2="/app/user/list" linkName2="List" link3="/app/user/edit" linkName3={userData.firstName} />
            </Box>
            <Stack direction={{ xs: "column", md: "row" }} spacing={10} mt={3} >
                <Box sx={{ width: { xs: "100%", md: 450 }, height: 420, boxShadow: "0 3px 10px rgba(133, 131, 131, 0.12)", borderRadius: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 2, p: 2, position: "relative", }}>
                    <ImageBox error={errors.image} image={userData.image} onChange={(img: string) => handleChange("image", img)} />
                    <Typography variant="body2" sx={{ color: "#919EAB", textAlign: "center", fontSize: 12 }}>Allowed *.jpeg, *.jpg, *.png, *.gif<br />max size of 3 Mb</Typography>
                </Box>
                <Box sx={{
                    width: { xs: "100%", md: 1010 }, height: "auto", boxShadow: "0 3px 10px rgba(133, 131, 131, 0.12)",
                    borderRadius: 2, alignItems: "center", p: 3, gap: 3,
                }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                            <UserInputField PlaceHolder="First name" value={userData.firstName} onChange={(e: any) => handleChange("firstName", e.target.value)} error={errors.firstName} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                            <UserInputField PlaceHolder="Last name" value={userData.lastName} onChange={(e: any) => handleChange("lastName", e.target.value)} error={errors.lastName} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                            <UserInputField PlaceHolder="Email" value={userData.email} onChange={(e: any) => handleChange("email", e.target.value)} error={errors.email} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                            <PhoneNumberInput value={userData.phone} country={userData.countryNumber} error={errors.phone}
                                onChange={(data) => { setUserData((prev: any) => ({ ...prev, phone: data.phone, countryNumber: data.countryNumber, })); }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <UserInputField PlaceHolder="City" value={userData.city} onChange={(e: any) => handleChange("city", e.target.value)} error={errors.city} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <StateInput countryCode={userData.country} error={errors.stateName || errors.stateCode}
                                value={userData.stateCode ? { label: userData.stateName, code: userData.stateCode, } : null}
                                onChange={(state) => { setUserData((prev) => ({ ...prev, stateName: state?.label || "", stateCode: state?.code || "", })); }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <CountryInput PlaceHolder="Country" value={userData.country} error={errors.country}
                                onChange={(e: any) => { handleChange("country", e.target.value); handleChange("countrycode", e.target.countryCode); }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                            <UserInputField PlaceHolder="Address1" value={userData.address1} onChange={(e: any) => handleChange("address1", e.target.value)} error={errors.address1} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                            <UserInputField PlaceHolder="Address2" value={userData.address2} onChange={(e: any) => handleChange("address2", e.target.value)} error={errors.address2} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                             <RoleSelecter value={userData.role} onChange={(value: string) => handleChange("role", value)} error={errors.role} label="Role" FirstItem="Admin" SecondItem="User" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                             <Selecter value={userData.status} onChange={(value: string) => handleChange("status", value)} error={errors.status} label="Status" FirstItem="Active" SecondItem="InActive" ThridItem="Banned"/>
                        </Grid>
                    </Grid>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", }}>
                        <ListButton contant="Update user" click={handleSubmit} />
                    </Box>
                </Box>
            </Stack>
            <Toaster openToast={openToast} setOpenToast={setOpenToast} contant="User updated successfully!" />
        </Box>
    )
}

export default EditUser;
