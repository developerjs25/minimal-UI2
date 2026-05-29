import ForgetPassword from "./pages/forgetPassword";
import LoginPage from "./pages/login/page";
import MyAccount from "./pages/myaccount";
import SigninPage from "./pages/signin";
import { GuestListRoute, PrivateLoginRoute, RoleRoute } from "./routes/privateRoutes";
import AppRoutes from "./routes/routes";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { syncUser } from "./authService";
import UserRole from "./pages/userRole";
import Productslist from "./pages/userproduct/productlist";
import UserProductDetails from "./pages/userproduct/productdetails";
import ProductOrderDetails from "./pages/userproduct/productorder";

const App = () => {
  useEffect(() => {
    syncUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login/*" element={<GuestListRoute><LoginPage /></GuestListRoute>} />
      <Route path="/signup" element={<GuestListRoute><SigninPage /></GuestListRoute>} />
      <Route path="/forgetpassword" element={<GuestListRoute> <ForgetPassword /> </GuestListRoute>} />
      <Route path="/user" element={<UserRole />}>
        <Route path="my-account/:id" element={<MyAccount />} />
        <Route path="product/details/:id" element={<UserProductDetails />} />
        <Route path="product" element={<Productslist />} />
        <Route path="order/product/:productId" element={<ProductOrderDetails />} />
        <Route path="order/cart/:userId" element={<ProductOrderDetails />} />
      </Route>

      <Route path="/app/*" element={
        <PrivateLoginRoute>
          <RoleRoute allowedRoles={["Admin"]}>
            <AppRoutes />
          </RoleRoute>
        </PrivateLoginRoute>
      }
      />
    </Routes>
  );
};

export default App;