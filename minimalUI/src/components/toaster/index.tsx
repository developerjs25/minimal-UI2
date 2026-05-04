import { Snackbar, Alert } from "@mui/material";

const Toaster = ({ openToast, setOpenToast, contant , color}: any) => {
  return (
    <div>
      <Snackbar open={openToast} autoHideDuration={2000} onClose={() => setOpenToast(false)} anchorOrigin={{ vertical: "top", horizontal: "right" }} >
        <Alert  severity={color || "success"} variant="filled" onClose={() => setOpenToast(false)} >
          {contant}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Toaster


 