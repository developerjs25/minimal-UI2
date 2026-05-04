import { Box, Card, CardContent, Typography, Grid, Chip, Tabs, Tab, Stack, } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import React from "react";
import { apps } from "./components/ApplicationItems";
import Images from "../../../../constants/Images";

const Application: React.FC = () => {
    const [tab, setTab] = React.useState(0);
    return (
        <Grid sx={{maxWidth: 520}}>
            <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 0 }}>
                    <Typography variant="h6" fontWeight={600} p={3}> Related applications</Typography>
                    <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} variant="fullWidth" sx={{ mb: 2, backgroundColor: "#F4F6F8" }}>
                        <Tab sx={{ color: "#637381", fontWeight: 600, textTransform: 'none' }} label="Top 7 days" />
                        <Tab sx={{ color: "#637381", fontWeight: 600, textTransform: 'none' }} label="Top 30 days" />
                        <Tab sx={{ color: "#637381", fontWeight: 600, textTransform: 'none' }} label="All times" />
                    </Tabs>
                    <Stack spacing={2}>
                        {apps.map((app, index) => (
                            <Box key={index} paddingX={2} paddingY={1}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Box component="img" sx={{ width: 40, height: 40, borderRadius: 1 }} src={app.logo} alt={app.name} />
                                    <Box flexGrow={1}>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Typography variant="body1" fontWeight={550}> {app.name}</Typography>
                                            <Chip label={app.price} size="small" sx={{ height: 22, fontSize: "0.75rem", fontWeight: 650,
                                                 ...(app.price !== "Free" && { color: "#118D57", backgroundColor: "rgba(34, 197, 94, 0.16)",}),}} />
                                        </Stack>
                                        <Stack direction="row" spacing={2} mt={0.5} alignItems="center">
                                            <Stack direction="row" spacing={0.5} alignItems="center">
                                                {/* <Box component="img" src={Images.Download} alt="Downloads" sx={{ width: 14, height: 14, }} /> */}
                                                <Typography variant="caption"> {app.downloads}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={0.5} alignItems="center">
                                                <Box component="img" src={Images.size} alt="Size" sx={{ width: 14, height: 14, }} />
                                                <Typography variant="caption">{app.size}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={0.5} alignItems="center">
                                                <StarIcon fontSize="small" color="warning" />
                                                <Typography variant="caption">{app.rating}</Typography>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Box>
                        ))}
                    </Stack>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Application
