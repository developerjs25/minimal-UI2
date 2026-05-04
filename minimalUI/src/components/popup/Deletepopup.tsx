import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import type { DeleteDialogProps } from "../../Types";
import { useTheme } from "@mui/material/styles";


const DeleteDialog = ({ open, onClose, onConfirm, }: DeleteDialogProps) => {
    const theme = useTheme();

    return (
        <Dialog open={open} onClose={onClose} BackdropProps={{ sx: { backgroundColor: "rgba(116, 116, 116, 0.15)", opacity: 999, }, }}
            PaperProps={{ sx: { borderRadius: 4, minWidth: { xs: 280, sm: 450 }, p: 0.6, boxShadow: "-40px 40px 80px -8px rgba(0,0,0,0.15)", },
             backgroundColor: theme.palette.background.whiteBlack, }}>
            <DialogTitle sx={{ fontWeight: 700, fontSize: 18, pb: 1.5, }}>Delete</DialogTitle>
            <DialogContent sx={{ pb: 2 }}>
                <Typography sx={{ color: "#637381", fontSize: 14 }}>Are you sure want to delete?</Typography>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onConfirm} variant="contained" sx={{ textTransform: "none", borderRadius: 2, color: "white.main", backgroundColor: "#FF5630", minWidth: 70, }}>
                    Delete
                </Button>
                <Button onClick={onClose} sx={{ textTransform: "none", borderRadius: 2, color:theme.palette.background.whiteBlack, fontWeight: 600, border: "1px solid #D9D9D9", "&:hover": { backgroundColor:theme.palette.background.buttonHover, borderColor: theme.palette.background.buttonHover }, }}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;