// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import UserContext from "../../context/UserContext";

// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import Divider from "@mui/material/Divider";
// import Avatar from "@mui/material/Avatar";
// import BookingContext from "../../context/BookingContext";
// import LogoutIcon from "@mui/icons-material/Logout";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// import StarIcon from "@mui/icons-material/Star";
// import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// export default function Profile() {
//   const navigate = useNavigate();
//   const { getProfile } = useContext(UserContext);
//   const {getBookings}=useContext(BookingContext)
//   const [user, setUser] = useState(null);
//   const [bookingStats,setBookingStats]=useState({
//     total:0,
//     pending:0,
//     accepted:0,
//     rejected:0
//   })
//   const fetchBookingStats=async()=>{
//     try {
//       const res= await getBookings()
//       if(res.data.success){
//         const bookings=res.data.data;
//         let stats={
//           total:bookings.length,
//           pending:0,
//           accepted:0,
//           rejected:0
//         }
//         bookings.forEach((b)=>{
//           if (b.status === "pending") stats.pending++;
//           if (b.status === "accepted") stats.accepted++;
//           if (b.status === "rejected") stats.rejected++;
//         })
//         setBookingStats(stats)
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   useEffect(()=>{
//     fetchBookingStats();
//   },[])
//   useEffect(() => {
//     const fetchProfile = async () => {
//       const res = await getProfile();
//       if (res?.data?.success) {
//         setUser(res.data.user);
//       }
//     };
//     fetchProfile();
//   }, []);

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(180deg, #fff0f5, #ffffff)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "flex-start",
//         pt: 6,
//         px: 2,
//       }}
//     >
//       <Card
//         sx={{
//           width: "100%",
//           maxWidth: 520,
//           borderRadius: "22px",
//           overflow: "hidden",
//           boxShadow: "0 14px 40px rgba(233, 30, 99, 0.15)",
//           border: "1px solid rgba(233, 30, 99, 0.15)",
//         }}
//       >
        
//         <Box
//           sx={{
//             background: "linear-gradient(135deg, #e91e63, #c2185b)",
//             p: 4,
//             textAlign: "center",
//             color: "white",
//           }}
//         >
//           <Avatar
//             sx={{
//               width: 90,
//               height: 90,
//               mx: "auto",
//               mb: 2,
//               bgcolor: "white",
//               color: "#e91e63",
//               fontWeight: "bold",
//               fontSize: "32px",
//               border: "3px solid rgba(255,255,255,0.8)",
//               boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
//             }}
//           >
//             {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
//           </Avatar>

//           <Typography sx={{ fontSize: "22px", fontWeight: "bold" }}>
//             {user?.name || "Loading..."}
//           </Typography>

//           <Typography sx={{ fontSize: "14px", opacity: 0.9 }}>
//             {user?.email || "Fetching email..."}
//           </Typography>
//         </Box>

//         {/* BODY */}
//         <Box sx={{ p: 3 }}>
//           {/* STATS */}
//           <Box
//             sx={{
//               display: "flex",
//               gap: 2,
//               justifyContent: "space-between",
//               flexWrap: "wrap",
//               mb: 3,
//             }}
//           >
//             <Card
//               sx={{
//                 flex: 1,
//                 minWidth: "140px",
//                 p: 2,
//                 borderRadius: "16px",
//                 textAlign: "center",
//                 boxShadow: "0 8px 18px rgba(233, 30, 99, 0.08)",
//                 border: "1px solid rgba(233, 30, 99, 0.12)",
//               }}
//             >
//               <Typography sx={{ fontSize: "22px", fontWeight: "bold", color: "#e91e63" }}>
//                 {bookingStats.total}
//               </Typography>
//               <Typography sx={{ fontSize: "13px", color: "gray" }}>
//                 Total Bookings
//               </Typography>
//             </Card>

//             <Card
//               sx={{
//                 flex: 1,
//                 minWidth: "140px",
//                 p: 2,
//                 borderRadius: "16px",
//                 textAlign: "center",
//                 boxShadow: "0 8px 18px rgba(76, 175, 80, 0.08)",
//                 border: "1px solid rgba(76, 175, 80, 0.15)",
//               }}
//             >
//               <Typography sx={{ fontSize: "22px", fontWeight: "bold", color: "#2e7d32" }}>
//                 {bookingStats.accepted}
//               </Typography>
//               <Typography sx={{ fontSize: "13px", color: "gray" }}>
//                 Accepted
//               </Typography>
//             </Card>

//             <Card
//               sx={{
//                 flex: 1,
//                 minWidth: "140px",
//                 p: 2,
//                 borderRadius: "16px",
//                 textAlign: "center",
//                 boxShadow: "0 8px 18px rgba(255, 152, 0, 0.08)",
//                 border: "1px solid rgba(255, 152, 0, 0.18)",
//               }}
//             >
//               <Typography sx={{ fontSize: "22px", fontWeight: "bold", color: "#ff9800" }}>
//                 {bookingStats.pending}
//               </Typography>
//               <Typography sx={{ fontSize: "13px", color: "gray" }}>
//                 Pending
//               </Typography>
//             </Card>
//             <Card
//               sx={{
//                 flex: 1,
//                 minWidth: "140px",
//                 p: 2,
//                 borderRadius: "16px",
//                 textAlign: "center",
//                 boxShadow: "0 8px 18px rgba(255, 152, 0, 0.08)",
//                 border: "1px solid rgba(255, 152, 0, 0.18)",
//               }}
//             >
//               <Typography sx={{ fontSize: "22px", fontWeight: "bold", color: "#ff9800" }}>
//                 {bookingStats.rejected}
//               </Typography>
//               <Typography sx={{ fontSize: "13px", color: "gray" }}>
//                 Rejected
//               </Typography>
//               </Card>
//           </Box>

//           <Divider sx={{ mb: 3 }} />

//           <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//             <Card
//               onClick={() => navigate("/bookingStatus")}
//               sx={{
//                 p: 2,
//                 borderRadius: "16px",
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 border: "1px solid rgba(233, 30, 99, 0.2)",
//                 transition: "0.3s",
//                 "&:hover": {
//                   transform: "scale(1.02)",
//                   boxShadow: "0 10px 25px rgba(233, 30, 99, 0.18)",
//                 },
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                 <ShoppingBagIcon sx={{ color: "#e91e63", fontSize: 30 }} />
//                 <Box>
//                   <Typography sx={{ fontWeight: "bold", color: "#e91e63" }}>
//                     My Bookings
//                   </Typography>
//                   <Typography sx={{ fontSize: "13px", color: "gray" }}>
//                     Track your booking requests
//                   </Typography>
//                 </Box>
//               </Box>

//               <ArrowForwardIosIcon sx={{ fontSize: 16, color: "gray" }} />
//             </Card>

//             <Card
//               onClick={() => navigate("/giveFeedback")}
//               sx={{
//                 p: 2,
//                 borderRadius: "16px",
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 border: "1px solid rgba(233, 30, 99, 0.2)",
//                 transition: "0.3s",
//                 "&:hover": {
//                   transform: "scale(1.02)",
//                   boxShadow: "0 10px 25px rgba(233, 30, 99, 0.18)",
//                 },
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                 <StarIcon sx={{ color: "#facc15", fontSize: 30 }} />
//                 <Box>
//                   <Typography sx={{ fontWeight: "bold", color: "#e91e63" }}>
//                     Give Feedback
//                   </Typography>
//                   <Typography sx={{ fontSize: "13px", color: "gray" }}>
//                     Rate and review your vendors
//                   </Typography>
//                 </Box>
//               </Box>

//               <ArrowForwardIosIcon sx={{ fontSize: 16, color: "gray" }} />
//             </Card>

//             <Card
//               onClick={() => navigate("/invoice")}
//               sx={{
//                 p: 2,
//                 borderRadius: "16px",
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 border: "1px solid rgba(233, 30, 99, 0.2)",
//                 transition: "0.3s",
//                 "&:hover": {
//                   transform: "scale(1.02)",
//                   boxShadow: "0 10px 25px rgba(233, 30, 99, 0.18)",
//                 },
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                 <ReceiptLongIcon sx={{ color: "#6a1b9a", fontSize: 30 }} />
//                 <Box>
//                   <Typography sx={{ fontWeight: "bold", color: "#e91e63" }}>
//                     View Invoice
//                   </Typography>
//                   <Typography sx={{ fontSize: "13px", color: "gray" }}>
//                     Download and print your bill
//                   </Typography>
//                 </Box>
//               </Box>

//               <ArrowForwardIosIcon sx={{ fontSize: 16, color: "gray" }} />
//             </Card>
//             <Card
//   onClick={() => navigate("/myQuotations")}
//   sx={{
//     p: 2,
//     borderRadius: "16px",
//     cursor: "pointer",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     border: "1px solid rgba(233, 30, 99, 0.2)",
//     transition: "0.3s",
//     "&:hover": {
//       transform: "scale(1.02)",
//       boxShadow: "0 10px 25px rgba(233, 30, 99, 0.18)",
//     },
//   }}
// >
//   <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//     <ReceiptLongIcon sx={{ color: "#e91e63", fontSize: 30 }} />
//     <Box>
//       <Typography sx={{ fontWeight: "bold", color: "#e91e63" }}>
//         My Quotations
//       </Typography>
//       <Typography sx={{ fontSize: "13px", color: "gray" }}>
//         Admin recommendations & vendor quotes
//       </Typography>
//     </Box>
//   </Box>

//   <ArrowForwardIosIcon sx={{ fontSize: 16, color: "gray" }} />
// </Card>
//           </Box>

//           <Button
//             fullWidth
//             startIcon={<LogoutIcon />}
//             sx={{
//               mt: 4,
//               background: "linear-gradient(135deg, #e91e63, #c2185b)",
//               color: "white",
//               fontWeight: "bold",
//               borderRadius: "30px",
//               py: 1.3,
//               textTransform: "none",
//               boxShadow: "0 8px 22px rgba(233, 30, 99, 0.35)",
//               "&:hover": {
//                 background: "linear-gradient(135deg, #c2185b, #ad1457)",
//               },
//             }}
//             onClick={() => {
//               localStorage.removeItem("myToken");
//               navigate("/login");
//             }}
//           >
//             Logout
//           </Button>
//         </Box>
//       </Card>
//     </Box>
//   );
// }




import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import BookingContext from "../../context/BookingContext";
import PlanContext from "../../context/PlanContext";

import {
  Box,
  Card,
  Typography,
  Avatar,
  Divider,
  Grid,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import PaymentsIcon from "@mui/icons-material/Payments";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

export default function Profile() {
  const { getProfile } = useContext(UserContext);
  const { getBookings } = useContext(BookingContext);
  const { getPlan } = useContext(PlanContext);

  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);

  const [bookingStats, setBookingStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
  });

  const fetchPlan = async () => {
    try {
      const res = await getPlan();
      if (res.data.success) setPlan(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBookingStats = async () => {
    try {
      const res = await getBookings();
      if (res.data.success) {
        const bookings = res.data.data;

        let stats = {
          total: bookings.length,
          pending: 0,
          accepted: 0,
          rejected: 0,
        };

        bookings.forEach((b) => {
          if (b.status === "pending") stats.pending++;
          if (b.status === "accepted") stats.accepted++;
          if (b.status === "rejected") stats.rejected++;
        });

        setBookingStats(stats);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlan();
    fetchBookingStats();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfile();
      if (res?.data?.success) setUser(res.data.user);
    };
    fetchProfile();
  }, []);

  return (
  <Box
    sx={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #fff0f5, #ffffff)",
      px: { xs: 2, md: 6 },
      py: 5,
    }}
  >
    <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography sx={{ fontSize: "32px", fontWeight: "bold", color: "#c2185b" }}>
          {user ? `Hello, ${user.name}!` : "Hello, User!"}
        </Typography>

       
      </Box>

      {/* TOP ROW */}
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          mb: 4,
        }}
      >
        {/* PROFILE CARD */}
        <Card
          sx={{
            flex: "1",
            minWidth: "320px",
            p: 4,
            borderRadius: "26px",
            background: "white",
            boxShadow: "0 12px 35px rgba(0,0,0,0.08)",
            border: "1px solid rgba(233, 30, 99, 0.12)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "#e91e63",
                  fontSize: "38px",
                  fontWeight: "bold",
                  boxShadow: "0 8px 20px rgba(233,30,99,0.3)",
                }}
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </Avatar>

              <Box>
                <Typography sx={{ fontSize: "24px", fontWeight: "bold", color: "#c2185b" }}>
                  {user?.name || "Loading..."}
                </Typography>

                <Typography sx={{ fontSize: "14px", color: "gray", mt: 1 }}>
                  Email:{" "}
                  <span style={{ fontWeight: "bold", color: "#000" }}>
                    {user?.email || "Fetching..."}
                  </span>
                </Typography>

                <Typography sx={{ fontSize: "14px", color: "gray", mt: 0.6 }}>
                  Location:{" "}
                  <span style={{ fontWeight: "bold", color: "#000" }}>
                    {plan?.location || "Not Set"}
                  </span>
                </Typography>

                <Typography sx={{ fontSize: "14px", color: "gray", mt: 0.6 }}>
                  Guests:{" "}
                  <span style={{ fontWeight: "bold", color: "#000" }}>
                    {plan?.guests || "Not Set"}
                  </span>
                </Typography>
              </Box>
            </Box>

            <IconButton
              sx={{
                bgcolor: "rgba(233, 30, 99, 0.12)",
                "&:hover": { bgcolor: "rgba(233, 30, 99, 0.2)" },
              }}
            >
              <EditIcon sx={{ color: "#e91e63" }} />
            </IconButton>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography sx={{ fontWeight: "bold", color: "#c2185b", mb: 1 }}>
            Services Selected
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
            {plan?.services?.length > 0 ? (
              plan.services.map((s, index) => (
                <Chip
                  key={index}
                  label={s}
                  sx={{
                    px: 1,
                    py: 2,
                    fontSize: "13px",
                    bgcolor: "rgba(233, 30, 99, 0.12)",
                    color: "#c2185b",
                    fontWeight: "bold",
                    borderRadius: "14px",
                  }}
                />
              ))
            ) : (
              <Typography sx={{ fontSize: "13px", color: "gray" }}>
                No services selected
              </Typography>
            )}
          </Box>
        </Card>

        {/* PLAN SUMMARY CARD */}
        <Card
          sx={{
            width: { xs: "100%", md: "340px" },
            p: 4,
            borderRadius: "26px",
            background: "linear-gradient(135deg, #e91e63, #c2185b)",
            color: "white",
            boxShadow: "0 14px 35px rgba(233,30,99,0.25)",
          }}
        >
          <Typography sx={{ fontSize: "20px", fontWeight: "bold", mb: 3 }}>
            Plan Summary
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <PaymentsIcon sx={{ fontSize: 30 }} />
            <Box>
              <Typography sx={{ fontSize: "13px", opacity: 0.9 }}>Budget</Typography>
              <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                ₹{plan?.amount || "Not Set"}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <PeopleIcon sx={{ fontSize: 30 }} />
            <Box>
              <Typography sx={{ fontSize: "13px", opacity: 0.9 }}>Guests</Typography>
              <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                {plan?.guests || "Not Set"}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <LocationOnIcon sx={{ fontSize: 30 }} />
            <Box>
              <Typography sx={{ fontSize: "13px", opacity: 0.9 }}>Location</Typography>
              <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                {plan?.location || "Not Set"}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>

      {/* BOOKING OVERVIEW FULL WIDTH */}
      <Card
        sx={{
          p: 4,
          borderRadius: "26px",
          boxShadow: "0 12px 35px rgba(0,0,0,0.08)",
          border: "1px solid rgba(233, 30, 99, 0.12)",
        }}
      >
        <Typography sx={{ fontSize: "22px", fontWeight: "bold", color: "#c2185b" }}>
          Booking Overview
        </Typography>

        <Typography sx={{ fontSize: "14px", color: "gray", mt: 0.5 }}>
          Track your booking status in one place.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {[
            {
              label: "Total",
              value: bookingStats.total,
              icon: <ShoppingBagIcon sx={{ fontSize: 38, color: "#e91e63" }} />,
            },
            {
              label: "Accepted",
              value: bookingStats.accepted,
              icon: <CheckCircleIcon sx={{ fontSize: 38, color: "#2e7d32" }} />,
            },
            {
              label: "Pending",
              value: bookingStats.pending,
              icon: <PendingActionsIcon sx={{ fontSize: 38, color: "#ff9800" }} />,
            },
            {
              label: "Rejected",
              value: bookingStats.rejected,
              icon: <CancelIcon sx={{ fontSize: 38, color: "#d32f2f" }} />,
            },
          ].map((item, index) => (
            <Card
              key={index}
              sx={{
                flex: 1,
                minWidth: "220px",
                p: 3,
                borderRadius: "20px",
                textAlign: "center",
                boxShadow: "none",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              {item.icon}
              <Typography sx={{ fontSize: "26px", fontWeight: "bold", mt: 1 }}>
                {item.value}
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "gray" }}>
                {item.label}
              </Typography>
            </Card>
          ))}
        </Box>
      </Card>
    </Box>
  </Box>
);
}