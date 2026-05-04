import { Grid, Box } from "@mui/material";
import StatsCard from "../users/components/Card";

const Users = () => {
    return (
        <Box sx={{ width: "100%" ,}}>
            <Grid container spacing={3} >
                <Grid >
                    <StatsCard title="Total active users"  value="18,765"  percentage="+2.6%"  trend="up" barsColor="#00a76f" sparkData={[15, 18, 12, 51, 68, 11, 39, 37]}/>
                </Grid>
                <Grid >
                    <StatsCard title="Total installed" value="4,876" percentage="+0.2%" trend="up" barsColor="#00b8d9" sparkData={[20, 41, 63, 33, 28, 35, 50, 46]}/>
                </Grid>
                <Grid>
                    <StatsCard title="Total downloads" value="678" percentage="-0.1%" trend="down" barsColor="#ff5630" sparkData={[18, 19, 31, 8, 16, 38, 12, 33]} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Users;