import React, { useState,useContext } from "react";
import { Box, Card, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
export default function ResetPassword() {
  const navigate = useNavigate();
  const { resetPassword }=useContext(UserContext)
  const [form, setForm] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = async () => {
    if (!form.email || !form.newPassword || !form.confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await resetPassword(
        {
          email: form.email,
          newPassword: form.newPassword,
        }
      );

      if (res.data.success) {
        alert(res.data.message);
        navigate("/login");
      } else {
        alert('Reset Failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff0f3",
        flexDirection: "column",
      }}
    >
      <Card
        sx={{
          border: "2px solid rgba(247, 107, 165, 0.93)",
          height: "450px",
          width: "400px",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#e75480", fontWeight: "bold" }}
        >
          Reset Password
        </Typography>

        <TextField
          name="email"
          value={form.email}
          onChange={handleChange}
          sx={{ mt: 2, width: "300px" }}
          label="Enter Email"
          variant="outlined"
        />

        <TextField
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          type="password"
          sx={{ mt: 2, width: "300px" }}
          label="New Password"
          variant="outlined"
        />

        <TextField
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          type="password"
          sx={{ mt: 2, width: "300px" }}
          label="Confirm Password"
          variant="outlined"
        />

        <Button
          onClick={handleReset}
          sx={{
            width: "300px",
            mt: 4,
            backgroundColor: "#f04288",
            color: "white",
            "&:hover": { backgroundColor: "#c2185b" },
          }}
        >
          Reset Password
        </Button>
      </Card>
    </Box>
  );
}