import { Box, Typography } from '@mui/material'
import React from 'react'

export default function Footer() {
  const adminToken=localStorage.getItem('adminToken')
  const isAdmin=!!adminToken
  return (
    <div>
        <Box
        sx={{
          background: isAdmin?"#6a1b9a":"#f55442",
          color: "white",
          textAlign: "center",
          py: 2,
          height:'30px'
        }}
      >
        <Typography sx={{ fontSize: "14px" }}>
          © {new Date().getFullYear()} SmartWed. All Rights Reserved.
        </Typography>
      </Box>
    </div>
  )
}
