

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  TextField,
  Chip,
  Rating
} from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AfterLogin() {
  const navigate = useNavigate();

  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Decoration", "Catering", "DJ", "Photography", "Makeup"];

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/vendor/getVendor`, {
          params: {
            service: selectedCategory !== "All" ? selectedCategory : "",
          },
        });

        setVendors(res.data.vendors);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVendors();
  }, [selectedCategory]);

  const filteredVendors = vendors.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, background: "linear-gradient(180deg, #f7f5ff, #ffffff)", minHeight: "100vh" }}>

      <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{color:'rgba(255, 34, 148, 0.93)'}}>
        Explore Vendors
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <TextField
          placeholder="Search vendors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "60%",backgroundColor:'#fff',borderRadius:'10px' }}
        />
      </Box>

      <Box sx={{ textAlign: "center", mt: 3 }}>
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            onClick={() => setSelectedCategory(cat)}
            color={selectedCategory === cat ? "primary" : "default"}
            sx={{ m: 0.5,
                backgroundColor: selectedCategory === cat ? "#f04288" : "#fff",
                color: selectedCategory === cat ? "#fff" : "#c2185b",
                border: "1px solid #f06292"

            }}
          />
        ))}
      </Box>

      
      <Grid container spacing={3} sx={{ mt: 3 }} alignItems="stretch">
        {filteredVendors.map((vendor) => (
          <Grid item xs={12} sm={6} md={3} display='flex' key={vendor._id}>
            <Card
              sx={{
                border:'2px solid rgba(240,66,136,0.25)',
                borderRadius: '18px',
                height:'100%',
                display:'flex',
                flexDirection:'column',
                background:'#fff',
                boxShadow:'0 6px 20px rgba(0,0,0,0.08)',
                overflow: "hidden",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-6px)", boxShadow:'0 10px 25px rgba(240,66,136,0.25)', border: "2px solid #f04288" },
              }}
            >

             
              <CardMedia
                component="img"
                height="200"
                image={vendor.image}
                alt={vendor.name}
                sx={{objectFit:'cover'}}
              />

              <CardContent sx={{flexGrow:1,display:'flex',flexDirection:'column'}}>
                <Typography variant="h6" fontWeight='bold' sx={{color:'#c2185b',minHeight:'48px'}}>{vendor.name}</Typography>

                <Typography sx={{color: "#f06292", fontSize: "13px" }}>
                  {vendor.service} • {vendor.location}
                </Typography>

                <Typography sx={{ fontWeight: 600, mt: 0.5 }}>
                  ₹{vendor.price}
                </Typography>
                <Box sx={{mt:'auto'}}>
                  <Rating value={vendor.rating} precision={0.1} readOnly />

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 , backgroundColor: "#f04288", "&:hover": {backgroundColor: "#c2185b" }}}
                    onClick={() => navigate(`/vendor/${vendor._id}`,{state:{mode:"DIRECT"}})}
                  >
                    View Details
                  </Button>
                </Box>
               

              </CardContent>

            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{left:0,right:0, textAlign: "center" ,position:'fixed',bottom:20,zIndex:2000,justifyContent:'center'}}>
        <Button sx={{backgroundColor:'#e91e63',fontWeight:'bold',px:6,py:1.3,"&:hover":{backgroundColor:'#c2185b'},boxShadow:'0 8px 20px rgba(0,0,0,0.25)'}}
          variant="contained"
          onClick={() => navigate("/budgetplanner")}
        >
          {/* //rgba(255, 0, 93, 0.93) */}
          Start Planning
        </Button>
      </Box>

    </Box>
  );
}