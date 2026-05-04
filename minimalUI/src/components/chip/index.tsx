import { Chip as MuiChip } from "@mui/material";
import type {StyledChipProps} from "../../Types"

const StyledChip: React.FC<StyledChipProps> = ({ label, bgcolor, color }) => {
  return (
    <MuiChip
      label={label}
      size="small"
      sx={{
        backgroundColor: bgcolor, 
        color: color,
        borderRadius: 1.5,
        fontSize: 12,
        fontWeight: 600,
      }}
    />
  );
};

export default StyledChip;