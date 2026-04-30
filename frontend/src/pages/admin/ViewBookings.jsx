import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState,useContext } from "react";
import TextField from "@mui/material/TextField";
import { MenuItem, Divider } from "@mui/material";
import AdminContext from "../../context/AdminContext";

export default function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  const [charges, setCharges] = useState({});
  const {getAdminBookings,updateBookingStatus,updateBookingCharges}=useContext(AdminContext)
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchBookings = async () => {
    try {
      const res=await getAdminBookings(statusFilter,startDate,endDate)

      if (res.data.success) {
        setBookings(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (bookingId, status) => {
    try {
      const res = await updateBookingStatus(bookingId,status)
      if (res.data.success) {
        alert(res.data.message);
        fetchBookings();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCharges = async (bookingId) => {
    try {
      const discount=charges[bookingId].discount||0;
      const extraCharges=charges[bookingId].extraCharges||0
      const res = await updateBookingCharges(bookingId,discount,extraCharges)
      if (res.data.success) {
        alert(res.data.message);
        fetchBookings();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    if (status === "accepted") return "success";
    if (status === "rejected") return "error";
    return "warning";
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff0f5", p: 4 }}>
      {/* Heading */}
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "34px",
          fontWeight: "bold",
          color: "#e91e63",
          mb: 4,
        }}
      >
        Admin - View Bookings
      </Typography>

      {/* Filter Section */}
      <Card
        sx={{
          p: 3,
          mb: 4,
          borderRadius: "16px",
          border: "1px solid rgba(233,30,99,0.2)",
          boxShadow: "0 8px 20px rgba(233,30,99,0.12)",
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#c2185b",
            mb: 2,
          }}
        >
          Filter Bookings
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            select
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ width: "200px" }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="accepted">Accepted</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </TextField>

          <TextField
            label="From Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="To Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#e91e63",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#c2185b" },
            }}
            onClick={fetchBookings}
          >
            Apply
          </Button>

          <Button
            variant="outlined"
            sx={{
              borderColor: "#e91e63",
              color: "#e91e63",
              fontWeight: "bold",
              "&:hover": {
                borderColor: "#c2185b",
                color: "#c2185b",
              },
            }}
            onClick={() => {
              setStatusFilter("");
              setStartDate("");
              setEndDate("");
              fetchBookings();
            }}
          >
            Reset
          </Button>
        </Box>
      </Card>

      {/* Booking Cards */}
      {bookings.length === 0 ? (
        <Typography sx={{ textAlign: "center", color: "red", fontSize: "18px" }}>
          No bookings found.
        </Typography>
      ) : (
        bookings.map((booking) => (
          <Card
            key={booking._id}
            sx={{
              mb: 3,
              borderRadius: "18px",
              border: "1px solid rgba(233,30,99,0.15)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            {/* Top Header Strip */}
            <Box
              sx={{
                backgroundColor: "#ffe4ec",
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Typography sx={{ fontWeight: "bold", color: "#c2185b" }}>
                Vendor: {booking.vendorId?.name || "Not Available"}
              </Typography>

              <Chip
                label={booking.status.toUpperCase()}
                color={getStatusColor(booking.status)}
                sx={{ fontWeight: "bold" }}
              />
            </Box>

            <CardContent>
              <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                Customer Name:{" "}
                <span style={{ fontWeight: "400" }}>
                  {booking.customerName}
                </span>
              </Typography>

              <Typography sx={{ fontSize: "15px", mt: 1 }}>
                Email:{" "}
                <span style={{ fontWeight: "500" }}>
                  {booking.customerEmail}
                </span>
              </Typography>

              <Typography sx={{ fontSize: "15px", mt: 1 }}>
                Phone:{" "}
                <span style={{ fontWeight: "500" }}>
                  {booking.customerPhone}
                </span>
              </Typography>

              <Typography sx={{ fontSize: "15px", mt: 1 }}>
                Message:{" "}
                <span style={{ fontWeight: "500" }}>
                  {booking.message || "No message"}
                </span>
              </Typography>

              <Typography sx={{ fontSize: "14px", mt: 2, color: "gray" }}>
                Booking Date:{" "}
                {new Date(booking.createdAt).toLocaleDateString()}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Accept Reject Buttons */}
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "green",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#0b7d2a" },
                  }}
                  onClick={() => updateStatus(booking._id, "accepted")}
                  disabled={booking.status === "accepted"}
                >
                  Accept
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "red",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#b71c1c" },
                  }}
                  onClick={() => updateStatus(booking._id, "rejected")}
                  disabled={booking.status === "rejected"}
                >
                  Reject
                </Button>
              </Box>

             
              

              
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}