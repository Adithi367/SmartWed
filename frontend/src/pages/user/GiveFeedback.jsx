import React, { useEffect, useState,useContext } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import BookingContext from "../../context/BookingContext";
import StarIcon from "@mui/icons-material/Star";

export default function GiveFeedback() {
  const [bookings, setBookings] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState({});
  const [comments, setComments] = useState({});
  const {addReview,getBookings}=useContext(BookingContext)
  const token = localStorage.getItem("myToken");

  const fetchBookings = async () => {
    try {
      const res = await getBookings()

      if (res.data.success) {
        const accepted = res.data.data.filter(
          (b) => b.status === "accepted"
        );
        setBookings(accepted);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [token]);

  const submitFeedback = async (vendorId) => {
    try {
      const rating = selectedRatings[vendorId];
      const comment = comments[vendorId];

      if (!rating) {
        alert("Please select rating first");
        return;
      }

      const res = await addReview(vendorId,rating,comment)

      if (res.data.success) {
        alert("Feedback submitted successfully!");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Error submitting feedback");
    }
  };

  return (
    <Box sx={{ backgroundColor: "#fff0f5", minHeight: "100vh", p: 4 }}>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: "bold",
          color: "#e91e63",
          mb: 4,
        }}
      >
        Give Feedback
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {bookings.length === 0 ? (
          <Typography sx={{ color: "red", fontSize: "18px" }}>
            You don’t have any completed bookings yet to review.          </Typography>
        ) : (
          bookings.map((booking) => (
            <Card
              key={booking._id}
              sx={{
                width: "350px",
                borderRadius: "16px",
                boxShadow: '0 8px 25px rgba(233, 30, 99, 0.15)',
                border: "1px solid rgba(233, 30, 99, 0.2)"
              }}
            >
              <img
                src={booking.vendorId.image}
                alt={booking.vendorId.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />

              <CardContent>
                <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                  {booking.vendorId.name}
                </Typography>

                <Typography sx={{ color: "gray", mb: 2 }}>
                  {booking.vendorId.service}
                </Typography>

               
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      onClick={() =>
                        setSelectedRatings({
                          ...selectedRatings,
                          [booking.vendorId._id]: star,
                        })
                      }
                      sx={{
                        cursor: "pointer",
                        color:
                          selectedRatings[booking.vendorId._id] >= star
                            ? "#facc15"
                            : "#d1d5db",
                        fontSize: "30px",
                        '&:hover':{
                          transform:"scale(1.2)"
                      }
                      
                      }}
                    />
                  ))}
                </Box>

               
                <TextField
                  fullWidth
                  label="Write your review"
                  multiline
                  rows={3}
                  value={comments[booking.vendorId._id] || ""}
                  onChange={(e) =>
                    setComments({
                      ...comments,
                      [booking.vendorId._id]: e.target.value,
                    })
                  }
                />

                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    background: "linear-gradient(135deg, #e91e63, #c2185b)",
                    fontWeight: "bold",
                    borderRadius:'25px',
                    textTransform:'none',
                    '&:hover':{
                      background:"linear-gradient(135deg, #c2185b, #ad1457)"
                    }
                  }}
                  onClick={() => submitFeedback(booking.vendorId._id)}
                >
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
}