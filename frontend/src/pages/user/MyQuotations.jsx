// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";

// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Chip,
//   Button,
//   Divider,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   DialogActions,
// } from "@mui/material";

// import BookingContext from "../../context/BookingContext";
// import QuotationContext from "../../context/QuotationContext";
// export default function MyQuotations() {
//   const [quotes, setQuotes] = useState([]);
//   const [openDialog,setOpenDialog]=useState(false)
//   const [selectedVendorId,setSelectedVendorId]=useState(null)
//   const [selectedQuotationId,setSelectedQuotationId]=useState(null)
//   const [bookingMessage,setBookingMessage]=useState("")
//   const [bookingStatusMap,setBookingStatusMap]=useState({})
  
//   const { createBooking,checkStatus ,checkServiceStatus} = useContext(BookingContext);
// const {getMyQuotations}=useContext(QuotationContext)
//   const fetchQuotes = async () => {
//     try {
//       const token = localStorage.getItem("myToken");

//       const res = await getMyQuotations()

//       if (res.data.success) {
//         setQuotes(res.data.data);
//         //new
//         const statusMap={}
//         const serviceStatusCache={}
//         for (let q of res.data.data) {
//           const service=q.vendorId?.service;
//           if(serviceStatusCache[service]===undefined){
//             const statusRes = await checkServiceStatus(service);
//             serviceStatusCache[service]=statusRes.data.booked;
//           }

//         if (serviceStatusCache[service]) {
//           statusMap[q._id] = "BOOKED";
//         }
//       }

//       setBookingStatusMap(statusMap);

//       } else {
//         setQuotes([]);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   // const fetchQuotes = async () => {
//   //   try {
//   //     const token = localStorage.getItem("myToken");

//   //     const res = await getMyQuotations()

//   //     if (res.data.success) {
//   //       setQuotes(res.data.data);
//   //       //new
//   //       const lockedMap={}
//   //       const statusMap={}
//   //       const serviceStatusCache={}
//   //       for (let q of res.data.data) {
//   //         const service=q.vendorId?.service;
//   //         if(serviceStatusCache[service]===undefined){
//   //           const statusRes = await checkServiceStatus(service);
//   //           serviceStatusCache[service]=statusRes.data.booked;
//   //         }

//   //       if (serviceStatusCache[service]) {
//   //         lockedMap[service] = true;
//   //       }
//   //       const vendorRes=await checkStatus(q.vendorId?._id)
//   //       if(vendorRes.data.booked){
//   //         statusMap[q._id]="BOOKED"
//   //       }
//   //     }
//   //     setServiceLockedMap(lockedMap);
//   //     setBookingStatusMap(statusMap);

