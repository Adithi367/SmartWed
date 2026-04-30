import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import React, { useEffect, useState,useContext } from 'react'
import axios from 'axios'
import PlanContext from '../../context/PlanContext'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
export default function BudgetPlanner() {
     const { createPlan,getPlan}=useContext(PlanContext) 
     const [plan, setPlan] = useState({
      amount:'',
      guests:'',
      location:'',
      services:[]
     });
     const navigate=useNavigate()
     const token=localStorage.getItem("myToken")
    useEffect(() => {
      const checkPlan = async () => {
        try {
          const res = await getPlan()

          if (res.data.success) {
            navigate("/planresult", { state: res.data.data });
          }
        } catch (error) {
          console.log(error.message);
        }
        };

        checkPlan();
    }, [navigate,token]);
     const handleServiceChange = (e) => {
  const { value, checked } = e.target;

    if (checked) {
      setPlan({...plan,services: [...plan.services, value]});
    } else {
      setPlan({...plan,services: plan.services.filter(service => service !== value)});
    }
  };
     
     

  const handleChange = (event) => {
    setPlan({...plan,[event.target.name]:event.target.value});
    
  };
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const res=await createPlan(plan)
      console.log(res)
      console.log(res.data)
      if(res.data.success){
        alert(res.data.message)

        navigate("/planresult",{
          state:res.data.data
        })
        
        
      }
      else{
        alert("Plan Creation Failed!")
      }
    }
    catch(error){
      console.log(error)
    }

  }
  console.log(plan)
  return (
    <div>
      
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',backgroundColor:'#fff0f3',flexDirection:'column'}}>
           
            
        <Card sx={{gap:3,border:'2px solid rgba(247, 107, 165, 0.93)',width:'450px',borderRadius:'20px',alignItems:'center',display:'flex',flexDirection:'column',justifyContent:'center',marginTop:'20px',pt:'20px',pb:'30px',backgroundColor:'rgba(255, 255, 255, 0.95)',boxShadow:7}}>
            <Typography variant="h5" sx={{ color: "#e75480", fontWeight: "bold", mt: 1 }}>
              SmartWed Budget Planner
            </Typography>
            <TextField value={plan.amount} name='amount' onChange={handleChange} sx={{mt:'20px',width:'300px'}} id="outlined-basic" label="Enter Budget Amount" variant="outlined" />
            <TextField value={plan.guests} name='guests' onChange={handleChange} sx={{mt:'20px',width:'300px'}}  id="outlined-basic" label="Enter number of guests" variant="outlined" />
           
      <TextField sx={{width:'300px',mt:'20px'}} select label="Select location" value={plan.location} onChange={handleChange}  name='location'>
        <MenuItem value="Mangalore">Mangalore</MenuItem>
        <MenuItem value="Bangalore">Bangalore</MenuItem>
        <MenuItem value="Mysore">Mysore</MenuItem>
    </TextField>
    <h3 style={{alignItems:'flex-start'}} >Select Services</h3>
    <Box  sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',width:'70%'}}>
      <FormControlLabel size='medium' control={<Checkbox checked={plan.services.includes("Catering")} value="Catering" onChange={handleServiceChange} />} label="Catering" />
      <FormControlLabel size='medium'  control={<Checkbox checked={plan.services.includes("Decoration")}value="Decoration" onChange={handleServiceChange} />} label="Decoration" />
      <FormControlLabel size='medium' control={<Checkbox checked={plan.services.includes("Photography")} value="Photography" onChange={handleServiceChange}  />} label="Photography" />
      <FormControlLabel size='medium' control={<Checkbox checked={plan.services.includes("Makeup")} value="Makeup" onChange={handleServiceChange} />} label="Makeup" />
      <FormControlLabel size='medium' control={<Checkbox checked={plan.services.includes("DJ")} value="DJ" onChange={handleServiceChange}  />} label="DJ" />
    
    </Box>
    <Button onClick={handleSubmit} sx={{backgroundColor:'#f04288',color:'white',width:'60%',borderRadius:'20px',height:'45px',fontWeight:'bold',"&:hover":{backgroundColor:"#ec407a"}}}  >Submit</Button>

        </Card>
        </Box>
    </div>
  )
}
