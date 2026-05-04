import { useTheme } from "@mui/material/styles"

export const getUserStatusStyle = (status: string) => {
    const normalized = status?.toLowerCase() || "active"; 
  switch (normalized) {
    case "active":
      return {
        color: "#118D57",
        backgroundColor: "rgba(34, 197, 94, 0.16)",
      };
    case "banned":
      return {
        color: "#B72136",
        backgroundColor: "rgba(255, 72, 66, 0.16)",
      };
    case "inactive":
      return {
        color: "#C68400",
        backgroundColor: "rgba(255, 171, 0, 0.16)",
      };
    default:
      return {};
  }
};
export const getUserRoleStyle = (role: string) => {
    const theme = useTheme();
  switch (role) {
    case "User":
      return {
        color: theme.palette.background.userchipcolor,
        backgroundColor:"rgba(0 ,184, 217, 0.16)",
      };
    case "Admin":
      return {
        color: theme.palette.background.whiteBlack, 
        backgroundColor: "rgba( 145 158 171 ,0.16)",
      };
    default:
      return {
        color: "#6B7280", // gray
        backgroundColor: "#F3F4F6",
      };
  }
};

