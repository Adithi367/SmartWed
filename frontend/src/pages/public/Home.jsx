import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "./../../assets/logo.png"; 

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(to bottom, #ffe6e6, #ffffff)",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="SmartWed Logo"
          sx={{
            height: { xs: "150px", sm: "180px" },
            mb: 2,mt:1
          }}
        />

        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            color: "#f55442",
            letterSpacing: "2px",
          }}
        >
          SmartWed
        </Typography>

        <Typography
          sx={{
            mt: 2,
            fontSize: { xs: "18px", sm: "18px" },
            color: "#444",
            maxWidth: "750px",
            lineHeight: 1.8,
          }}
        >
          SmartWed helps you plan your perfect wedding by connecting you with trusted vendors for decoration, catering, music, photography, and more - all in one place.
        </Typography>

        <Box sx={{backgroundColor:'lightblue',p:'4px',borderRadius:'20px',width:'150px',mt:'50px'}}>
          <Button sx={{backgroundColor:'#134ee2',color:'white',borderRadius:'20px',p:'15px',width:'150px'}} onClick={()=>navigate('/register')}>Get Started</Button>
        </Box>
        
      </Box>

      
      
    </Box>
  );
}