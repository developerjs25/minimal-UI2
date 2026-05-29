import { Box, Drawer, Badge, Card, CardContent, Typography, Stack, Avatar, Button, } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import type { CartItem } from "../../../Types";
import { useNavigate } from "react-router-dom";


export default function ProductCart({ open, setOpen }: any) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = user?._id;
        if (!userId) return;
        const token = localStorage.getItem("token");

        const res = await axios.get(`http://localhost:3003/cart/${userId}`, { headers: { Authorization: `Bearer ${token}`, }, });

        setCartItems(res.data.products || []);

      } catch (err) {
        console.log("Cart fetch error:", err);
      }
    };

    fetchCart();
  }, [open]);

  const toggleDrawer = (value: boolean) => () => {
    setOpen(value);
  };


  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity!,
    0
  );
   const user = JSON.parse(localStorage.getItem("user") || "{}");
   const userId = user?._id;

  const removeItem = async (itemId: string) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user?._id;
      if (!userId) return;

      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:3003/cart/${userId}/${itemId}`, { headers: { Authorization: `Bearer ${token}`, }, });

      setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
    } catch (err) {
      console.log("Error removing item from cart:", err);
    }
  };


  return (
    <>
      {/* CART ICON */}
      <Box onClick={toggleDrawer(true)} sx={{ cursor: "pointer", display: "flex", alignItems: "center", }}>
        <Badge badgeContent={cartItems.length} sx={{ "& .MuiBadge-badge": { backgroundColor: "orange.main", color: "white.main", }, }} >
          <ShoppingCartOutlinedIcon sx={{ color: "neutral.main" }} />
        </Badge>
      </Box>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)} >
        <Box sx={{ width: 420, height: "100vh", display: "flex", flexDirection: "column", background: theme.palette.background.default, }} >
          <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}`, display: "flex", justifyContent: "space-between", alignItems: "center", }}>
            <Typography fontSize={22} fontWeight={700}> Product Cart</Typography>
          </Box>
          <Box sx={{ flex: 1, overflowY: "auto", p: 2, }} >
            <Stack spacing={2}>
              {cartItems.map((item) => (
                
                <Card key={item._id} elevation={0} sx={{
                  borderRadius: 4, border: `1px solid ${theme.palette.divider}`, transition: "0.3s",
                  background: theme.palette.background.default,
                  "&:hover": { boxShadow: "0 8px 24px rgba(0,0,0,0.08)", },
                }}
                >
                  <CardContent>
                    <Stack direction="row" spacing={2}>
                        {/* <Box component="img" src={`http://localhost:3003/uploads/${item.productImage}`} sx={{ width: 90, height: 90, borderRadius: 3, }} /> */}
                      <Avatar variant="rounded"src={`http://localhost:3003/uploads/${item.productImage}`}  sx={{ width: 90, height: 90, borderRadius: 3, }} />
                      <Box flex={1}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} >
                          <Box>
                            <Typography fontWeight={700} fontSize={16}> {item.productName} </Typography>
                            <Typography fontSize={13} color="text.secondary" mt={0.5} > {item.category} </Typography>
                          </Box>
                          <Typography mt={1} fontWeight={700} fontSize={18} color="green.main" > ${item.price}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" >
                          <Typography mt={1} > x{item.quantity} </Typography>
                          <Button onClick={() => removeItem(item._id)} sx={{ minWidth: 0, color: "#f54346", }} >
                            <DeleteOutlineOutlinedIcon />
                          </Button>
                        </Stack>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>

          <Box sx={{ p: 3, borderTop: `1px dashed ${theme.palette.background.Inputborder}`, background: theme.palette.background.default, }}>
            <Stack direction="row" justifyContent="space-between" mb={2} >
              <Typography fontWeight={600} fontSize={18}> Total </Typography>
              <Typography fontWeight={700} fontSize={24} color="green.main" >${totalPrice.toFixed(2)} </Typography>
            </Stack>
            <Button fullWidth variant="contained" sx={{ py: 1.2, borderRadius: 3, textTransform: "none", fontWeight: 600, background: "linear-gradient(90deg,#00A76F,#00C853)", }}
              onClick={() => navigate(`/user/order/cart/${userId}`)}  >
              Buy Now</Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}