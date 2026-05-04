import { Box, TextField, useTheme, } from "@mui/material";
import type { OtpProps } from "../../Types";
import { useRef, } from "react";



const OtpBox = ({ otp, setOtp }: OtpProps) => {
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const theme = useTheme();


    const handleOtpChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {inputsRef.current[index + 1]?.focus();}
    };

    const handleKeyDown = (e: any, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {inputsRef.current[index - 1]?.focus();}
    };

    const handleOtpPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault();

        const pastedData = e.clipboardData.getData("text").trim().slice(0, 6);

        if (!/^\d+$/.test(pastedData)) return;
        const newOtp = [...otp];

        pastedData.split("").forEach((digit: string, index: number) => {if (index < 6) { newOtp[index] = digit; }});

        setOtp(newOtp);

        const lastIndex = pastedData.length - 1;
        if (lastIndex < 5) {
            inputsRef.current[lastIndex + 1]?.focus();
        } else {
            inputsRef.current[5]?.focus();
        }
    };
    return (
        <Box display="flex" gap={1} flex={1}>
            {otp.map((digit, index) => (
                <TextField key={index} inputRef={(el) => (inputsRef.current[index] = el)} value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)} onPaste={(e) => handleOtpPaste(e)}
                    inputProps={{ maxLength: 1, style: { textAlign: "center", fontSize: "20px", fontWeight: "500", width: "23px", height: "25px", }, }}
                    sx={{
                        flex: 1,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "10px",
                            backgroundColor: theme.palette.background.signininputbg,
                            "& fieldset": { border: "none" },
                            "&:hover fieldset": { border: "none" },
                            "&.Mui-focused fieldset": { border: theme.palette.background.Inputborder },
                        },
                    }}
                />
            ))}
        </Box>
    )
}

export default OtpBox
