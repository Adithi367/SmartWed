import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import AdminContext from "../../context/AdminContext";
export default function ViewFeedback() {
  const [vendors, setVendors] = useState([]);
  const [selectedService, setSelectedService] = useState("all");
  const {getFeedback}=useContext(AdminContext)
  const fetchFeedback = async () => {
    try {

      const res = await getFeedback()
      if (res.data.success) {
        setVendors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Dropdown category list
  const services = ["all", ...new Set(vendors.map((v) => v.service?.trim()))];

  // Filter vendors based on selected category
  const filteredVendors =
    selectedService === "all"
      ? vendors
      : vendors.filter((v) => v.service?.trim() === selectedService);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff0f5", p: 4 }}>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: "bold",
          color: "#e91e63",
          mb: 3,
        }}
      >
        Admin - Vendor Feedback
      </Typography>

      {/* Service Filter Dropdown */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <FormControl sx={{ minWidth: 280 }}>
          <InputLabel>Select Category</InputLabel>
          <Select
            value={selectedService}
            label="Select Category"
            onChange={(e) => setSelectedService(e.target.value)}
          >
            {services.map((service, index) => (
              <MenuItem key={index} value={service}>
                {service.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {filteredVendors.length === 0 ? (
        <Typography sx={{ textAlign: "center", color: "red" }}>
          No feedback found for this category.
        </Typography>
      ) : (
        <>
          {/* Category Heading */}
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "22px",
              fontWeight: "bold",
              color: "#c2185b",
              mb: 3,
            }}
          >
            {selectedService === "all"
              ? "All Categories Feedback"
              : `${selectedService.toUpperCase()} Feedback`}
          </Typography>

          {filteredVendors.map((vendor) => (
            <Card
              key={vendor._id}
              sx={{
                mb: 4,
                borderRadius: "16px",
                border: "1px solid rgba(233,30,99,0.2)",
                boxShadow: "0 8px 20px rgba(233,30,99,0.15)",
              }}
            >
              <CardContent>
                {/* Vendor Name */}
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#e91e63",
                  }}
                >
                  {vendor.name}
                </Typography>

                {/* Vendor Service Badge */}
                <Typography
                  sx={{
                    display: "inline-block",
                    mt: 1,
                    px: 2,
                    py: 0.5,
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "bold",
                    backgroundColor: "#ffe4ec",
                    color: "#c2185b",
                  }}
                >
                  {vendor.service}
                </Typography>

                {/* Rating */}
                <Typography sx={{ mt: 2, fontWeight: "bold" }}>
                  {vendor.rating?.toFixed(1) || 0} / 5
                </Typography>

                <Typography sx={{ color: "gray" }}>
                  Total Ratings: {vendor.totalRatings || 0}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* Reviews */}
                {vendor.reviews?.length === 0 ? (
                  <Typography sx={{ color: "red" }}>
                    No reviews for this vendor.
                  </Typography>
                ) : (
                  vendor.reviews.map((review, index) => (
                    <Card
                      key={index}
                      sx={{
                        p: 2,
                        mb: 2,
                        borderRadius: "12px",
                        backgroundColor: "#fff",
                        border: "1px solid rgba(233,30,99,0.15)",
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold" }}>
                        Customer:{" "}
                        {review.userId?.username ||
                          review.customerName ||
                          "Unknown"}
                      </Typography>

                      <Typography sx={{ mt: 1, fontWeight: "bold" }}>
                        Rating: {review.rating}/5
                      </Typography>

                      <Typography sx={{ mt: 1 }}>
                        {review.comment || "No comment"}
                      </Typography>

                      <Typography
                        sx={{ mt: 1, fontSize: "12px", color: "gray" }}
                      >
                        {new Date(review.createdAt).toLocaleString()}
                      </Typography>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </Box>
  );
}