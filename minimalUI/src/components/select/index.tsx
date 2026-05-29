import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { Box, Checkbox, Chip, ListItemText, Menu, MenuItem, Stack, Typography } from "@mui/material";
import type { OptionType } from '../../Types';
import { options } from '../ui/Contant';
import { useTheme } from "@mui/material/styles";
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl'


export const HeaderSelecter = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [value, setValue] = React.useState<OptionType>(options[0]);
    const open = Boolean(anchorEl);
    const theme = useTheme();


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (selected?: any) => {
        if (selected) setValue(selected);
        setAnchorEl(null);
    };


    return (
        <Box sx={{ minWidth: { xs: 0, md: 130 } }}>
            <Box onClick={handleClick} sx={{ px: 1, py: 0.5, borderRadius: 2, cursor: "pointer", backgroundColor: theme.palette.background.default, display: "flex", justifyContent: "center", alignItems: "center", }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Box component="img" src={value.image} sx={{ width: 25, height: 25 }} />
                    <Typography sx={{ fontWeight: 550, fontSize: 15, display: { xs: "none", sm: "block" } }}> {value.label}</Typography>
                    <Chip label={value.badge} size="small" sx={{ display: { xs: "none", sm: "flex" }, borderRadius: 1.3, fontWeight: 700, backgroundColor: value.chipBackground, color: value.badge === "Free" ? "black.main" : "primary.main", fontSize: 12, height: 20, }} />
                </Stack>
                <Box sx={{ ml: 1 }}><UnfoldMoreIcon sx={{ color: "neutral.main", fontSize: 16 }} /></Box>
            </Box>
            <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()} PaperProps={{ sx: { backgroundImage: ` url('../assets/images/download (1).svg'),  url('../assets/images/download.svg')`, backgroundPosition: "top right, bottom left", backgroundRepeat: "no-repeat, no-repeat", backgroundSize: "200px 200px, 200px 200px", p: 0.5, py: 0.5, borderRadius: 3, boxShadow: "0 8px 24px black.main", width: 230, }, }}>
                {options.map((item) => (
                    <MenuItem key={item.label} onClick={() => handleClose(item)} sx={{
                        fontSize: 14, px: 0.5, py: 1.5, borderRadius: 2,
                        "&:hover": { opacity: 2 }, "&:focus": { opacity: 4 },
                    }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                            <Stack direction="row" alignItems="center">
                                <Box component="img" src={item.image} sx={{ width: 25, height: 25, }} />
                                <Typography variant="caption" sx={{ ml: 1.5, fontWeight: 500, fontSize: 15, }}> {item.label}</Typography>
                            </Stack>
                            <Chip label={item.badge} size="small" sx={{
                                borderRadius: 1.3, fontWeight: 700, ml: 1, backgroundColor: item.chipBackground, fontSize: 12,
                                color: item.badge === "Free" ? "black.main" : "primary.main",
                            }} />
                        </Box>
                    </MenuItem>
                ))}
                <Box sx={{ borderTop: `1px solid ${theme.palette.divider}`, my: 1 }} />
                <Stack direction="row" alignItems="center" spacing={1.9} sx={{ mt: 1, mb: 0.5, px: 1, py: 0.5, borderRadius: 2, cursor: "pointer", "&:hover": { backgroundColor: "neutral.light" }, }}>
                    <AddIcon sx={{ fontSize: 20, }} />
                    <Typography variant="caption" sx={{ fontWeight: 500, fontSize: 15, }}> Create workspace</Typography>
                </Stack>
            </Menu>
        </Box>
    )
}


