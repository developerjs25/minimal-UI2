import ForgetPassword from "./pages/forgetPassword";
import LoginPage from "./pages/login/page";
import MyAccount from "./pages/myaccount";
import SigninPage from "./pages/signin";
// import User from "./pages/users";
import { GuestListRoute, PrivateLoginRoute, RoleRoute } from "./routes/privateRoutes";
import AppRoutes from "./routes/routes";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { syncUser } from "./authService";
import UserRole from "./pages/userRole";
const App = () => {

  useEffect(() => {
    syncUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login/*" element={<GuestListRoute> <LoginPage /> </GuestListRoute>} />
      <Route path="/signup" element={<GuestListRoute> <SigninPage /> </GuestListRoute>} />
      <Route path="/forgetpassword" element={<GuestListRoute> <ForgetPassword /> </GuestListRoute>} />
      <Route path="/user" element={<UserRole />}>
        <Route path="/user/my-account/:id" element={<MyAccount />} />
      </Route>
      <Route path="/app/*" element={<PrivateLoginRoute><RoleRoute allowedRoles={["Admin"]}> <AppRoutes /> </RoleRoute></PrivateLoginRoute>} />
    </Routes>
  );
};

export default App;
// import AddressList from "./pages/myaccount/address/addresslist";
// import AddAddress from "./pages/myaccount/address/addaddress";
// import { useState } from "react";

// const AddressPage = () => {
//   const [refresh, setRefresh] = useState(false);

//   return (
//     <div>
//       <AddAddress onSuccess={() => setRefresh(!refresh)} />
//       <AddressList key={refresh} />
//     </div>
//   );
// };

// export default AddressPage;