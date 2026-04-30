import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminContext from "../../context/AdminContext";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const AdminDashboard = () => {
  const COLORS = ["#e91e63", "#c2185b", "#ff4081", "#f06292", "#ad1457"];

  const { getDashboard } = useContext(AdminContext);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();
      if (!res) return;

      if (res.data) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [getDashboard]);

  if (!data)
    return (
      <Typography sx={{ textAlign: "center", mt: 5, fontSize: "22px" }}>
        Loading...
      </Typography>
    );

  return (
    <Box sx={{ p: 4, backgroundColor: "#fff0f5", minHeight: "100vh" }}>
      {/* Heading */}
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "36px",
          fontWeight: "bold",
          color: "#e91e63",
          mb: 5,
        }}
      >
        SmartWed Admin Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={4} justifyContent="center">
        {[
          {
            title: "Total Bookings",
            value: data.totalBookings,
            color: "#e91e63",
          },
          { title: "Pending", value: data.pending, color: "#ff9800" },
          { title: "Accepted", value: data.accepted, color: "green" },
          { title: "Rejected", value: data.rejected, color: "red" },
          

        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                width: "100%",
                p: 3,
                borderRadius: "16px",
                position: "relative",
                overflow: "hidden",
                backgroundColor: "white",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                transition: "0.3s",
                textAlign: "center",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
                },
              }}
            >
              {/* Top Strip */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "6px",
                  width: "100%",
                  backgroundColor: item.color,
                }}
              />

              <Typography sx={{ color: "gray", fontSize: "15px", mt: 2 }}>
                {item.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: "34px",
                  fontWeight: "bold",
                  color: item.color,
                  mt: 1,
                }}
              >
                {item.value}
              </Typography>

              <Typography sx={{ fontSize: "13px", color: "gray", mt: 1 }}>
                Updated Live
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Revenue + Quotation Actions */}
      <Grid container spacing={4} sx={{ mt: 4 }} justifyContent="center">
        {/* Revenue Card */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 3,
              borderRadius: "16px",
              border: "1px solid rgba(233,30,99,0.2)",
              boxShadow: "0 8px 20px rgba(233,30,99,0.12)",
              textAlign: "center",
              backgroundColor: "white",
            }}
          >
            <Typography sx={{ color: "gray", fontSize: "15px" }}>
              Total Revenue
            </Typography>

            <Typography
              sx={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "green",
                mt: 1,
              }}
            >
              ₹ {data.totalRevenue}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography sx={{ fontSize: "13px", color: "gray" }}>
              Includes completed bookings and accepted charges
            </Typography>
          </Card>
        </Grid>

        
      </Grid>

      {/* Pie Chart */}
      <Card
        sx={{
          p: 3,
          mt: 5,
          borderRadius: "16px",
          border: "1px solid rgba(233,30,99,0.2)",
          boxShadow: "0 8px 20px rgba(233,30,99,0.12)",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#e91e63",
            mb: 2,
            textAlign: "center",
          }}
        >
          Top Vendors (Most Booked)
        </Typography>

        <ResponsiveContainer width="100%" height={380}>
          <PieChart>
            <Pie
              data={(data.vendorStats || []).slice(0, 5)}
              dataKey="totalBookings"
              nameKey="vendorName"
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={140}
              paddingAngle={4}
              label={({ name, value }) => `${name}: ${value}`}
            >
              {(data.vendorStats || []).slice(0, 5).map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Vendor Table */}
      <Card
        sx={{
          p: 3,
          mt: 5,
          borderRadius: "16px",
          border: "1px solid rgba(233,30,99,0.2)",
          boxShadow: "0 8px 20px rgba(233,30,99,0.12)",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#e91e63",
            mb: 2,
          }}
        >
          Vendor Booking Stats
        </Typography>

        <TableContainer component={Paper} sx={{ borderRadius: "12px" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#ffe4ec" }}>
                <TableCell sx={{ fontWeight: "bold", color: "#c2185b" }}>
                  Vendor Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#c2185b" }}>
                  Service
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#c2185b" }}>
                  Total Bookings
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(data.vendorStats || []).slice(0, 5).map((vendor, index) => (
                <TableRow key={index}>
                  <TableCell>{vendor.vendorName}</TableCell>
                  <TableCell>{vendor.service}</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {vendor.totalBookings}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#e91e63",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#c2185b" },
            }}
            onClick={() => navigate("/admin/viewBookings")}
          >
            View All Bookings
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#e91e63",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#c2185b" },
            }}
            onClick={() => navigate("/admin/viewFeedback")}
          >
            View Feedback
          </Button>

          
          
        </Box>
      </Card>
    </Box>
  );
};

export default AdminDashboard;