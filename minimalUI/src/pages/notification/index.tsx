import { Box, Typography, Paper, Avatar, Stack } from "@mui/material";
import Images from "../../constants/Images";
import { useTheme } from "@mui/material/styles";

interface UserList {
    id: number;
    image: string;
    name: string;
    message: string;
    time: string;
    date: string;
    isRead: boolean;
}

const notifications: UserList[] = [
    {
        id: 1,
        image: Images.shiping,
        name: "Rúben Rocha",
        message: "Your order is placed waiting for shipping",
        time: "Today 9:42 AM",
        date: "Today",
        isRead: false
    },
    {
        id: 2,
        image: Images.shiped,
        name: "Rúben Rocha",
        message: "Delivery processing your order is being shipped",
        time: "Today 8:10 AM",
        date: "Today",
        isRead: true
    },
    {
        id: 3,
        image: Images.message,
        name: "Rúben Rocha",
        message: "You have new message 5 unread messages",
        time: "Yesterday 7:30 PM",
        date: "Yesterday",
        isRead: false
    },
    {
        id: 4,
        image: Images.mail,
        name: "Rúben Rocha",
        message: "You have new mail",
        time: "Yesterday 6:00 PM",
        date: "Yesterday",
        isRead: true
    },
    {
        id: 5,
        image: Images.mail,
        name: "System",
        message: "Process exceeded retry limit",
        time: "May 20 8:00 PM",
        date: "May 20",
        isRead: false
    },
    {
        id: 6,
        image: Images.mail,
        name: "System",
        message: "Process exceeded retry limit",
        time: "Sep 20 8:00 PM",
        date: "Sep 20",
        isRead: true
    }
];

const groupedNotifications: { [key: string]: UserList[] } = {
    today: notifications.filter((n) => n.date === "today"),
    yesterday: notifications.filter((n) => n.date === "yesterday"),
    ...Object.fromEntries(
        notifications
            .filter((n) => n.date !== "today" && n.date !== "yesterday")
            .map((n) => [n.date, notifications.filter((x) => x.date === n.date)])
    )
};

export default function NotificationsPage() {
    const renderSection = (title: string, data: any[]) => {
        if (!data.length) return null;
        return (
            <>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2, mt: 3 }}>
                    <Box sx={{ flex: 1, height: "1px", backgroundColor: "#8d8b8b" }} />
                    <Typography sx={{ fontWeight: 500, fontSize: 13 , px: 0.9, borderRadius: 5,  backgroundColor: theme.palette.background.listColor, color: theme.palette.background.whiteBlack}}>
                        {title}
                    </Typography>
                    <Box sx={{ flex: 1, height: "1px", backgroundColor: "#8d8b8b" }} />
                </Stack>
                {data.map((item) => (
                    <Paper key={item.id} sx={{ p: 2, mb: 2, boxShadow: "none", backgroundColor: theme.palette.background.listColor ,borderRadius: 3, "&:hover": { backgroundColor: theme.palette.background.notificationHover} }} >
                        <Stack direction={{ xs: "column", sm: "row" }}  justifyContent="space-between" alignItems={{ xs: "start", sm: "center" }}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar src={item.image} sx={{ width: 35, height: 35 }} />
                                <Box>
                                    <Typography fontWeight={600}>{item.name}</Typography>
                                    <Typography variant="body2" color="text.secondary"> {item.message}</Typography>
                                </Box>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography variant="caption" color="text.secondary">{item.time}</Typography>
                                {!item.isRead && (<Box sx={{ width: 10, height: 10, bgcolor: "#FF5630", borderRadius: "50%" }} />)}
                            </Stack>
                        </Stack>
                    </Paper>
                ))}
            </>
        );
    };
    const theme = useTheme();

    return (
        <Box sx={{ backgroundColor: theme.palette.background.notificationbg,}}>
            <Box sx={{ maxWidth: 1420, mx: "auto", }}>
                <Typography variant="h5" sx={{ px: 5, pt: 4, fontWeight: 700 }}>
                    Notifications
                </Typography>
                <Box sx={{ minHeight: "100vh", py: 3 }}>
                    <Box sx={{ px: { xs: 2, md: 3 } }}>
                        {Object.entries(groupedNotifications).map(([title, items]) =>
                            renderSection(title, items)
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}