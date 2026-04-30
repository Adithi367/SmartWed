import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState,useEffect,useContext } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import BookingContext from '../../context/BookingContext';

export default function BookingStatus() {
    const [bookings,setBookings]=useState([]);
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate();
    const {getBookings}=useContext(BookingContext)
  const fetchBookings=async()=>{
    try {
        setLoading(true)
        const res=await getBookings()
        if(res.data.success){
            setBookings(res.data.data)
        }
    } catch (error) {
        console.log(error)
    } finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchBookings()
  },[])

  return (
    <Box sx={{backgroundColor:'#fff0f3',textAlign:"center",flexDirection:'column',minHeight:'100vh'}}>
      <Box sx={{ display: 'flex',flexWrap: 'wrap', gap: 2, justifyContent: 'center',flex:1 ,pt:4}}>
        {bookings.map((booking)=>(
          <Card key={booking._id} sx={{ maxWidth: 400 ,border:'1px solid rgba(233, 30, 99, 0.3)',borderRadius:'12px',boxShadow:'0 6px 18px rgba(233, 30, 99, 0.12)'}}>
            <CardMedia
              component="img"
              height="300"
              image={booking.vendorId.image||"https://via.placeholder.com/300"}
              alt="vendor image"
            />
      
            <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2, ml: 2,color: "#e91e63"  }}>
              {booking.vendorId.name||'Not available'}
            </Typography>
            <Typography variant="body2" color="black" sx={{ ml: 2 ,mt:2}}>
              {`Booked on ${new Date(booking.createdAt).toLocaleDateString()}`}
            </Typography>
            <CardContent>
              <Typography variant="body2" sx={{ color: '#001aff',fontWeight:"bold" }}>
                {booking.vendorId.about||'Not available'}
              </Typography>
              <Typography sx={{ mt: 1, fontWeight: "bold" }}>
                Status:{" "}
                <span style={{color:
                      booking.status === "accepted"
                      ? "#2e7d32"
                      : booking.status === "rejected"
                      ? "#c62828"
                      : "#e91e63",
                      fontWeight:'bold'
                }}
                >
                  {booking.status}
                </span>
              </Typography>

            </CardContent>
   
      
          </Card>
        ))}
      </Box>
      <Box sx={{mt: 4 ,display:'flex',justifyContent:'center',p:3}}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#e91e63", color: "white",mt:4,"&:hover": { backgroundColor: "#c2185b" }}}
          onClick={() => navigate("/invoice")}
        >
          View Bill
        </Button>
      </Box>
    </Box>
    
  );
}

