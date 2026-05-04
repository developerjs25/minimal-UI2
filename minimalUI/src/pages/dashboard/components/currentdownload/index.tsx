import { useState } from "react";
import {Box ,Typography ,Stack} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

const data = [
  { label: "Mac", value: 12244, color: "#c8fad6", hoverColor: "#A1DAB4" },
  { label: "Window", value: 53345, color: "#5be49b", hoverColor: "#A1DAB4" },
  { label: "iOS", value: 44313, color: "#007867", hoverColor: "#A1DAB4" },
  { label: "Android", value: 78343, color: "#004b50", hoverColor: "#A1DAB4" },
];
export default function CurrentDownloadWidget() {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  const [centerText, setCenterText] = useState("Total");
  const [centerValue, setCenterValue] = useState(total.toLocaleString());
  const [centerColor, setCenterColor] = useState("#555");

  return (
    <Box sx={{ maxWidth: 490, borderRadius: 3, border: "1px solid #f3f3f3" , boxShadow: `0 0 2px 0 rgba(145 158 171 / 20%), 0 12px 24px -4px rgba(145 158 171 / 12%)`,}}>
      <Box sx={{ p: 3 }}>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          Current download
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Downloaded by operating system
        </Typography>
        <Box sx={{ position: "relative", width: 300, mx: "auto" }}>
          <PieChart series={[{ data, innerRadius: "65%", outerRadius: "90%", },]} hideLegend width={300} height={300}
            onTooltipItemChange={(tooltip) => {
              if (tooltip) {
                const datum = data[tooltip.dataIndex];
                setCenterText(datum.label);
                setCenterValue(datum.value.toLocaleString());
                setCenterColor(datum.color);
              } else {
                setCenterText("Total");
                setCenterValue(total.toLocaleString());
                setCenterColor("#555");
              }
            }}
          />
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", pointerEvents: "none", }}>
            <Typography variant="body1" color="text.secondary">
              {centerText}
            </Typography>
            <Typography variant="h5" fontWeight={700} color={centerColor}>
              {centerValue}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Stack direction="row" justifyContent="center" gap={3} mt={3} borderTop="1px solid #f3f3f3" p={2}>
        {data.map(({ label, color }) => (
          <Stack key={label} direction="row" spacing={1} alignItems="center">
            <Box sx={{ width: 14, height: 14, bgcolor: color, borderRadius: "50%", }} />
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}