import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import BookingContext from "../../context/BookingContext";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StarIcon from "@mui/icons-material/Star";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Profile() {
  const navigate = useNavigate();
  const { getProfile } = useContext(UserContext);
  const {getBookings}=useContext(BookingContext)
  const [user, setUser] = useState(null);
  const [bookingStats,setBookingStats]=useState({
    total:0,
    pending:0,
    accepted:0,
    rejected:0
  })
  const fetchBookingStats=async()=>{
    try {
      const res= await getBookings()
      if(res.data.success){
        const bookings=res.data.data;
        let stats={
          total:bookings.length,
          pending:0,
          accepted:0,
          rejected:0
        }
        bookings.forEach((b)=>{
          if (b.status === "pending") stats.pending++;
          if (b.status === "accepted") stats.accepted++;
          if (b.status === "rejected") stats.rejected++;
        })
        setBookingStats(stats)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchBookingStats();
  },[])
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfile();
      if (res?.data?.success) {
        setUser(res.data.user);
      }
    };
    fetchProfile();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #fff0f5, #ffffff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: 6,
        px: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 520,
          borderRadius: "22px",
          overflow: "hidden",
          boxShadow: "0 14px 40px rgba(233, 30, 99, 0.15)",
          border: "1px solid rgba(233, 30, 99, 0.15)",
        }}
      >
        
        <Box
          sx={{
            background: "linear-gradient(135deg, #e91e63, #c2185b)",
            p: 4,
            textAlign: "center",
            color: "white",
          }}
        >
          <Avatar
            sx={{
              width: 90,
              height: 90,
              mx: "auto",
              mb: 2,
              bgcolor: "white",
              color: "#e91e63",
              fontWeight: "bold",
              fontSize: "32px",
              border: "3px solid rgba(255,255,255,0.8)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </Avatar>

          <Typography sx={{ fontSize: "22px", fontWeight: "bold" }}>
            {user?.name || "Loading..."}
          </Typography>

          <Typography sx={{ fontSize: "14px", opacity: 0.9 }}>
            {user?.email || "Fetching email..."}
          </Typography>
        </Box>

        {/* BODY */}
        <Box sx={{ p: 3 }}>
          {/* STATS */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
              flexWrap: "wrap",
              mb: 3,
            }}
          >
            <Card
              sx={{
                flex: 1,
                minWidth: "140px",
                p: 2,
                borderRadius: "16px",
                textAlign: "center",
                boxShadow: "0 8px 18px rgba(233, 30, 99, 0.08)",
                border: "1px solid rgba(233, 30, 99, 0.12)",
              }}
            >
              <Typography sx={{ fontSize: "22px", fontWeight: "bold", color: "#e91e63" }}>
                {bookingStats.total}
              </Typography>
              <Typography sx={{ fontSize: "13px", color: "gray" }}>
                Total Bookings
              </Typography>
            </Card>

            <Card
              sx={{
                flex: 1,
                minWidth: "140px",
                p: 2,
                borderRadius: "16px",
                textAlign: "center",
                boxShadow: "0 8px 18px rgba(76, 175, 80, 0.08)",
                border: "1px solid rgba(76, 175, 80, 0.15)",
              }}
            >
              <Typography sx={{ fontSize: "22px", fontWeight: "bold", color: "#2e7d32" }}>
                {bookingStats.accepted}
              </Typography>
              <Typography sx={{ fontSize: "13px", color: "gray" }}>
                Accepted
              </Typography>
            </Card>

            <Card
              sx={{
                flex: 1,
                minWidth: "140px",
                p: 2,
                borderRadius: "16px",
                textAlign: "center",
                boxShadow: "0 8px 18px rgba(255, 152, 0, 0.08)",
                border: "1px solid rgba(255, 152, 0, 0.18)",
              }}
            >
              <Typography sx={{ fontSize: "22px", fontWeight: "bold", color: "#ff9800" }}>
                {bookingStats.pending}
              </Typography>
              <Typography sx={{ fontSize: "13px", color: "gray" }}>
                Pending
              </Typography>
            </Card>
            <Card
              sx={{
                flex: 1,
                minWidth: "140px",
                p: 2,
                borderRadius: "16px",
                textAlign: "center",
                boxShadow: "0 8px 18px rgba(255, 152, 0, 0.08)",
                border: "1px solid rgba(255, 152, 0, 0.18)",
              }}
            >
              <Typography sx={{ fontSize: "22px", fontWeight: "bold", color: "#ff9800" }}>
                {bookingStats.rejected}
              </Typography>
              <Typography sx={{ fontSize: "13px", color: "gray" }}>
                Rejected
              </Typography>
              </Card>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Card
              onClick={() => navigate("/bookingStatus")}
              sx={{
                p: 2,
                borderRadius: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid rgba(233, 30, 99, 0.2)",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 10px 25px rgba(233, 30, 99, 0.18)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <ShoppingBagIcon sx={{ color: "#e91e63", fontSize: 30 }} />
                <Box>
                  <Typography sx={{ fontWeight: "bold", color: "#e91e63" }}>
                    My Bookings
                  </Typography>
                  <Typography sx={{ fontSize: "13px", color: "gray" }}>
                    Track your booking requests
                  </Typography>
                </Box>
              </Box>

              <ArrowForwardIosIcon sx={{ fontSize: 16, color: "gray" }} />
            </Card>

            <Card
              onClick={() => navigate("/giveFeedback")}
              sx={{
                p: 2,
                borderRadius: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid rgba(233, 30, 99, 0.2)",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 10px 25px rgba(233, 30, 99, 0.18)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <StarIcon sx={{ color: "#facc15", fontSize: 30 }} />
                <Box>
                  <Typography sx={{ fontWeight: "bold", color: "#e91e63" }}>
                    Give Feedback
                  </Typography>
                  <Typography sx={{ fontSize: "13px", color: "gray" }}>
                    Rate and review your vendors
                  </Typography>
                </Box>
              </Box>

              <ArrowForwardIosIcon sx={{ fontSize: 16, color: "gray" }} />
            </Card>

            <Card
              onClick={() => navigate("/invoice")}
              sx={{
                p: 2,
                borderRadius: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid rgba(233, 30, 99, 0.2)",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 10px 25px rgba(233, 30, 99, 0.18)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <ReceiptLongIcon sx={{ color: "#6a1b9a", fontSize: 30 }} />
                <Box>
                  <Typography sx={{ fontWeight: "bold", color: "#e91e63" }}>
                    View Invoice
                  </Typography>
                  <Typography sx={{ fontSize: "13px", color: "gray" }}>
                    Download and print your bill
                  </Typography>
                </Box>
              </Box>

              <ArrowForwardIosIcon sx={{ fontSize: 16, color: "gray" }} />
            </Card>
            <Card
  onClick={() => navigate("/myQuotations")}
  sx={{
    p: 2,
    borderRadius: "16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid rgba(233, 30, 99, 0.2)",
    transition: "0.3s",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "0 10px 25px rgba(233, 30, 99, 0.18)",
    },
  }}
>
  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    <ReceiptLongIcon sx={{ color: "#e91e63", fontSize: 30 }} />
    <Box>
      <Typography sx={{ fontWeight: "bold", color: "#e91e63" }}>
        My Quotations
      </Typography>
      <Typography sx={{ fontSize: "13px", color: "gray" }}>
        Admin recommendations & vendor quotes
      </Typography>
    </Box>
  </Box>

  <ArrowForwardIosIcon sx={{ fontSize: 16, color: "gray" }} />
</Card>
          </Box>

          <Button
            fullWidth
            startIcon={<LogoutIcon />}
            sx={{
              mt: 4,
              background: "linear-gradient(135deg, #e91e63, #c2185b)",
              color: "white",
              fontWeight: "bold",
              borderRadius: "30px",
              py: 1.3,
              textTransform: "none",
              boxShadow: "0 8px 22px rgba(233, 30, 99, 0.35)",
              "&:hover": {
                background: "linear-gradient(135deg, #c2185b, #ad1457)",
              },
            }}
            onClick={() => {
              localStorage.removeItem("myToken");
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
