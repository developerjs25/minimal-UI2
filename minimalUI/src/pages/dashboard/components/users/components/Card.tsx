import React from "react";
import Stack from '@mui/material/Stack';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { Card, Box, Typography } from "@mui/material";
import Images from "../../../../../constants/Images";
import type { StatsCardProps } from "../../../../../Types";



const StatsCard: React.FC<StatsCardProps> = ({ title, value, percentage, trend, barsColor, sparkData, }) => {
    return (
        <Card sx={{ p: 3, borderRadius: 3, border: "1px solid #f3f3f3", boxShadow: `0 0 2px 0 rgba(145 158 171 / 20%), 0 12px 24px -4px rgba(145 158 171 / 12%)`, display: "flex", justifyContent: "space-between", alignItems: "center", width: 468, }}>
            <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500, }}>{title}</Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}> {value}</Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {trend === "up" ? (
                        <Box sx={{ color: "#22C55E", fontSize: 18, mr: 0.5 }}>
                            <Box component="img" src={Images.TrendUp} alt="Up" sx={{ width: 18, height: 18 }} />
                        </Box>
                    ) : (
                        <Box sx={{ color: "#FF5630", fontSize: 18, mr: 0.5, transform: "rotate(180deg)" }}>
                            <Box component="img" src={Images.TrendUp} alt="Down" sx={{ width: 18, height: 18 }} />
                        </Box>
                    )}
                    <Typography variant="body2" sx={{ color: trend === "up" ? "#22C55E" : "#FF5630", fontWeight: 600, mr: 0.5, }}> {percentage} </Typography>
                    <Typography variant="body2" sx={{ color: "#637381" }}> last 7 days</Typography>
                </Box>
            </Box>
            <Stack direction="row" sx={{ width: 90, }}>
                <Box sx={{ flexGrow: 1 }}>
                    <SparkLineChart plotType="bar" data={sparkData} height={60} width={70} showTooltip showHighlight color={barsColor}
                        xAxis={{
                            scaleType: "band",
                            data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                        }}
                    />
                </Box>
            </Stack>
        </Card>
    );
};

export default StatsCard;