import React, { useState, useEffect } from "react";
import {
  Box, Card, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TablePagination,
  Checkbox, TextField, Stack, LinearProgress, InputAdornment,
} from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { getProductpublishStyle, getStockStatus } from "../contact/ProductContant";
import StyledChip from "../chip";
import ActionMenu from "../ActionMenu";
import DeletePopup from "../popup/Deletepopup";
import { useTheme } from "@mui/material/styles";
import { BarLoader } from "react-spinners";
import axios from "axios";
import Images from "../../constants/Images";

const List: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [value] = useState("1");
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const [sortField, setSortField] = useState<string>("productName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [product, setProduct] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await axios.get("http://localhost:3003/product", {
          params: {
            page: page + 1,
            limit: rowsPerPage,
            search,
            sortField,
            sortOrder,
          },
        });

        setProduct(res.data.data);
        setTotalCount(res.data.total);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, rowsPerPage, search, sortField, sortOrder]);

  const handleDelete = async (id: string) => {
    if (!id) return;

    try {
      await axios.delete(`http://localhost:3003/product/${id}`);

      setProduct((prevProduct) =>
        prevProduct.filter((Product) => Product._id !== id)
      );
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };


  const handleSearch = (value: string) => {
    setSearch(value);
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
      const newSelected = product
        .filter((row) => row._id != null)
        .map((row) => row._id.toString());
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

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
      <Card sx={{ borderRadius: 3, mt: 4 }}>
        <CardContent sx={{ p: 0, backgroundColor: theme.palette.background.listColor, }}>
          <TabContext value={value}>
            <TabPanel value={value} sx={{ p: 0 }}>
              <TextField placeholder="Search..." size="small" value={search} onChange={(e) => handleSearch(e.target.value)} sx={{
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
                            selected.length > 0 && selected.length < product.length
                          }
                          checked={
                            product.length > 0 && selected.length === product.length
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
                      <TableCell onClick={() => handleSort("productName")} sx={{ borderLeft: "1px solid #0000", fontWeight: 550, color: "#637381", }}>Product</TableCell>
                      <TableCell sx={{ borderLeft: "1px solid #0000", fontWeight: 550, color: "#637381", }}>Create at</TableCell>
                      <TableCell sx={{ borderLeft: "1px solid #0000", fontWeight: 550, color: "#637381", }}>Stock</TableCell>
                      <TableCell sx={{ borderLeft: "1px solid #0000", fontWeight: 550, color: "#637381", }}>Price</TableCell>
                      <TableCell sx={{ borderLeft: "1px solid #0000", fontWeight: 550, color: "#637381", }}>Publish</TableCell>
                      <TableCell />
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
                  ) : product.length === 0 ? (
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          <Box component="img" src={Images.NoUserImage} alt="User not found" />
                          <Typography sx={{ pb: 4, color: "#637381" }}>Product not found</Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ) : (
                    <TableBody>
                      {product.map((item) => {
                        const isItemSelected = isSelected(item._id);

                        return (
                          <TableRow key={item._id} selected={isItemSelected} hover sx={{
                            cursor: "pointer",
                            "&:hover": { backgroundColor: isItemSelected ? "rgba(0, 167, 111, 0.2)" : "rgba(0, 167, 111, 0.08)", },
                            "&.Mui-selected": { backgroundColor: "rgba(105, 240, 195, 0.16)", "&:hover": { backgroundColor: "rgba(0, 167, 111, 0.2)", }, },
                          }}>
                            <TableCell padding="checkbox">
                              <Checkbox checked={isItemSelected} onChange={() => handleSelectRow(item._id)}
                                sx={{
                                  color: "#637381", "&.Mui-checked": { color: "#00A76F" },
                                  "& .MuiSvgIcon-root": { borderRadius: "50%", width: 20, height: 20 },
                                }} />
                            </TableCell>

                            <TableCell sx={{ "&:hover": { color: "#00A76F", }, }}>
                              <Box display="flex" alignItems="center" gap={2}>
                                <Box component="img" src={`http://localhost:3003/uploads/${item.imageName}`} alt={item.productName} sx={{ width: 70, height: 70, borderRadius: 2 }} />
                                <Stack>
                                  <Typography fontWeight={550} fontSize={14}>{item.productName}</Typography>
                                  <Typography fontSize={13} color="#919EAB">{item.category}</Typography>
                                </Stack>
                              </Box>
                            </TableCell>
                            <TableCell sx={{ "&:hover": { color: "#00A76F", } }} >
                              <Stack>
                                <Typography fontSize={14}>{item.date}</Typography>
                                <Typography fontSize={13} color="text.secondary">{item.time}</Typography>
                              </Stack>
                            </TableCell>

                            <TableCell>
                              {(() => {
                                const stockStatus = getStockStatus(item.quantity);
                                return (
                                  <>
                                    <LinearProgress variant="determinate" value={Math.min(stockStatus.progress, 100)}
                                      sx={{
                                        height: 6, width: 90, borderRadius: 2, backgroundColor: stockStatus.background,
                                        "& .MuiLinearProgress-bar": { backgroundColor: stockStatus.color, transition: "0.4s ease", },
                                      }}
                                    />
                                    <Typography fontSize={13} color="text.secondary">{stockStatus.label}</Typography>
                                  </>
                                );
                              })()}
                            </TableCell>
                            <TableCell sx={{ "&:hover": { color: "#00A76F", }, }}>${item.saleprice || item.regularprice}</TableCell>
                            <TableCell>
                              <StyledChip
                                label={item.publish}
                                bgcolor={getProductpublishStyle(item.publish).backgroundColor}
                                color={getProductpublishStyle(item.publish).color}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <ActionMenu firstlink="View" secoundlink="Edit" thirdlink="Delete" onView={() => navigate(`/app/products/details/${item._id}`)}
                                onEdit={() => navigate(`/app/products/edit/${item._id}`)}
                                onDelete={() => { setSelectedProductId(item._id); setOpenDeletePopup(true); }} />

                              <DeletePopup open={openDeletePopup} onClose={() => setOpenDeletePopup(false)} onConfirm={() => {
                                if (selectedProductId !== null) {
                                  handleDelete(selectedProductId.toString());
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

              <TablePagination component="div" count={totalCount} page={page} onPageChange={(_, newPage) => setPage(newPage)} rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]} onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
              />
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default List;
