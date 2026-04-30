import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

export default function BookingPage() {
    const {vendorId}=useParams();
    const navigate=useNavigate();
    const [customerName,setCustomerName]=useState("");
    const [customerEmail,setCustomerEmail]=useState("");
    const [customerPhone,setCustomerPhone]=useState("");
    const [message,setMessage]=useState("");
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const token=localStorage.getItem("myToken");
            const res=await axios.post(`http://localhost:7000/booking/createBooking/${vendorId}`,
                {
                    customerName,
                    customerEmail,
                    customerPhone,
                    message,
                },
                {
                    headers:{
                        auth:token
                    },
                }
            )
            if(res.data.success){
                alert(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Box sx={{ minHeight: "100vh",display: "flex",justifyContent: "center",alignItems: "center",backgroundColor: "#f5f5f5",}}>
        <Paper elevation={4} sx={{ p: 4, width: "450px", borderRadius: "15px" }}>
            <Typography  variant='h5'fontWeight="bold" textAlign="center" mb={3}>
                Book Vendor
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Enter your name" fullWidth value={customerName} onChange={(e)=>{setCustomerName(e.target.value)}} sx={{ mb: 2 }}/>
                <TextField label="Enter your email" fullWidth value={customerEmail} onChange={(e)=>{setCustomerEmail(e.target.value)}} sx={{ mb: 2 }}/>
                <TextField label="Enter your phone number" fullWidth value={customerPhone} onChange={(e)=>{setCustomerPhone(e.target.value)}} sx={{ mb: 2 }}/>
                <TextField label="Message(Optional)" fullWidth value={message} onChange={(e)=>{setMessage(e.target.value)}} sx={{ mb: 2 }}/>
                <Button type='submit' variant='contained' fullWidth sx={{fontWeight:'bold',borderRadius:"10px",height:"45px",backgroundColor:"rebeccapurple"}}>
                    SUBMIT
                </Button>

                
            </form>
        </Paper>

    </Box>
  )
}