//   //     } else {
//   //       setQuotes([]);
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   useEffect(() => {
//     fetchQuotes();
//   }, []);

  
//   const bookVendor = async (vendorId,quotationId,message) => {
//     try {
//       const res = await createBooking(vendorId,{quotationId,message,bookingMode:'PLANNED'});

//       if (res.data.success) {
//         //new
//         const bookedService=quotes.find((q)=>q._id===quotationId)?.vendorId?.service
//         setBookingStatusMap((prev)=>{
//           const updated={...prev};
//           quotes.forEach((q)=>{
//             if(q.vendorId?.service===bookedService){
//               updated[q._id]="BOOKED"
//             }
//           })
      
        
//         // setBookingStatusMap((prev)=>({
//         //   ...prev,
//         //   [quotationId]:"BOOKED",
//           return updated;
//           })
//         alert("Booking successful!");
//         fetchQuotes();
//       } else {
//         alert(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       alert(error.response?.data?.message||"Booking failed");
//     }
//   };
//   const getBookingStatus=async(vendorId)=>{
//     try {
//       const res=await checkStatus(vendorId)
//     if(res.data.booked){
//       setBookingStatusMap((prev)=>({
//         ...prev,
//         [quotationId]:"BOOKED",
//       }))
//     }
//     } catch (error) {
//       console.log(error)
//     }
    
//   }

//   return (
//     <Box sx={{ p: 3, minHeight: "100vh", backgroundColor: "#fff0f5" }}>
//       <Typography
//         sx={{
//           fontSize: "28px",
//           fontWeight: "bold",
//           textAlign: "center",
//           color: "#e91e63",
//           mb: 3,
//         }}
//       >
//         My Requested Quotations
//       </Typography>

//       {quotes.length === 0 ? (
//         <Typography sx={{ textAlign: "center", color: "gray" }}>
//           No quotations requested yet
//         </Typography>
//       ) : (
//         quotes.map((q) => (
//           <Card
//             key={q._id}
//             sx={{
//               mb: 3,
//               borderRadius: "16px",
//               border: "1px solid rgba(233,30,99,0.2)",
//               boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
//             }}
//           >
//             <CardContent>
              
//               <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
//                 {q.vendorId?.name}
//               </Typography>

//               <Typography sx={{ color: "gray" }}>
//                 {q.vendorId?.service} • {q.vendorId?.location}
//               </Typography>

//               <Typography sx={{ mt: 1 }}>
//                 ⭐ Rating: <b>{q.vendorId?.rating}</b>
//               </Typography>

//               <Divider sx={{ my: 2 }} />

            
//               <Typography sx={{ fontSize: "16px" }}>
//                 Allocated Budget: <b>₹{q.allocatedBudget}</b>
//               </Typography>

//               <Typography sx={{ fontSize: "16px" }}>
//                 Vendor Price: <b>₹{q.vendorPrice}</b>
//               </Typography>

//               <Typography sx={{ fontSize: "16px", color: "green" }}>
//                 Discount: <b>₹{q.discount}</b>
//               </Typography>

//               <Typography sx={{ fontSize: "16px", color: "red" }}>
//                 Extra Charges: <b>₹{q.extraCharges}</b>
//               </Typography>

//               <Typography
//                 sx={{
//                   fontSize: "18px",
//                   fontWeight: "bold",
//                   mt: 1,
//                   color: "#c2185b",
//                 }}
//               >
//                 Final Price: ₹{q.finalPrice}
//               </Typography>

//               <Typography sx={{ mt: 1 }}>
//                 Recommendation Score: <b>{q.recommendationScore?.toFixed(2)}</b>
//               </Typography>

//               <Divider sx={{ my: 2 }} />

             
//               <Typography sx={{ fontWeight: "bold", mb: 1 }}>
//                 Items Included:
//               </Typography>

//               {q.itemsIncluded && q.itemsIncluded.length > 0 ? (
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//                   {q.itemsIncluded.map((item, index) => (
//                     <Chip key={index} label={item} color="secondary" />
//                   ))}
//                 </Box>
//               ) : (
//                 <Typography sx={{ color: "gray" }}>
//                   No items mentioned
//                 </Typography>
//               )}

//               <Divider sx={{ my: 2 }} />

            
//               <Button
                
//                 variant="contained"
//                 sx={{
//                   mt: 2,
//                   fontWeight:'bold',
//                   backgroundColor:
//                   bookingStatusMap[q._id] === "BOOKED" ? "gray" : "#e91e63",
//                   "&:hover": {
//                     backgroundColor:bookingStatusMap[q._id] === "BOOKED" ? "gray" : "#c2185b",
//                   },
//                 }}
                
//                 onClick={()=>{
//                   if(bookingStatusMap[q._id] === "BOOKED"){
//                     alert("You already booked a vendor for this service. You cannot book again.");         
//                     return;
//                   }
//                   setSelectedVendorId(q.vendorId?._id);
//                   setSelectedQuotationId(q._id)
//                   setOpenDialog(true)
//                 }}
//               >
//                 {bookingStatusMap[q._id]==="BOOKED"?"BOOKED":"BOOK THIS VENDOR"}
//             </Button>
//             </CardContent>
//           </Card>
//         ))
//       )}
//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
//   <DialogTitle sx={{ fontWeight: "bold" }}>
//     Confirm Booking
//   </DialogTitle>

//   <DialogContent>
//     <TextField
//       fullWidth
//       label="Message to Vendor"
//       multiline
//       rows={3}
//       margin="dense"
//       value={bookingMessage}
//       onChange={(e) => setBookingMessage(e.target.value)}
//     />
//   </DialogContent>

//   <DialogActions>
//     <Button onClick={() => setOpenDialog(false)}>Cancel</Button>

//     <Button
//       variant="contained"
//       sx={{ backgroundColor: "#e91e63" }}
//       onClick={async () => {
//         await bookVendor(selectedVendorId, selectedQuotationId,bookingMessage);
//         setOpenDialog(false);
//         setBookingMessage("");
//       }}
//     >
//       Book Now
//     </Button>
//   </DialogActions>
// </Dialog>
//     </Box>
//   );
// }





import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

import BookingContext from "../../context/BookingContext";
import QuotationContext from "../../context/QuotationContext";

export default function MyQuotations() {
  const [quotes, setQuotes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [selectedQuotationId, setSelectedQuotationId] = useState(null);
  const [bookingMessage, setBookingMessage] = useState("");

  const [bookingStatusMap, setBookingStatusMap] = useState({});
  const [serviceLockedMap, setServiceLockedMap] = useState({});

  const { createBooking, checkStatus, checkServiceStatus } =
    useContext(BookingContext);

  const { getMyQuotations } = useContext(QuotationContext);

  const fetchQuotes = async () => {
    try {
      const res = await getMyQuotations();

      if (res.data.success) {
        setQuotes(res.data.data);

        const lockedMap = {};
        const statusMap = {};
        const serviceStatusCache = {};

        for (let q of res.data.data) {
          const service = q.vendorId?.service;

          // service lock check
          if (serviceStatusCache[service] === undefined) {
            const statusRes = await checkServiceStatus(service);
            serviceStatusCache[service] = statusRes.data.booked;
          }

          if (serviceStatusCache[service]) {
            lockedMap[service] = true;
          }

          // vendor booking check (to make only booked vendor grey)
          const vendorRes = await checkStatus(q.vendorId?._id);
          if (vendorRes.data.booked) {
            if(vendorRes.data.status==='accepted'){
              statusMap[q._id] = "BOOKED";
            }
            else if(vendorRes.data.status==='pending'){
              statusMap[q._id]="PENDING"
            }else if(vendorRes.data.status==='rejected'){
              statusMap[q._id]="REJECTED"
            }
          }
        }

        setServiceLockedMap(lockedMap);
        setBookingStatusMap(statusMap);
      } else {
        setQuotes([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const bookVendor = async (vendorId, quotationId, message) => {
    try {
      const res = await createBooking(vendorId, {
        quotationId,
        message,
        bookingMode: "PLANNED",
      });

      if (res.data.success) {
        const bookedService = quotes.find((q) => q._id === quotationId)?.vendorId
          ?.service;

        // only this vendor becomes grey
        setBookingStatusMap((prev) => ({
          ...prev,
          [quotationId]: "BOOKED",
        }));

        // lock the whole service (only for blocking other vendor booking)
        setServiceLockedMap((prev) => ({
          ...prev,
          [bookedService]: true,
        }));

        alert("Booking successful!");
        fetchQuotes();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <Box sx={{ p: 3, minHeight: "100vh", backgroundColor: "#fff0f5" }}>
      <Typography
        sx={{
          fontSize: "28px",
          fontWeight: "bold",
          textAlign: "center",
          color: "#e91e63",
          mb: 3,
        }}
      >
        My Requested Quotations
      </Typography>

      {quotes.length === 0 ? (
        <Typography sx={{ textAlign: "center", color: "gray" }}>
          No quotations requested yet
        </Typography>
      ) : (
        quotes.map((q) => (
          <Card
            key={q._id}
            sx={{
              mb: 3,
              borderRadius: "16px",
              border: "1px solid rgba(233,30,99,0.2)",
              boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
            }}
          >
            <CardContent>
              <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                {q.vendorId?.name}
              </Typography>

              <Typography sx={{ color: "gray" }}>
                {q.vendorId?.service} • {q.vendorId?.location}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                ⭐ Rating: <b>{q.vendorId?.rating}</b>
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography sx={{ fontSize: "16px" }}>
                Allocated Budget: <b>₹{q.allocatedBudget}</b>
              </Typography>

              <Typography sx={{ fontSize: "16px" }}>
                Vendor Price: <b>₹{q.vendorPrice}</b>
              </Typography>

              <Typography sx={{ fontSize: "16px", color: "green" }}>
                Discount: <b>₹{q.discount}</b>
              </Typography>

              <Typography sx={{ fontSize: "16px", color: "red" }}>
                Extra Charges: <b>₹{q.extraCharges}</b>
              </Typography>

              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  mt: 1,
                  color: "#c2185b",
                }}
              >
                Final Price: ₹{q.finalPrice}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                Recommendation Score:{" "}
                <b>{q.recommendationScore?.toFixed(2)}</b>
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                Items Included:
              </Typography>

              {q.itemsIncluded && q.itemsIncluded.length > 0 ? (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {q.itemsIncluded.map((item, index) => (
                    <Chip key={index} label={item} color="secondary" />
                  ))}
                </Box>
              ) : (
                <Typography sx={{ color: "gray" }}>
                  No items mentioned
                </Typography>
              )}

              <Divider sx={{ my: 2 }} />

              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  fontWeight: "bold",
                  backgroundColor:
                    bookingStatusMap[q._id] === "BOOKED" ? "green" :bookingStatusMap[q._id]==="REJECTED" ? "red" :bookingStatusMap[q._id] === "PENDING" ? "orange" : "#e91e63",
                  "&:hover": {
                    backgroundColor:
                      bookingStatusMap[q._id] === "BOOKED"
                        ? "green"
                        :bookingStatusMap[q._id]==="REJECTED" ? "red" :bookingStatusMap[q._id] === "PENDING" ? "orange" 
                        : "#c2185b",
                  },
                }}
                onClick={() => {
                  const service = q.vendorId?.service;

                  // if service is locked but this is not the booked vendor
                  if (
                    serviceLockedMap[service] &&
                    bookingStatusMap[q._id] !== "BOOKED"
                  ) {
                    alert(
                      "You already booked a vendor for this service. You cannot book again."
                    );
                    return;
                  }

                  // if already booked vendor clicked
                  if (bookingStatusMap[q._id] === "BOOKED") {
                    alert("This vendor is already booked.");
                    return;
                  }

                  setSelectedVendorId(q.vendorId?._id);
                  setSelectedQuotationId(q._id);
                  setOpenDialog(true);
                }}
              >
                {bookingStatusMap[q._id] === "BOOKED"
                  ? "BOOKED"
                  :bookingStatusMap[q._id] === "PENDING"
                  ? "PENDING"
                  :bookingStatusMap[q._id] === "REJECTED"
                  ? "REJECTED"
                  : "BOOK THIS VENDOR"}
              </Button>
            </CardContent>
          </Card>
        ))
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle sx={{ fontWeight: "bold" }}>Confirm Booking</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Message to Vendor"
            multiline
            rows={3}
            margin="dense"
            value={bookingMessage}
            onChange={(e) => setBookingMessage(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>

          <Button
            variant="contained"
            sx={{ backgroundColor: "#e91e63" }}
            onClick={async () => {
              await bookVendor(
                selectedVendorId,
                selectedQuotationId,
                bookingMessage
              );
              setOpenDialog(false);
              setBookingMessage("");
            }}
          >
            Book Now
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}