import React, { useState, useMemo, useEffect } from "react";
import { Box, Card, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TablePagination,
  Checkbox, TextField, Stack, LinearProgress, InputAdornment, CircularProgress,} from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { getProductStatusStyle, getStockStatus } from "../contact/ProductContant";
import StyledChip from "../chip";
import { productRows } from "../contact/ProductContant";
import ActionMenu from "../ActionMenu";
import DeletePopup from "../popup/Deletepopup";
import { useTheme } from "@mui/material/styles";
import { SyncLoader } from "react-spinners";

const List: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [value] = useState("1");
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (id: number | null) => {
    if (!id) return;
    console.log("Deleting product with id:", id);
  };

  

  const handleSelectRow = (id: number) => {
    const strId = id.toString();
    setSelected((prev) =>
      prev.includes(strId)
        ? prev.filter((item) => item !== strId)
        : [...prev, strId]
    );
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(filteredRows.map((row) => row.id.toString()));
    } else {
      setSelected([]);
    }
  };

  const filteredRows = useMemo(() => {
    return productRows.filter((inv) => {
      const matchesSearch =
        inv.name.toLowerCase().includes(search.toLowerCase()) ||
        inv.item.toLowerCase().includes(search.toLowerCase());

      if (value === "1") return matchesSearch;
      if (value === "2") return inv.status.toLowerCase() === "active" && matchesSearch;
      if (value === "3") return inv.status.toLowerCase() === "pending" && matchesSearch;

      return false;
    });
  }, [value, search]);

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Grid>
      <Card sx={{ borderRadius: 3, mt: 4 }}>
        <CardContent sx={{ p: 0, backgroundColor: theme.palette.background.listColor, }}>
          <TabContext value={value}>
            <TabPanel value={value} sx={{ p: 0 }}>
              <TextField placeholder="Search..." size="small" value={search} onChange={(e) => setSearch(e.target.value)} sx={{
                width: 550,
                "& .MuiOutlinedInput-root": { borderRadius: 2, py: 0.7, m: 2, },
                "&.Mui-focused fieldset": { borderColor: "#3b444e" },
              }}
                InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>), }}
              />

              <TableContainer sx={{
                overflowX: "auto", width: "100%", display: "block", position: "relative", borderRadius: "12px",
                "&::-webkit-scrollbar": { height: "6px", },
                "&::-webkit-scrollbar-thumb": { backgroundColor: "#C1C1C1", borderRadius: "10px", },
                "&::-webkit-scrollbar-track": { backgroundColor: "#F4F6F8", },
              }}>
                <Table sx={{ minWidth: 960 }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: theme.palette.background.TableRowColor }}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          indeterminate={
                            selected.length > 0 && selected.length < filteredRows.length
                          }
                          checked={
                            filteredRows.length > 0 && selected.length === filteredRows.length
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
                      <TableCell sx={{ borderLeft: "1px solid #0000", fontWeight: 550, color: "#637381", }}>Product</TableCell>
                      <TableCell sx={{ borderLeft: "1px solid #0000", fontWeight: 550, color: "#637381", }}>Create at</TableCell>
                      <TableCell sx={{ borderLeft: "1px solid #0000", fontWeight: 550, color: "#637381", }}>Stock</TableCell>
                      <TableCell sx={{ borderLeft: "1px solid #0000", fontWeight: 550, color: "#637381", }}>Price</TableCell>
                      <TableCell sx={{ borderLeft: "1px solid #0000", fontWeight: 550, color: "#637381", }}>Publish</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Box sx={{ py: 6, display: "flex", justifyContent: "center", alignItems: "center", }}>
                          <SyncLoader color={theme.palette.green.main} loading={true} />
                          {/* <CircularProgress sx={{ color: "green.main" }} /> */}
                          </Box>
                      </TableCell>
                    </TableRow>
                  ) : filteredRows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Typography sx={{ py: 4, color: "#637381" }}>User not found</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableBody>
                      {paginatedRows.map((product) => {
                        const isItemSelected = selected.includes(product.id.toString());

                        return (
                          <TableRow key={product.id} selected={isItemSelected} hover sx={{
                            cursor: "pointer",
                            "&:hover": { backgroundColor: isItemSelected ? "rgba(0, 167, 111, 0.2)" : "rgba(0, 167, 111, 0.08)", },
                            "&.Mui-selected": { backgroundColor: "rgba(105, 240, 195, 0.16)", "&:hover": { backgroundColor: "rgba(0, 167, 111, 0.2)", }, },
                          }}>
                            <TableCell padding="checkbox">
                              <Checkbox checked={isItemSelected} onChange={() => handleSelectRow(product.id)}
                                sx={{
                                  color: "#637381", "&.Mui-checked": { color: "#00A76F" },
                                  "& .MuiSvgIcon-root": { borderRadius: "50%", width: 20, height: 20 },
                                }} />
                            </TableCell>

                            <TableCell sx={{ "&:hover": { color: "#00A76F", }, }}>
                              <Box display="flex" alignItems="center" gap={2}>
                                <Box component="img" src={product.image} alt={product.name} sx={{ width: 70, height: 70, borderRadius: 2 }} />
                                <Stack>
                                  <Typography fontWeight={550} fontSize={14}>{product.name}</Typography>
                                  <Typography fontSize={13} color="#919EAB">{product.item}</Typography>
                                </Stack>
                              </Box>
                            </TableCell>
                            <TableCell sx={{ "&:hover": { color: "#00A76F", } }} >
                              <Stack>
                                <Typography fontSize={14}>{product.date}</Typography>
                                <Typography fontSize={13} color="text.secondary">{product.time}</Typography>
                              </Stack>
                            </TableCell>

                            <TableCell>
                              {(() => {
                                const stockStatus = getStockStatus(product.stock);
                                return (
                                  <>
                                    <LinearProgress variant="determinate" value={stockStatus.progress} sx={{
                                      height: 6, width: 79, borderRadius: 2, backgroundColor: "#F4F6F8",
                                      "& .MuiLinearProgress-bar": { backgroundColor: stockStatus.color, }, mb: 1,
                                    }} />
                                    <Typography fontSize={13} color="text.secondary">{stockStatus.label}</Typography>
                                  </>
                                );
                              })()}
                            </TableCell>
                            <TableCell sx={{ "&:hover": { color: "#00A76F", }, }}>{product.price}</TableCell>
                            <TableCell>
                              <StyledChip label={product.status} bgcolor={getProductStatusStyle(product.status).backgroundColor}
                                color={getProductStatusStyle(product.status).color} />
                            </TableCell>
                            <TableCell align="right">
                              <ActionMenu firstlink="View" secoundlink="Edit" thirdlink="Delete" onView={() => navigate(`/app/products/details/${product.id}`)}
                                onEdit={() => navigate(`/app/products/edit/${product.id}`)}
                                onDelete={() => { setSelectedUserId(product.id); setOpenDeletePopup(true); }} />

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

              <TablePagination
                component="div"
                count={filteredRows.length}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
              />
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default List;