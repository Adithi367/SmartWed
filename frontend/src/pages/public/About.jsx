import React from "react";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LockIcon from "@mui/icons-material/Lock";
import BoltIcon from "@mui/icons-material/Bolt";
export default function About() {


  const cards = [
    {
      title: "Simplicity",
      desc: "No confusion, just clean wedding planning experience.",
      icon: <StarIcon />,
      color: "#7b1fa2",
    },
    {
      title: "Trust",
      desc: "Verified vendors and transparent booking system.",
      icon: <LockIcon />,
      color: "#6a1b9a",
    },
    {
      title: "Speed",
      desc: "Fast search, quick booking, zero unnecessary steps.",
      icon: <BoltIcon />,
      color: "#8e24aa",
    },
  ];
  

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #f6f2ff, #ffffff 60%)",
        px: 3,
        py: 6,
        position: "relative",
        overflow: "hidden",
      }}
    >

      {/* Glow background */}
      <Box
        sx={{
          position: "absolute",
          width: 350,
          height: 350,
          background: "rgba(123,31,162,0.25)",
          filter: "blur(140px)",
          top: -100,
          left: -100,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 350,
          height: 350,
          background: "rgba(186,104,200,0.25)",
          filter: "blur(140px)",
          bottom: -120,
          right: -120,
          zIndex: 0,
        }}
      />

      {/* HERO */}
      <Box textAlign="center" sx={{ mb: 7, position: "relative", zIndex: 1 }}>
        
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            background: "linear-gradient(90deg,#7b1fa2,#9c27b0,#ce93d8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          SmartWed
        </Typography>

        <Typography sx={{ mt: 1, color: "text.secondary", fontSize: "16px" }}>
          Simplifying wedding planning with clarity, trust & elegance 💍
        </Typography>
      </Box>

      {/* CARDS */}
      <Grid container spacing={3} justifyContent="center" sx={{ position: "relative", zIndex: 1 }}>
        {cards.map((item, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card
              sx={{
                borderRadius: 5,
                p: 2,
                height: "100%",
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                transition: "0.35s",
                position: "relative",
                overflow: "hidden",

                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: `0 20px 50px ${item.color}40`,
                },

                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "4px",
                  background: item.color,
                },
              }}
            >
              <CardContent>

                {/* ICON BADGE */}
                <Box
                  sx={{
                    width: 45,
                    height: 45,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `${item.color}15`,
                    color: item.color,
                    mb: 2,
                  }}
                >
                  {item.icon}
                </Box>

                <Typography variant="h6" fontWeight="bold">
                  {item.title}
                </Typography>

                <Typography sx={{ mt: 1.5, color: "text.secondary" }}>
                  {item.desc}
                </Typography>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* MID SECTION */}
      <Box
        textAlign="center"
        sx={{
          mt: 10,
          mb: 6,
          position: "relative",
          zIndex: 1,
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(10px)",
          borderRadius: 4,
          p: 4,
          maxWidth: 800,
          mx: "auto",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Built for real people, not complexity
        </Typography>

        <Typography
          sx={{
            mt: 2,
            color: "text.secondary",
            fontSize: "15px",
          }}
        >
          SmartWed removes unnecessary steps and gives you a clean journey from
          discovery to booking — no confusion, just clarity.
        </Typography>
      </Box>

      {/* QUOTE */}
      <Box textAlign="center" sx={{ mt: 6 }}>
        <Typography
          sx={{
            fontStyle: "italic",
            color: "#7b1fa2",
            fontSize: "18px",
            fontWeight: 500,
          }}
        >
          “Less confusion. More celebration. That’s SmartWed.”
        </Typography>
      </Box>

      
    

    </Box>
  );
}