export function Selecter({ onChange, value, error, label, FirstItem, SecondItem, ThridItem }: any) {
    const [status, setStatus] = React.useState('');
    const theme = useTheme();

    const handleChangeStatus = (event: SelectChangeEvent<string>) => {
        setStatus(event.target.value);
        onChange(event.target.value);

    };
    return (
        <Box sx={{ minWidth: "100%" }}>
            <FormControl fullWidth variant="outlined" error={error}>
                <InputLabel id="demo-simple-select-label" sx={{ color: error ? "#FF5630" : "#999fa5", "&.Mui-focused": { color: error ? "#FF5630" : "#999fa5", }, }}>{label}</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={value || status} label={label} onChange={handleChangeStatus}
                    sx={{ borderRadius: 2, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: error ? "#FF5630" : theme.palette.background.whiteBlack, }, "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: error ? "#FF5630" : theme.palette.background.Inputborder, borderWidth: "1px", }, }}
                    MenuProps={{ PaperProps: { sx: { backgroundColor: theme.palette.background.default, borderRadius: 3, mt: 1, boxShadow: "0px 4px 20px rgba(0,0,0,0.1)", } } }}
                >
                    <MenuItem value={FirstItem} sx={{ borderRadius: 2, mx: 1, "&:hover": { backgroundColor: theme.palette.background.buttonHover } }}>{FirstItem}</MenuItem>
                    <MenuItem value={SecondItem} sx={{ borderRadius: 2, mx: 1, "&:hover": { backgroundColor: theme.palette.background.buttonHover } }}>{SecondItem}</MenuItem>
                    <MenuItem value={ThridItem} sx={{ borderRadius: 2, mx: 1, "&:hover": { backgroundColor: theme.palette.background.buttonHover } }}>{ThridItem}</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export function RoleSelecter({ onChange, value, error, label, FirstItem, SecondItem }: any) {
    const [role, setRole] = React.useState('');
    const theme = useTheme();

    const handleChangeRole = (event: SelectChangeEvent<string>) => {
        setRole(event.target.value);
        onChange(event.target.value);

    };
    return (
        <Box sx={{ minWidth: "100%" }}>
            <FormControl fullWidth variant="outlined" error={error}>
                <InputLabel id="demo-simple-select-label" sx={{ color: error ? "#FF5630" : "#999fa5", "&.Mui-focused": { color: error ? "#FF5630" : "#999fa5", }, }}>
                    {label}</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={value || role} label={label} onChange={handleChangeRole}
                    sx={{ borderRadius: 2, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: error ? "#FF5630" : theme.palette.background.whiteBlack, }, "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: error ? "#FF5630" : theme.palette.background.Inputborder, borderWidth: "1px", }, }}
                    MenuProps={{ PaperProps: { sx: { backgroundColor: theme.palette.background.default, borderRadius: 3, mt: 1, boxShadow: "0px 4px 20px rgba(0,0,0,0.1)", } } }}
                >
                    <MenuItem value={FirstItem} sx={{ borderRadius: 2, mx: 1, "&:hover": { backgroundColor: theme.palette.background.buttonHover } }}>{FirstItem}</MenuItem>
                    <MenuItem value={SecondItem} sx={{ borderRadius: 2, mx: 1, "&:hover": { backgroundColor: theme.palette.background.buttonHover } }}>{SecondItem}</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

type Props = {
    label?: string;
    options: string[];
    value: string[];
    setSelected: (val: string[]) => void;
    handleChange: (field: string, value: any) => void;
    fieldName: string;
};

export function ProductSelecter({ label, options, value, setSelected, handleChange, fieldName, }: Props) {
    const theme = useTheme();

    const handleChangeSelect = (event: SelectChangeEvent<string[]>) => {
        const val = event.target.value;

        const updated =
            typeof val === "string" ? val.split(",") : val;

        setSelected(updated);
        handleChange(fieldName, updated);
    };

    return (
        <Select multiple value={value} onChange={handleChangeSelect} displayEmpty
            renderValue={(selected) => selected.length > 0 ? (selected.join(", ")) : (<Typography sx={{ color: "#999fa5" }}> Select {label}</Typography>)}
            sx={{
                width: "100%", borderRadius: 2, height: 56,
                "& .MuiOutlinedInput-notchedOutline": { borderColor: theme.palette.background.Inputborder, },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: theme.palette.background.Inputborder, },
            }}
            MenuProps={{
                PaperProps: {
                    sx: {
                        mt: 1, borderRadius: 2, boxShadow: "0 6px 20px rgba(0,0,0,0.12)", backgroundColor: theme.palette.background.ViewPaperColor,
                        "& .MuiMenuItem-root": { fontSize: 14, borderRadius: 1, margin: "4px 8px", },
                    },
                },
            }}
        >
            {options.map((item) => (
                <MenuItem key={item} value={item}>
                    <ListItemText primary={item} />
                </MenuItem>
            ))}
        </Select>
    );
}

type UserProps = {
    label?: string;
    options: string[];
    value: string;
    setSelected: (val: string) => void;
    handleChange: (field: string, value: any) => void;
    fieldName: string;
};

export function UserSelecter({ options, value, setSelected, handleChange, fieldName, }: UserProps) {
    const theme = useTheme();

    return (
        <Select value={value} onChange={(e) => {
            const val = e.target.value;

            const cleanValue = Array.isArray(val) ? val[0] : val;

            setSelected(cleanValue);
            handleChange(fieldName, cleanValue);
        }} size="small" displayEmpty
            sx={{
                width: 110, height: 40, borderRadius: 2, backgroundColor: theme.palette.background.default,
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: theme.palette.background.Inputborder, borderWidth: "1px", },
            }}
            MenuProps={{
                PaperProps: {
                    sx: {
                        mt: 1, borderRadius: 2, boxShadow: "0 6px 20px rgba(0,0,0,0.12)", backgroundColor: theme.palette.background.ViewPaperColor,
                        "& .MuiMenuItem-root": {
                            fontSize: 14, borderRadius: 1, margin: "4px 8px",
                            "&.Mui-selected": { backgroundColor: theme.palette.background.buttonHover, },
                        },
                    },
                },
            }}
        >
            {options.map((item) => (
                <MenuItem key={item} value={item}>
                    {item}
                </MenuItem>
            ))}
        </Select>
    );
}