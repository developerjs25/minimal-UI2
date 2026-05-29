import React, { useState, useEffect } from "react";
import {
    Box, Card, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
    TablePagination, Checkbox, TextField, Stack, CircularProgress
} from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { getUserStatusStyle, } from "../contact/OrderContant";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import StyledChip from "../chip";
import { FONTS } from "../../constants/fonts";
import { useNavigate } from "react-router-dom";
import DeletePopup from "../popup/Deletepopup";
import ActionMenu from "../ActionMenu";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

const List: React.FC = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [value, setValue] = useState("1");
    const [selected, setSelected] = useState<string[]>([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [openDeletePopup, setOpenDeletePopup] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [orders, setOrder] = useState<any[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [sortField, setSortField] = useState<string>("productName");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const theme = useTheme();


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);

                const res = await axios.get("http://localhost:3003/orders",
                    {
                        params: {
                            page: page + 1,
                            limit: rowsPerPage,
                            search,
                            sortField,
                            sortOrder,
                        },
                    }
                );

                setOrder(res.data.data);
                setTotalCount(res.data.total);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [page, rowsPerPage, search, sortField, sortOrder]);


    const handleDelete = async (id: string | null) => {
        if (!id) return;

        try {
            await axios.delete(`http://localhost:3003/orders/${id}`);

            setOrder((prevOrder) =>
                prevOrder.filter((Order) => Order._id !== id)
            );
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };
    // const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    //     setValue(newValue);
    //     setPage(0);
    //     setSelected([]);
    // };

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSelectRow = (id: string) => {
        const strId = id.toString();
        setSelected((prev) =>
            prev.includes(strId)
                ? prev.filter((item) => item !== strId)
                : [...prev, strId]
        );
    };

    const isSelected = (id: string) => selected.includes(id.toString());

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = orders.map((row) => row._id.toString());
            setSelected(newSelected);
        } else {
            setSelected([]);
        }
    };

    return (
        <Grid>
            <Card sx={{ borderRadius: 3, boxShadow: "0 3px 10px rgba(133, 131, 131, 0.12)", mt: 4, }}>
                <CardContent sx={{ p: 0, backgroundColor: theme.palette.background.listColor, }}>
                    <TabContext value={value}>
                        {/* <Box sx={{ borderBottom: 1, borderColor: "divider", px: 3, }}>
                                <TabList variant="scrollable" onChange={handleChangeTab} sx={{
                                    "& .MuiTabs-indicator": { backgroundColor: theme.palette.background.whiteBlack, },
                                }} scrollButtons="auto">
                                    <Tab sx={{ "&.Mui-selected": { color: theme.palette.background.whiteBlack }, textTransform: "none", }} label={
                                        <Box display="flex" alignItems="center" gap={1}> All
                                            <StyledChip label={allCount.toString()} bgcolor={theme.palette.background.whiteBlack} color={theme.palette.background.listColor} />
                                        </Box>} value="1" />
                                    <Tab sx={{ "&.Mui-selected": { color: theme.palette.background.whiteBlack }, textTransform: "none", }} label={
                                        <Box display="flex" alignItems="center" gap={1}>Pending
                                            <StyledChip label={pendingCount.toString()} bgcolor={value === "2" ? "#ffb84d" : "#fdebd1"} color={value === "2" ? "black.main" : "#B76E00"} />
                                        </Box>} value="2" />
                                    <Tab sx={{ "&.Mui-selected": { color: theme.palette.background.whiteBlack }, textTransform: "none", }} label={
                                        <Box display="flex" alignItems="center" gap={1}> Completed
                                            <StyledChip label={completedCount.toString()} bgcolor={value === "3" ? "#22C55E" : "green.light"} color={value === "3" ? "white.main" : "#00A76F"} />
                                        </Box>} value="3" />
                                </TabList>
                            </Box> */}
                        <TabPanel value={value} sx={{ p: 0 }}>
                            <TextField placeholder="Search customer..." size="small" value={search} onChange={(e) => setSearch(e.target.value)} sx={{
                                width: { xs: "100%", sm: 300, md: 400, lg: 550 },
                                "& .MuiOutlinedInput-root": { borderRadius: 2, py: 1, m: { xs: 1, sm: 2 }, },
                                "&.Mui-focused fieldset": { borderColor: "#212B36", }, "&.Mui-active fieldset": { borderColor: "#212B36", },
                            }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{ color: "gray" }} />
                                        </InputAdornment>),
                                }} />
                            <TableContainer sx={{
                                overflowX: "auto", width: "100%", display: "block", position: "relative", borderRadius: "12px",
                                "&::-webkit-scrollbar": { height: "6px", },
                            }}>
                                <Table sx={{ minWidth: 960 }}>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: theme.palette.background.TableRowColor }}>
                                            <TableCell padding="checkbox" >
                                                <Checkbox indeterminate={selected.length > 0 && selected.length < orders.length}
                                                    checked={orders.length > 0 && selected.length === orders.length}
                                                    onChange={handleSelectAll}
                                                    sx={{
                                                        color: "#637381", "&.Mui-checked": { color: "green.main" }, "&.MuiCheckbox-indeterminate": { color: "green.main" },
                                                        "& .MuiSvgIcon-root": { borderRadius: "50%", width: 20, height: 20, },
                                                    }} />
                                            </TableCell>
                                            <TableCell sx={{ fontFamily: FONTS.primary, fontWeight: 550, color: "#637381" }}> Order</TableCell>
                                            <TableCell sx={{ fontFamily: FONTS.primary, fontWeight: 550, color: "#637381" }}>Customer</TableCell>
                                            <TableCell sx={{ fontFamily: FONTS.primary, fontWeight: 550, color: "#637381" }}>Date</TableCell>
                                            <TableCell sx={{ fontFamily: FONTS.primary, fontWeight: 550, color: "#637381" }}>Items</TableCell>
                                            <TableCell sx={{ fontFamily: FONTS.primary, fontWeight: 550, color: "#637381" }}>Price</TableCell>
                                            <TableCell sx={{ fontFamily: FONTS.primary, fontWeight: 550, color: "#637381" }}>Status</TableCell>
                                            <TableCell align="right" />
                                        </TableRow>
                                    </TableHead>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center">
                                                <Box sx={{ py: 6, display: "flex", justifyContent: "center", alignItems: "center", }}>
                                                    <CircularProgress sx={{ color: "green.main" }} />
                                                    {/* <SyncLoader color={theme.palette.green.main} loading={true} /> */}
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ) : orders.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center">
                                                <Typography sx={{ py: 4, color: "#637381" }}>
                                                    User not found
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        <TableBody>
                                            {orders.map((order) => {
                                                const isItemSelected = isSelected(order._id);
                                                return (
                                                    <TableRow key={order._id} selected={isItemSelected} hover sx={{
                                                        cursor: "pointer",
                                                        "&:hover": { backgroundColor: isItemSelected ? "rgba(0, 167, 111, 0.2)" : "rgba(0, 167, 111, 0.08)", },
                                                        "&.Mui-selected": { backgroundColor: "rgba(105, 240, 195, 0.16)", "&:hover": { backgroundColor: "rgba(0, 167, 111, 0.2)", }, },
                                                    }}>
                                                        <TableCell padding="checkbox" >
                                                            <Checkbox checked={isItemSelected} onChange={() => handleSelectRow(order._id)} sx={{
                                                                color: "#637381", "&.Mui-checked": { color: "green.main" },
                                                                "& .MuiSvgIcon-root": { borderRadius: "50%", width: 20, height: 20 },
                                                            }} />
                                                        </TableCell>
                                                        <TableCell sx={{ textDecoration: "underline" }}>{order.orderNumber}</TableCell>
                                                        <TableCell>
                                                            <Box display="flex" alignItems="center" gap={1}>
                                                                <Box component="img" src={order.customerimage} alt={order.customerName} sx={{ width: 40, height: 40, borderRadius: "50%", }} />
                                                                <Stack>
                                                                    <Typography fontSize={14}>{order.customerName}</Typography>
                                                                    <Typography fontSize={13} color="neutral.main" > {order.email} </Typography>
                                                                </Stack>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell >
                                                            <Stack>
                                                                <Typography fontSize={14}>{order.date}</Typography>
                                                                <Typography fontSize={13} color="text.secondary">{order.time}</Typography>
                                                            </Stack>
                                                        </TableCell>
                                                        <TableCell>
                                                            {order.products?.reduce(
                                                                (sum: number, item: any) => sum + item.quantity,
                                                                0
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            $ {order.total?.toFixed(2)}
                                                        </TableCell>
                                                        <TableCell>
                                                            <StyledChip
                                                                label={order.status}
                                                                bgcolor={getUserStatusStyle(order.status).backgroundColor}
                                                                color={getUserStatusStyle(order.status).color}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <ActionMenu firstlink="View" secoundlink="Edit" thirdlink="Delete" onView={() => navigate(`/app/order/details/${order._id}`)}
                                                                onDelete={() => { setSelectedUserId(order._id); setOpenDeletePopup(true); }} />
                                                            <DeletePopup open={openDeletePopup}
                                                                onClose={() => setOpenDeletePopup(false)}
                                                                onConfirm={() => { handleDelete(selectedUserId); setOpenDeletePopup(false); }} />
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    )}
                                </Table>
                            </TableContainer>
                            <Stack direction="row" justifyContent="end" px={2}>
                                <TablePagination component="div" count={totalCount} page={page} onPageChange={handleChangePage} rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={handleChangeRowsPerPage} rowsPerPageOptions={[5, 10, 25]} />
                            </Stack>
                        </TabPanel>
                    </TabContext>

                </CardContent>
            </Card>
        </Grid>
    );
};

export default List;