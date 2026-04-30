import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

import { useLocation, useParams } from "react-router-dom";

import BookingContext from "../../context/BookingContext";
import QuotationContext from "../../context/QuotationContext";
import PlanContext from "../../context/PlanContext";
export default function VendorDetails() {
  const { getVendorById,createBooking } = useContext(BookingContext);
  const { requestQuotation } = useContext(QuotationContext);
  const {selectedPlan,setSelectedPlan}=useContext(PlanContext)
  const storedPlan=selectedPlan
  const { id } = useParams();
  const [bookingStatus,setBookingStatus]=useState(null)
  const breakdown=JSON.parse(localStorage.getItem("budgetBreakdown")||"{}")
  const [vendor, setVendor] = useState(null);
  const allocatedBudget=breakdown[vendor?.service]||0;
  const [tab, setTab] = useState(0);
  
  const [requested,setRequested]=useState(false)
  const [guests, setGuests] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const location=useLocation();
  const mode=location.state?.mode;
  const isDirect = mode === "DIRECT";
  const isPlanned = mode === "PLANNED";
  useEffect(()=>{
    const saved=localStorage.getItem("selectedPlan");
    if(!selectedPlan&& saved){
      setSelectedPlan(JSON.parse(saved))
    }
  },[])
  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const res = await getVendorById(id);
        if (res.data.success) {
          setVendor(res.data.vendor);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchVendor();
  }, [id]);
  
  const handleQuotationSubmit = async () => {
    try {
      console.log('Stored Plan'+storedPlan)
      console.log('Selected Plan'+selectedPlan)
      console.log("PLAN ID"+storedPlan?._id)
      if(!storedPlan||!storedPlan?._id){
        alert('No plan selected')
        return;
      }
      
       
      const res = await requestQuotation({
        planId:storedPlan._id,
        vendorId: vendor._id,
        allocatedBudget,
        guests,
        budget,
        message
        
        
      });
     
      if (res.data.success) {
        alert("Quotation Request Sent Successfully!");
        setRequested(true)
        setBookingStatus("PLANNED")
        setGuests("");
        setBudget("");
        setMessage("");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to request quotation");
    }
  };

  if (!vendor) return <h2>Loading Vendor Details...</h2>;

  return (
    <Box sx={{ backgroundColor: "#fff0f3", minHeight: "100vh" }}>
      
      <Box
        sx={{
          width: "50%",
          height: "500px",
          overflow: "hidden",
          margin: "auto",
        }}
      >
        <img
          src={vendor.image}
          alt={vendor.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </Box>

      <Card
        sx={{
          width: "85%",
          margin: "auto",
          mt: 3,
          borderRadius: "18px",
          boxShadow: 6,
        }}
      >
        <CardContent>
         
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 3,
            }}
          >
           
            <Box>
              <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
                {vendor.name}
              </Typography>

              <Typography sx={{ fontSize: "18px", color: "gray", mt: 0.5 }}>
                {vendor.service} • {vendor.location}
              </Typography>

              <Typography sx={{ fontSize: "18px", mt: 1 }}>
                Rating: <b>{vendor.rating}</b>
              </Typography>

              <Typography sx={{ fontSize: "18px", mt: 1 }}>
                Contact: <b>{vendor.phone}</b>
              </Typography>

              <Typography sx={{ fontSize: "18px", mt: 1 }}>
                Estimated Price: <b>₹{vendor.price}</b>
              </Typography>
            </Box>

           
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                onClick={() =>
                  window.open(
                    `https://wa.me/91${vendor.phone}?text=Hi%20I%20want%20a%20quotation%20for%20your%20service`,
                    "_blank"
                  )
                }
                variant="contained"
                sx={{
                  backgroundColor: "#0077ff",
                  borderRadius: "10px",
                  px: 3,
                  py: 1.2,
                  fontWeight: "bold",
                }}
              >
                WHATSAPP
              </Button>
              
              {isDirect && (
  <Button
    variant="contained"
    sx={{
      backgroundColor: "#f04288",
      borderRadius: "10px",
      px: 3,
      py: 1.2,
      fontWeight: "bold",
    }}
    onClick={async () => {
      try {
        const res = await createBooking(vendor._id, {
          bookingMode: "DIRECT",
          message: "Direct booking"
        });

        if (res.data.success) {
          alert("Booking request sent!");
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        console.log(error);
        alert("Booking failed");
      }
    }}
  >
    BOOK NOW
  </Button>
)}
{isPlanned && (
  <Button
    variant="contained"
    sx={{
      backgroundColor: "rebeccapurple",
      borderRadius: "10px",
      px: 3,
      py: 1.2,
      fontWeight: "bold",
    }}
    onClick={handleQuotationSubmit}
  >
    REQUEST QUOTATION
  </Button>
)}
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          
          <Tabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Overview" />
            <Tab label="Services" />
            <Tab label="Reviews" />
          </Tabs>

          <Box sx={{ mt: 3 }}>
            {tab === 0 && (
              <Typography sx={{ fontSize: "18px", color: "#555" }}>
                {vendor.name} is one of the top {vendor.service} vendors in{" "}
                {vendor.location}. They provide quality service and professional
                wedding support.
              </Typography>
            )}

            {tab === 1 && (
              <Typography sx={{ fontSize: "18px", color: "#555" }}>
                Services Offered: <b>{vendor.service}</b> <br />
                Starting Price: <b>₹{vendor.price}</b>
              </Typography>
            )}

            {tab === 2 && (
              <Box sx={{ mt: 2 }}>
                {vendor.reviews && vendor.reviews.length > 0 ? (
                  vendor.reviews.map((review, index) => (
                    <Card key={index} sx={{ mb: 2, p: 2 }}>
                      <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                        {review.customerName}
                      </Typography>

                      <Typography sx={{ color: "gold", fontSize: "18px" }}>
                        {"⭐".repeat(review.rating)}
                      </Typography>

                      <Typography sx={{ color: "#555", mt: 1 }}>
                        {review.comment}
                      </Typography>

                      <Typography sx={{ fontSize: "12px", color: "#555", mt: 1 }}>
                        {review.createdAt
                          ? new Date(review.createdAt).toLocaleDateString()
                          : ""}
                      </Typography>
                    </Card>
                  ))
                ) : (
                  <Typography sx={{ fontSize: "18px", color: "#555" }}>
                    No reviews available yet.
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      
    </Box>
  );
}




