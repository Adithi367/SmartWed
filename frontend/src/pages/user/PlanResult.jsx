import React, { useEffect, useState,useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import PlanContext from "../../context/PlanContext";
import { useDebugValue } from "react";
export default function PlanResult() {
  const {getPlan,getVendors,setSelectedPlan}=useContext(PlanContext)
  const location = useLocation();
  const navigate=useNavigate();
  const [plan, setPlan] = useState(location.state);

  const token = localStorage.getItem("myToken");
  useEffect(()=>{
    if (plan){
      setSelectedPlan(plan);
      localStorage.setItem("selectedPlan",JSON.stringify(plan));
    }
  },[plan])
useEffect(() => {
  const fetchPlan = async () => {
    if (!plan) {
      const res = await getPlan();

      if (res.data.success) {
        setPlan(res.data.data);
      }
    }
  };

  fetchPlan();
}, [token,plan]);

  const [vendorsByService, setVendorsByService] = useState({});

  if (!plan) return <h2>No plan found</h2>;

  const calculateSmartSplit = (plan) => {
    const budget = Number(plan.amount);
    const guests = Number(plan.guests);

    const perPerson = budget / guests;

    // Savings %
    let savingsPercent = 0;
    if (budget < 200000) savingsPercent = 0.05;
    else if (budget <= 1000000) savingsPercent = 0.1;
    else savingsPercent = 0.15;

    const savingsAmount = Math.round(budget * savingsPercent);
    const usableBudget = budget - savingsAmount;

    let weights = {};

    if (perPerson < 500) {
      weights = {
        Catering: 5,
        Decoration: 2,
        Photography: 1.5,
        Makeup: 1,
        DJ: 0.5,
      };
    } else if (perPerson <= 1500) {
      weights = {
        Catering: 4,
        Decoration: 3,
        Photography: 2,
        Makeup: 1.5,
        DJ: 1,
      };
    } else {
      weights = {
        Catering: 3,
        Decoration: 4,
        Photography: 2.5,
        Makeup: 2,
        DJ: 1.5,
      };
    }

    const selectedWeights = {};
    plan.services.forEach((service) => {
      selectedWeights[service] = weights[service];
    });

    const totalWeight = Object.values(selectedWeights).reduce(
      (a, b) => a + b,
      0
    );

    const result = {};
    for (let service in selectedWeights) {
      result[service] = Math.round(
        (selectedWeights[service] / totalWeight) * usableBudget
      );
    }

    return {
      breakdown: result,
      savings: savingsAmount,
    };
  };

  const breakdown = calculateSmartSplit(plan);
  useEffect(()=>{
    if(plan && breakdown){
      localStorage.setItem("budgetBreakdown",JSON.stringify(breakdown.breakdown))
    }
  })

  const chartData = Object.entries(breakdown.breakdown).map(
    ([service, amount]) => ({
      name: service,
      value: amount,
    })
  );

  const COLORS = ["#f06292", "#ec407a", "#c2185b", "#ff80ab", "#ad1457"];
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        let temp = {};

        for (let service of plan.services) {
          const allocatedBudget = breakdown.breakdown[service];

          const data = await getVendors(
            plan.location,
            service,
            allocatedBudget
          );
          
          const filtered = data.vendors.filter(
            (vendor) => Number(vendor.price) <= allocatedBudget
          );

          temp[service] = filtered;
        }

        setVendorsByService(temp);
      } catch (error) {
        console.log("Error fetching vendors:", error);
      }
    };
    if(plan)
      fetchVendors();
  }, [plan]);

  return (
  <Box sx={{ p: 4,backgroundColor: "#fff0f3", minHeight: "100vh"  }}>

    <Typography
      sx={{
        textAlign: "center",
        fontSize: "32px",
        fontWeight: "bold",
        color: "#e75480",
        mb: 5,
      }}
    >
      SmartWed Plan Summary
    </Typography>

    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 10,
      }}
    >
      {/* LEFT SUMMARY */}
      <Card
        sx={{
          width: "420px",
          borderRadius: "20px",
          boxShadow: 6,
          height: "350px",
          p: 2,
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: "30px", fontWeight: "bold", mb: 5 }}>
            Plan Details
          </Typography>

          <Typography sx={{ fontSize: "22px", mb: 3 }}>
             Total Budget: <b>₹{plan.amount}</b>
          </Typography>

          <Typography sx={{ fontSize: "22px", mb: 3 }}>
             Guests: <b>{plan.guests}</b>
          </Typography>

          <Typography sx={{ fontSize: "22px", mb: 3 }}>
          Location: <b>{plan.location}</b>
          </Typography>

          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "green",
              mb: 3,
            }}
          >
            Savings: ₹{breakdown.savings}
          </Typography>

         
        </CardContent>
      </Card>

      <Card
        sx={{
          width: "400px",
          borderRadius: "20px",
          boxShadow: 6,
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PieChart width={350} height={350}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Card>
    </Box>

    <Typography
      sx={{
        textAlign: "center",
        fontSize: "28px",
        fontWeight: "bold",
        mt: 6,
        mb: 3,
        color: "black",
      }}
    >
      Recommended Vendors Based on Your Budget
    </Typography>

    {plan.services.map((service) => (
      <Box key={service} sx={{ mt: 4 }}>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "22px",
            fontWeight: "bold",
            color: "#c2185b",
            mb: 2,
          }}
        >
          {service} Vendors 
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
          }}
        >
          {vendorsByService[service] && vendorsByService[service].length > 0 ? (
            vendorsByService[service].map((vendor) => (
              <Card
                key={vendor._id}
                sx={{
                  width: "320px",
                  borderRadius: "20px",
                  boxShadow: 6,
                  overflow: "hidden",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <img
                  src={vendor.image}
                  alt={vendor.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />

                <CardContent>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      mb: 1,
                    }}
                  >
                    {vendor.name}
                  </Typography>

                  <Typography sx={{ fontSize: "16px", mb: 0.5 }}>
                     Price: ₹{vendor.price}
                  </Typography>

                  <Typography sx={{ fontSize: "16px", mb: 0.5 }}>
                     Rating: {vendor.rating}
                  </Typography>

                  <Typography sx={{ fontSize: "16px" }}>
                     {vendor.location}
                  </Typography>
                  <Button variant='contained'
                  sx={{mt:2,
                      backgroundColor:"#f04288",
                      fontWeight:'bold',
                      borderRadius:'10px',
                      '&:hover':{backgroundColor:'#ec407a'}

                  }}

                    
                    onClick={() => navigate(`/vendor/${vendor._id}`,{state:{mode:"PLANNED"}})}
                  >
                    View Vendor
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography sx={{ textAlign: "center", mt: 2, color: "red" }}>
              No vendors available within this budget.
            </Typography>
          )}
        </Box>
      </Box>
    ))}
  </Box>
);
}