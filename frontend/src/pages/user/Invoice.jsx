import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useEffect,useContext } from 'react'
import { useState } from 'react'
import BookingContext from '../../context/BookingContext';
export default function Invoice() {
    const [billItems,setBillItems]=useState([]);
    const [totalAmount,setTotalAmount]=useState(0);
    const {generateBill}=useContext(BookingContext)
    const fetchBill=async()=>{
        try {
            const res=await generateBill()
            if(res.data.success){
                setBillItems(res.data.billItems)
                setTotalAmount(res.data.totalAmount)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchBill()
    },[])
  return (
  <Box 
    sx={{
      backgroundColor: "#fff0f5",
      minHeight: "100vh",
      p: 3,
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}
  >
    <style>
      {
        `@media print {
          .no-print {
            display: none;
          }
        }`
      }
    </style>
    

    {billItems.length === 0 ? (
      <Typography sx={{ fontSize: "20px", color: "red" }}>
        No bill generated yet.
      </Typography>
    ) : (
      <>
        <Box
          sx={{
            backgroundColor: "#ffffff",
            p: 4,
            borderRadius: "16px",
            boxShadow: '0 10px 30px rgba(233, 30, 99, 0.15)',
            width: "650px",
            maxWidth:'95%',
            border: "1px solid #rgba(233, 30, 99, 0.2)"
          }}
        >
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography sx={{ fontSize: "38px", fontWeight: "bold", color: "#e91e63" }}>
  SmartWed
</Typography>
  <Typography sx={{ fontSize: "34px", fontWeight: "bold", color: "#e91e63" ,textAlign:'center'}}>
     Invoice
  </Typography>

  

  <Typography sx={{ fontSize: "14px", color: "black", mt: 1 }}>
    Generated on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
  </Typography>

  <Divider sx={{ mt: 2 }} />
</Box>
          <TableContainer component={Paper} sx={{ mt: 3, borderRadius: "12px",overflow:'hidden' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#ffe4ec" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Vendor</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Service</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Base Price</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Discount</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Extra Charges</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Final Price</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {billItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.vendorName}</TableCell>
                    <TableCell>{item.service}</TableCell>

                    <TableCell>
                      ₹{(item.basePrice||0).toLocaleString("en-IN")}
                    </TableCell>

                    <TableCell sx={{ color: "green", fontWeight: "bold" }}>
                      -₹{(item.discount||0).toLocaleString("en-IN")}
                    </TableCell>

                    <TableCell sx={{ color: "orange", fontWeight: "bold" }}>
                      +₹{(item.extraCharges||0).toLocaleString("en-IN")}
                    </TableCell>

                    <TableCell sx={{ fontWeight: "bold", color: "#e91e63" }}>
                      ₹{(item.finalPrice||0).toLocaleString("en-IN")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ mt: 4 }}>

            <Divider sx={{ borderStyle: "dashed", borderWidth:'1px',borderColor: "black", mb: 2 }} />
              <Box sx={{display:'flex',justifyContent:'space-between',px:2}}>
                <Typography sx={{fontSize:'18px',color:'black',fontWeight:'500'}}>
                 Grand Total
                </Typography>
                <Typography sx={{fontSize: "22px",fontWeight: "bold",color: "rebeccapurple",pr: 2}}>
                  ₹{(totalAmount||0).toLocaleString("en-IN")}
                </Typography>
              </Box>

            <Divider sx={{ borderStyle: "dashed", borderWidth:'1px',borderColor: "black", mt: 2 }} />
            <Typography
            sx={{
            mt: 3,
            textAlign: "center",
            fontSize: "16px",
            color: "rgba(236, 65, 170, 0.93)",
            fontStyle: 'revert-layer',
            fontWeight:'bold'
            }}
            >
              Thank you for using SmartWed 
            </Typography>

          </Box>

          
          
        </Box>
        <Button className='no-print' variant="contained"
          sx={{  background: "linear-gradient(135deg, #e91e63, #c2185b)",
                mt: 3,
                color: "white",
                fontWeight: "bold",
                borderRadius: "30px",
                padding: "10px 24px",
                textTransform: "none",
                boxShadow: "0 6px 18px rgba(233, 30, 99, 0.35)",
                "&:hover": {
                background: "linear-gradient(135deg, #c2185b, #ad1457)"
              }}}
          onClick={() => window.print()}
        >
           Print Bill
        </Button>
      </>
    )}
  </Box>
);
}
