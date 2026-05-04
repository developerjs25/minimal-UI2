import React from "react";
import { Box, Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Button, } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getStatusStyle, invoices } from "./components/contant";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Dashboard: React.FC = () => {
  return (
         <Grid sx={{maxWidth: 900,}}>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 0 }}>
          <Typography variant="h6" fontWeight={600} p={3}>New Invoices</Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#F4F6F8" }}>
                  <TableCell sx={{ color: "#637381", fontWeight: 600 }}>Invoice ID</TableCell>
                  <TableCell sx={{ color: "#637381", fontWeight: 600 }}>Category</TableCell>
                    <TableCell sx={{ color: "#637381", fontWeight: 600 }}>Price</TableCell>
                    <TableCell sx={{ color: "#637381", fontWeight: 600 }} >Status</TableCell>
                    <TableCell align="right" />
                  </TableRow>
                </TableHead>

                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.category}</TableCell>
                      <TableCell>{invoice.price}</TableCell>
                      <TableCell>
                        <Chip label={invoice.status} style={getStatusStyle(invoice.status)} size="small" sx={{ borderRadius: 1, fontWeight: 550 }} />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton>
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box textAlign="right" mt={2}>
              <Button size="small" endIcon={<ChevronRightIcon />} sx={{ color: "#000000", textTransform: 'none', fontWeight: 550 }} >View all</Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
  );
};

export default Dashboard;