import React, { useState, useEffect } from "react";
import {
  Box, Card, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, TablePagination, Checkbox, Tab, TextField, Stack,
  Avatar,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { getUserRoleStyle, getUserStatusStyle } from "../contact/UserContant";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import StyledChip from "../chip";
import { useNavigate } from "react-router-dom";
import DeletePopup from "../popup/Deletepopup";
import ActionMenu from "../ActionMenu";
import { useTheme } from "@mui/material/styles";
import { BarLoader } from "react-spinners";
import axios from "axios";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Images from "../../constants/Images";

const List: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<string>("firstName");
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState<any[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [value, setValue] = useState("1");
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await axios.get("http://localhost:3003/data", {
          params: {
            page: page + 1,
            limit: rowsPerPage,
            search: search,
            status: value === "1" ? "" : statusMap[value],
            sortField,
            sortOrder,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setUsers(res.data.data);
        setTotalCount(res.data.total);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, rowsPerPage, search, value, sortField, sortOrder]);

  useEffect(() => {
    setPage(0);
  }, [search, value, rowsPerPage]);

  const handleDelete = async (id: string) => {
    if (!id) return;

    try {
      await axios.delete(`http://localhost:3003/data/${id}`);

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== id)
      );
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setPage(0);
    setSelected([]);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectRow = (id: number) => {
    const strId = id.toString();
    setSelected((prev) =>
      prev.includes(strId)
        ? prev.filter((item) => item !== strId)
        : [...prev, strId]
    );
  };

  const isSelected = (id: number) => selected.includes(id.toString());

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = users
        .filter((row) => row._id != null)
        .map((row) => row._id.toString());
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  // const allCount = users.length;
  // const activeCount = users.filter((u) => u.status?.toLowerCase() === "active").length;
  // const pendingCount = users.filter((u) => u.status?.toLowerCase() === "inactive").length;
  // const bannedCount = users.filter((u) => u.status?.toLowerCase() === "banned").length;

  const statusMap: Record<string, string> = {
    "2": "active",
    "3": "inactive",
    "4": "banned",
  };

  // const filteredRows =
  //   value === "1"
  //     ? users.filter((inv) => {
  //       const haystack = `
  //         ${inv.firstName} 
  //         ${inv.lastName} 
  //         ${inv.email} 
  //         ${inv.phone}
  //       `.toLowerCase();

  //       return haystack.includes(search.toLowerCase());
  //     })
  //     : users.filter((inv) => {
  //       const haystack = `
  //         ${inv.firstName} 
  //         ${inv.lastName} 
  //         ${inv.email} 
  //         ${inv.phone}
  //       `.toLowerCase();

  //       return (
  //         inv.status?.toLowerCase() === statusMap[value] &&
  //         haystack.includes(search.toLowerCase())
  //       );
  //     });


  // const sortedRows = [...filteredRows].sort((a, b) => {
  //   const getValue = (row: any) =>
  //     (row[sortField] || "").toString().toLowerCase();

  //   const valA = getValue(a);
  //   const valB = getValue(b);

  //   if (valA < valB) return sortOrder === "asc" ? -1 : 1;
  //   if (valA > valB) return sortOrder === "asc" ? 1 : -1;
  //   return 0;
  // });

  // const paginatedRows = sortedRows.slice(
  //   page * rowsPerPage,
  //   page * rowsPerPage + rowsPerPage
  // );


  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };


  return (
    <Grid>
      <Card sx={{ borderRadius: 3, boxShadow: "0 3px 10px rgba(133, 131, 131, 0.12)", mt: 4, }}>
        <CardContent sx={{ p: 0, backgroundColor: theme.palette.background.listColor, }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", px: 3, }}>
              <TabList variant="scrollable" onChange={handleChangeTab}
                sx={{ "& .MuiTabs-indicator": { backgroundColor: theme.palette.background.whiteBlack, }, }}
                scrollButtons="auto">
                <Tab sx={{ "&.Mui-selected": { color: theme.palette.background.whiteBlack }, textTransform: "none", }}
                  label={
                    <Box display="flex" alignItems="center" gap={1}>All
                      <StyledChip label={users.length.toString()} bgcolor={theme.palette.background.whiteBlack} color={theme.palette.background.listColor} />
                    </Box>
                  }
                  value="1"
                />
                <Tab sx={{ "&.Mui-selected": { color: theme.palette.background.whiteBlack }, textTransform: "none", }}
                  label={
                    <Box display="flex" alignItems="center" gap={1}>Active
                      <StyledChip label={users.filter((u) => u.status?.toLowerCase() === "active").length.toString()} bgcolor={value === "2" ? "#22C55E" : "green.light"} color={value === "2" ? "white.main" : "#00A76F"} />
                    </Box>
                  }
                  value="2"
                />
                <Tab sx={{ "&.Mui-selected": { color: theme.palette.background.whiteBlack }, textTransform: "none", }}
                  label={
                    <Box display="flex" alignItems="center" gap={1}>Inactive
                      <StyledChip label={users.filter((u) => u.status?.toLowerCase() === "inactive").length.toString()} bgcolor={value === "3" ? "#ffb84d" : "#fdebd1"} color={value === "3" ? "black.main" : "#B76E00"} />
                    </Box>
                  }
                  value="3"
                />
                <Tab sx={{ "&.Mui-selected": { color: theme.palette.background.whiteBlack }, textTransform: "none", }}
                  label={
                    <Box display="flex" alignItems="center" gap={1}>Banned
                      <StyledChip label={users.filter((u) => u.status?.toLowerCase() === "banned").length.toString()} bgcolor={value === "4" ? "#FF5630" : "rgba(255, 86, 58, 0.16)"} color={value === "4" ? "white.main" : "#FFAC82"} />
                    </Box>
                  }
                  value="4"
                />
              </TabList>
            </Box>

            <TabPanel value={value} sx={{ p: 0 }}>
              <TextField placeholder="Search..." size="small" value={search} onChange={(e) => setSearch(e.target.value)}
                sx={{
                  width: { xs: "100%", sm: 300, md: 400, lg: 550 },
                  "& .MuiOutlinedInput-root": { borderRadius: 2, py: 1, m: { xs: 1, sm: 2 }, },
                  "&.Mui-focused fieldset": { borderColor: "#212B36", },
                }}
                InputProps={{
                  startAdornment: (<InputAdornment position="start"><SearchIcon sx={{ color: "gray" }} /></InputAdornment>),
                }}
              />

              <TableContainer sx={{ overflowX: "auto", width: "100%", display: "block", position: "relative", borderRadius: "12px", "&::-webkit-scrollbar": { height: "6px" }, }}>
                <Table sx={{ minWidth: 960 }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: theme.palette.background.TableRowColor }}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          indeterminate={
                            selected.length > 0 && selected.length < users.length
                          }
                          checked={
                            users.length > 0 && selected.length === users.length
                          }
                          onChange={handleSelectAll}
                          sx={{
                            color: "#637381",
                            "&.Mui-checked": { color: "#00A76F" },
                            "&.MuiCheckbox-indeterminate": { color: "#00A76F" },
                            "& .MuiSvgIcon-root": { borderRadius: "50%", width: 20, height: 20, },
                          }}
                        />
                      </TableCell>
                      <TableCell onClick={() => handleSort("firstName")} sx={{ fontWeight: 550, color: "#637381", cursor: "pointer", }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          Name
                          {sortField === "firstName" && (sortOrder === "asc" ? (<KeyboardArrowUpIcon fontSize="small" />) : (<KeyboardArrowDownIcon fontSize="small" />))}
                        </Box>
                      </TableCell>
                      <TableCell onClick={() => handleSort("phone")} sx={{ fontWeight: 550, color: "#637381", cursor: "pointer", }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          Phone number
                          {sortField === "phone" && (sortOrder === "asc" ? (<KeyboardArrowUpIcon fontSize="small" />) : (<KeyboardArrowDownIcon fontSize="small" />))}
                        </Box>
                      </TableCell>
                      <TableCell onClick={() => handleSort("country")} sx={{ fontWeight: 550, color: "#637381", cursor: "pointer", }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          Country
                          {sortField === "country" && (sortOrder === "asc" ? (<KeyboardArrowUpIcon fontSize="small" />) : (<KeyboardArrowDownIcon fontSize="small" />))}
                        </Box>
                      </TableCell>
                      <TableCell onClick={() => handleSort("role")} sx={{ fontWeight: 550, color: "#637381", cursor: "pointer", }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          Role
                          {sortField === "role" && (sortOrder === "asc" ? (<KeyboardArrowUpIcon fontSize="small" />) : (<KeyboardArrowDownIcon fontSize="small" />))}
                        </Box>
                      </TableCell>
                      <TableCell onClick={() => handleSort("status")} sx={{ fontWeight: 550, color: "#637381", cursor: "pointer", }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          Status
                          {sortField === "status" && (sortOrder === "asc" ? (<KeyboardArrowUpIcon fontSize="small" />) : (<KeyboardArrowDownIcon fontSize="small" />))}
                        </Box>
                      </TableCell>
                      <TableCell align="right" />
                    </TableRow>
                  </TableHead>

                  {loading ? (
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          <Box sx={{ py: 6, display: "flex", justifyContent: "center", alignItems: "center", }}>
                            <BarLoader color={theme.palette.green.main} loading={true} />
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ) : users.length === 0 ? (
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          <Box component="img" src={Images.NoUserImage} alt="User not found" />
                          <Typography sx={{ pb: 4, color: "#637381" }}>User not found</Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ) : (
                    <TableBody>
                      {users.map((user) => {
                       const addr = user.defaultAddress;

                        const isItemSelected = isSelected(user._id);
                        return (
                          <TableRow key={user._id} selected={isItemSelected} hover
                            sx={{
                              cursor: "pointer", "&:hover": { backgroundColor: isItemSelected ? "rgba(0, 167, 111, 0.2)" : "rgba(0, 167, 111, 0.08)", },
                              "&.Mui-selected": { backgroundColor: "rgba(105, 240, 195, 0.16)", "&:hover": { backgroundColor: "rgba(0, 167, 111, 0.2)", }, },
                            }}>
                            <TableCell padding="checkbox">
                              <Checkbox checked={isItemSelected} onChange={() => handleSelectRow(user._id)}
                                sx={{ color: "#637381", "&.Mui-checked": { color: "green.main" }, "& .MuiSvgIcon-root": { borderRadius: "50%", width: 20, height: 20, }, }}
                              />
                            </TableCell>
                            <TableCell>
                              <Box display="flex" alignItems="center" gap={1}>
                                <Avatar src={user.image} alt={user.firstName} sx={{ width: 40, height: 40, borderRadius: "50%" }} />
                                <Stack>
                                  <Typography fontSize={14}>{user.firstName} {user.lastName}</Typography>
                                  <Typography fontSize={13} color="neutral.main">{user.email}</Typography>
                                </Stack>
                              </Box>
                            </TableCell>
                            <TableCell>{addr?.countryNumber || ""} {user.phone}</TableCell>
                            <TableCell>
                            {addr?.country || "-"}
                            </TableCell>
                            <TableCell> <StyledChip label={user.role} bgcolor={getUserRoleStyle(user.role).backgroundColor}
                              color={getUserRoleStyle(user.role).color} /></TableCell>
                            <TableCell>
                              <StyledChip label={user.status} bgcolor={getUserStatusStyle(user.status).backgroundColor}
                                color={getUserStatusStyle(user.status).color} />
                            </TableCell>
                            <TableCell align="right">
                              <ActionMenu firstlink="View" secoundlink="Edit" thirdlink="Delete" onView={() => navigate(`/app/user/view/${user._id}`)}
                                onEdit={() => navigate(`/app/user/edit/${user._id}`)}
                                onDelete={() => { setSelectedUserId(user._id); setOpenDeletePopup(true); }}
                              />
                              <DeletePopup open={openDeletePopup} onClose={() => setOpenDeletePopup(false)} onConfirm={() => {
                                if (selectedUserId !== null) {
                                  handleDelete(selectedUserId.toString());
                                }
                                setOpenDeletePopup(false);
                              }} />
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
