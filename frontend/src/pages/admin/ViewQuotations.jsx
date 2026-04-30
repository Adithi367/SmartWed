import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  TextField,
  MenuItem,
  Divider,
} from "@mui/material";
import QuotationContext from "../../context/QuotationContext";
export default function ViewQuotations() {
  const [quotations, setQuotations] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
const {getAllQuotations,updateQuotation}=useContext(QuotationContext)

  const token = localStorage.getItem("adminToken");

  const fetchQuotations = async () => {
    try {
      const res = await getAllQuotations()

      if (res.data.success) {
        setQuotations(res.data.data);
      }
    } catch (error) {
      console.log(error);
      alert("Error fetching quotations");
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const updateQuotationStatus = async (quotationId, status) => {
    try {
        const data={status}
      const res = await updateQuotation(quotationId,data)

      if (res.data.success) {
        alert(res.data.message);
        fetchQuotations();
      }
    } catch (error) {
      console.log(error);
      alert("Error updating quotation status");
    }
  };

  const getStatusColor = (status) => {
    if (status === "approved") return "success";
    if (status === "rejected") return "error";
    return "warning";
  };

  const filteredQuotations =
    statusFilter === "all"
      ? quotations
      : quotations.filter((q) => q.status === statusFilter);

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
        Admin - Quotation Requests
      </Typography>

      {/* Filter */}
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
          Filter Requests
        </Typography>

        <TextField
          select
          label="Filter by Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ width: "220px" }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="approved">Recommended</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </TextField>
      </Card>

      {/* Quotation List */}
      {filteredQuotations.length === 0 ? (
        <Typography sx={{ textAlign: "center", color: "red", fontSize: "18px" }}>
          No quotation requests found.
        </Typography>
      ) : (
        filteredQuotations.map((q) => (
          <Card
            key={q._id}
            sx={{
              mb: 3,
              borderRadius: "18px",
              border: "1px solid rgba(233,30,99,0.15)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            {/* Top Header */}
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
                Vendor: {q.vendorId?.name || "Not Available"}
              </Typography>

              <Chip
                label={q.status.toUpperCase()}
                color={getStatusColor(q.status)}
                sx={{ fontWeight: "bold" }}
              />
            </Box>

            <CardContent>
              {/* Vendor Details */}
              <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                Service:{" "}
                <span style={{ fontWeight: "400" }}>
                  {q.vendorId?.service}
                </span>
              </Typography>

              <Typography sx={{ fontSize: "15px", mt: 1 }}>
                Location:{" "}
                <span style={{ fontWeight: "500" }}>
                  {q.vendorId?.location}
                </span>
              </Typography>

              <Typography sx={{ fontSize: "15px", mt: 1 }}>
                Vendor Estimated Price:{" "}
                <span style={{ fontWeight: "bold", color: "#e91e63" }}>
                  ₹{q.vendorId?.price}
                </span>
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Customer Details */}
              <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                Customer Name:{" "}
                <span style={{ fontWeight: "400" }}>{q.customerName}</span>
              </Typography>

              <Typography sx={{ fontSize: "15px", mt: 1 }}>
                Email:{" "}
                <span style={{ fontWeight: "500" }}>{q.customerEmail}</span>
              </Typography>

              <Typography sx={{ fontSize: "15px", mt: 1 }}>
                Phone:{" "}
                <span style={{ fontWeight: "500" }}>{q.customerPhone}</span>
              </Typography>

              <Typography sx={{ fontSize: "15px", mt: 1 }}>
                Message:{" "}
                <span style={{ fontWeight: "500" }}>
                  {q.message || "No message"}
                </span>
              </Typography>

              <Typography sx={{ fontSize: "14px", mt: 2, color: "gray" }}>
                Requested On: {new Date(q.createdAt).toLocaleDateString()}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Buttons */}
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "green",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#0b7d2a" },
                  }}
                  onClick={() => updateQuotationStatus(q._id, "approved")}
                  disabled={q.status === "approved"}
                >
                  Recommend
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "red",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#b71c1c" },
                  }}
                  onClick={() => updateQuotationStatus(q._id, "rejected")}
                  disabled={q.status === "rejected"}
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