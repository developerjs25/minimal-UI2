import { Button, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const ListButton = ({ contant, icon, click, width, loading = false ,disabled }: any) => {
    const theme = useTheme();

    return (
        <Button variant="contained" sx={{
            height: 35, mt: 2, textTransform: "none", borderRadius: 2, fontWeight: 600, color: theme.palette.background.listColor,
            backgroundColor: theme.palette.background.whiteBlack,  width: width, '&:hover': {scale: 1.02, },
        }} startIcon={!loading ? icon : null} onClick={click}  disabled={disabled || loading} >
            {loading ? (<CircularProgress size={20} color="inherit" />) : (
                contant
            )}
        </Button>
    );
};
