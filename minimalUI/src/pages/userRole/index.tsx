import { Outlet } from "react-router-dom";
import Header from "../../components/ui/header";

const UserRole = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default UserRole;