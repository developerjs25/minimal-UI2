import { Box, Link, Breadcrumbs, } from "@mui/material";
import { FONTS } from "../../constants/fonts";
import { useTheme } from "@mui/material/styles";

const Breadcrumb = ({ link1, linkName1, link2, linkName2, link3, linkName3 }: any) => {
    const theme = useTheme();

    return (
        <Box>
            <Breadcrumbs separator="•" aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href={link1} sx={{ fontSize: 14, color: theme.palette.background.whiteBlack,}}>{linkName1}</Link>
                <Link underline="hover" color="inherit" href={link2} sx={{ fontSize: 14, color: theme.palette.background.whiteBlack,}}>{linkName2}</Link>
                <Link underline="hover" color="inherit" href={link3} sx={{ color: 'primary.light', fontFamily: FONTS.primary, }}>{linkName3}</Link>
            </Breadcrumbs>
        </Box>
    )
}

export default Breadcrumb
