import * as React from "react";
import { Card, CardContent, Typography, Box, Stack, Select, MenuItem, } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const asia = [5, 18, 14, 9, 20, 6, 22, 19, 8, 22, 8, 17];
const europe = [6, 17, 14, 8, 20, 7, 22, 19, 8, 22, 8, 17];
const americas = [7, 18, 14, 10, 20, 5, 21, 18, 8, 22, 8, 17];

export default function AreaInstalledCard() {
  const [year, setYear] = React.useState("2023");

  return (
    <Card sx={{ maxWidth: 950, borderRadius: 3, boxShadow: `0 0 2px 0 rgba(145 158 171 / 20%), 0 12px 24px -4px rgba(145 158 171 / 12%)`,p: 1, }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h6" fontSize={"18px"} fontWeight={540}>
              Area installed
            </Typography>
            <Typography variant="body2" color="text.secondary">
              (+43%) than last year
            </Typography>
          </Box>

          <Select size="small" value={year} onChange={(e) => setYear(e.target.value)}
            sx={{ "& .MuiSelect-select": { py: 0.5, px: 1.5, borderRadius: 1, border: "1px solid #f3f3f3", }, }}  >
            <MenuItem value="2023">2023</MenuItem>
            <MenuItem value="2022">2022</MenuItem>
          </Select>
        </Stack>
        <Stack direction="row" spacing={4} mb={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#007867", }} />
            <Typography variant="body2" >Asia</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#ffab00", }} />
            <Typography variant="body2" >Europe</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#00B8D9", }} />
            <Typography variant="body2" >Americas</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={4.9 } mb={2}>
          <Typography variant="h6" fontWeight={600}>1.23k</Typography>
          <Typography variant="h6" fontWeight={600}>6.79k</Typography>
          <Typography variant="h6" fontWeight={600}>1.01k</Typography>
        </Stack>

        <BarChart
          height={300}
          xAxis={[{ scaleType: "band", data: months }]}
          series={[
            { data: asia, stack: "total", color: "#007867" },
            { data: europe, stack: "total", color: "#ffab00" },
            { data: americas, stack: "total", color: "#00B8D9" },
          ]}
          grid={{ horizontal: true, vertical: false }}
          borderRadius={4}
          sx={{
            "& .MuiChartsAxis-tickLabel": {
              fill: "#b1b1b1",
              fontSize: "12px",
              fontWeight: 500,
            },
            "& .MuiChartsGrid-line": {
              strokeDasharray: "4 4",
              stroke: "#e7e7e7",
              strokeWidth: 1,
            },
            "& .MuiChartsAxis-root line": {
              display: "none",
            },
            "& .MuiBarElement-root": {
              width: 33,
            },
            "& .MuiBarElement-root:hover": {
              opacity: 0.8,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}

