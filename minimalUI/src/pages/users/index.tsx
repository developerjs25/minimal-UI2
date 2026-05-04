import Header from "../../components/ui/header";

const User = ({children}:any) => {
  return (
    <Header>
      {children}
    </Header>
  );
};

export default User;