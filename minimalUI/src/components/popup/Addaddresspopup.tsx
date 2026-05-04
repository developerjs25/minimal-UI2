import { Dialog, DialogTitle, DialogContent, DialogActions, Stack, Button, } from "@mui/material";
import { CountryInput, StateInput, UserInputField } from "./../input/CustomInput";
import { ListButton } from "../button/CustomButton";
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import axios from "axios";

const AddAddressPopup = ({ open, onClose, id }: any) => {
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        address1: "", address2: "", city: "", stateName: "", stateCode: "",
        country: "", countrycode: "", countryNumber: "", zip: "",
    });

    const theme = useTheme();

    const validate = () => {
        const newErrors: any = {};

        if (!form.city.trim()) newErrors.city = true;
        if (!form.zip.trim()) newErrors.zip = true;
        if (!form.country.trim()) newErrors.country = true;
        if (!form.address1.trim()) newErrors.address1 = true;
        if (!form.address2.trim()) newErrors.address2 = true;

        if (!form.stateName.trim()) newErrors.stateName = true;
        if (!form.stateCode.trim()) newErrors.stateCode = true;

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field: string, value: any) => {
        setForm((prev) => {
            const updated = { ...prev, [field]: value, };
            setErrors((prev) => ({ ...prev, [field]: false, }));
            if (field === "countrycode") { updated.stateName = ""; updated.stateCode = ""; }
            return updated;
        });
    };
    useEffect(() => {
        if (!open) return;

        if (!id) {
            setForm({
                address1: "",
                address2: "",
                city: "",
                stateName: "",
                stateCode: "",
                country: "",
                countrycode: "",
                countryNumber: "",
                zip: "",
            });
            return;
        }

        const fetchAddress = async () => {
            try {
                setLoading(true);

                const res = await axios.get(`http://localhost:3003/address/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                setForm({
                    address1: res.data.address1 || "",
                    address2: res.data.address2 || "",
                    city: res.data.city || "",
                    stateName: res.data.stateName || "",
                    stateCode: res.data.stateCode || "",
                    country: res.data.country || "",
                    countrycode: res.data.countrycode || "",
                    countryNumber: res.data.countryNumber || "",
                    zip: res.data.zip || "",
                });

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAddress();
    }, [id, open]);
    ;
    // const handleSubmit = async (e: { preventDefault: () => void; }) => {
    //     e.preventDefault();

    //     if (!validate()) return;

    //     try {

    //         await axios.post("http://localhost:3003/add-address", form, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, }, });

    //         setForm({ address1: "", address2: "", city: "", stateName: "", stateCode: "", country: "", countrycode: "", countryNumber: "", zip: "", });

    //         onClose(false)

    //     } catch (err) {
    //         console.error(err);
    //     }
    // };
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            setLoading(true);

            if (id) {
                await axios.put(`http://localhost:3003/address/${id}`, form, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
            } else {
                await axios.post("http://localhost:3003/add-address", form, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
            }

            onClose(true); // 🔥 pass success

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Dialog open={open} onClose={onClose} BackdropProps={{ sx: { backgroundColor: "rgba(116, 116, 116, 0.15)", opacity: 999, }, }}
            PaperProps={{
                sx: {
                    borderRadius: 4, minWidth: { xs: 280, sm: 750 }, p: 0.6, boxShadow: "-40px 40px 80px -8px rgba(0,0,0,0.15)",
                    backgroundColor: theme.palette.background.default,
                },
            }}>
            <Stack spacing={2} sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", px: 3, pt: 2, }}>
                <DialogTitle sx={{ fontWeight: 700, fontSize: 18, pb: 1.5, }}>{id ? "Edit Address" : "Add Address"}</DialogTitle>
                <Button onClick={onClose} sx={{ color: theme.palette.background.whiteBlack }}><CloseIcon /></Button>
            </Stack>
            <DialogContent sx={{ pb: 2 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <UserInputField PlaceHolder="City" value={form.city} onChange={(e: any) => handleChange("city", e.target.value)} error={errors.city} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <UserInputField PlaceHolder="Zip Code" value={form.zip} onChange={(e: any) => handleChange("zip", e.target.value)} error={errors.zip} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <StateInput countryCode={form.country} error={errors.stateName || errors.stateCode}
                            value={form.stateCode ? { label: form.stateName, code: form.stateCode, } : null}
                            onChange={(state) => { setForm((prev) => ({ ...prev, stateName: state?.label || "", stateCode: state?.code || "", })); }} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <CountryInput PlaceHolder="Country" value={form.country} error={errors.country}
                            onChange={(e: any) => { handleChange("country", e.target.value); handleChange("countrycode", e.target.countryCode); }} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <UserInputField PlaceHolder="Address1" value={form.address1} onChange={(e: any) => handleChange("address1", e.target.value)} error={errors.address1} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <UserInputField PlaceHolder="Address2" value={form.address2} onChange={(e: any) => handleChange("address2", e.target.value)} error={errors.address2} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <ListButton contant={id ? "Update Address" : "Save Address"} click={handleSubmit} loading={loading} />
            </DialogActions>
        </Dialog>
    );
};

export default AddAddressPopup;