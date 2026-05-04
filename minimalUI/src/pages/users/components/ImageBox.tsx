import { Box, Typography, Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import type { ImageBoxProps } from "../../../Types";
import { useTheme } from "@mui/material/styles";
import Toaster from "../../../components/toaster";


const ImageBox: React.FC<ImageBoxProps> = ({ image, error = false, onChange }) => {
    const [preview, setPreview] = useState<string>("");
    const [toast, setToast] = useState({ open: false, message: "", type: "", });
    const theme = useTheme();

    useEffect(() => {
        if (image && typeof image === "string") {
            setPreview(image);
        }
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
            setToast({ open: true, message: "Only JPG, JPEG, PNG, GIF, and WEBP files are allowed", type: "error", });
            return;
        }


        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            setPreview(result);
            if (onChange) {
                onChange(result);
            }
        };
        reader.readAsDataURL(selectedFile);
    };
    return (
        <>
            {/* <Box sx={{ width: { xs: "100%", md: 450 }, height: 420, boxShadow: "0 3px 10px rgba(133, 131, 131, 0.12)", borderRadius: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 2, p: 2, position: "relative", }}> */}
            {/* {status && (
                <Box sx={{ position: "absolute", top: 16, right: 16 }}>
                    <StyledChip label={status} bgcolor={getUserStatusStyle(status).backgroundColor} color={getUserStatusStyle(status).color} />
                </Box>
            )} */}
            <input hidden accept="image/*" id="avatar-upload" type="file" onChange={handleFileChange} />
            <Box component="label" htmlFor="avatar-upload" sx={{ cursor: "pointer", borderRadius: "50%", position: "relative", border: error ? "1px dashed #FF5630" : "1px dashed #e7e7e7", p: 1, "&:hover .overlay": { opacity: 1 }, }}>
                <Avatar src={preview || undefined} sx={{ width: 120, height: 120, backgroundColor: theme.palette.background.TableRowColor, color: "#888888", }}>
                    {!preview && (
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, }}>
                            <CameraEnhanceIcon sx={{ fontSize: 30, color: error ? "#FF5630" : "#919EAB", }} />
                            <Typography variant="caption" sx={{ fontSize: 11, color: error ? "#FF5630" : "#919EAB", }}>Upload photo</Typography>
                        </Box>
                    )}
                </Avatar>
                {preview && (
                    <Box className="overlay" sx={{ position: "absolute", inset: 10, bgcolor: "rgba(0,0,0,0.45)", color: "#fff", borderRadius: "50%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 1, opacity: 0, transition: "opacity 0.3s", }}>
                        <CameraEnhanceIcon sx={{ fontSize: 30, color: "white" }} />
                        <Typography variant="caption" sx={{ fontSize: 11, color: "white" }}>Upload photo</Typography>
                    </Box>
                )}
            </Box>
            {/* <Typography variant="body2" sx={{ color: "#919EAB", textAlign: "center", fontSize: 12 }}>Allowed *.jpeg, *.jpg, *.png, *.gif<br />max size of 3 Mb</Typography> */}
            {/* </Box> */}
            <Toaster openToast={toast.open} setOpenToast={(open: boolean) => setToast({ ...toast, open })} contant={toast.message} color={toast.type} />
        </>
    );
};

export default ImageBox;