
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { use, useState } from 'react';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import { useContext } from 'react';

export default function Register() {
  const { handleRegister }=useContext(UserContext)
  const [form,setForm]=useState({
    username:'',
    useremail:'',
    userphone:'',
    userpassword:'',
    confirmpassword:''
  })
  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  const handleSubmit=async()=>{
    if(!form.useremail.includes('@')){
      alert('Enter a valid email')
    }
    if(form.userphone.length!==10){
      alert('Phone number must be 10 digits')
    }
     if(form.userpassword !== form.confirmpassword){
     alert("Passwords do not match");
     return;
   }
    try {
      const res=await handleRegister(form)
      if(!res){
        alert('Server Error')
        return
      }
      console.log(res.data)
      console.log(res.data.success)
      if(res.data.success){
        alert(res.data.message)
      }
      else{
        alert('Registration failed')
      }
      setForm({
        username:'',
        useremail:'',
        userphone:'',
        userpassword:'',
        confirmpassword:''
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Box sx={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'flex-start',backgroundColor:'#fff0f3',paddingTop:'100px',flexDirection:'column'}}>
        <Card sx={{border:'2px solid rgba(247, 107, 165, 0.93)',flexDirection: 'column', height:'650px',width:'440px',borderRadius:'5%',display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'rgba(255, 255, 255, 0.93)'}}>
            <Typography variant='h4' gutterBottom sx={{ color: '#e75480',fontWeight:'bold'}}>
            Sign Up
            </Typography>
            <TextField  onChange={handleChange} name='username' value={form.username} sx={{marginTop:'20px',width:'340px'}} id="outlined-basic" label="Enter Name" variant="outlined" />
            <TextField onChange={handleChange} name='useremail' value={form.useremail} sx={{marginTop:'20px',width:'340px'}} id="outlined-basic" label="Enter Email" variant="outlined"/>
            <TextField onChange={handleChange} name='userphone' value={form.userphone} sx={{marginTop:'20px',width:'340px'}} id="outlined-basic" type='number' label="Enter Phone" variant="outlined" />            
            <TextField  onChange={handleChange}name='userpassword' type="password" value={form.userpassword} sx={{marginTop:'20px',width:'340px'}} id="outlined-basic" label="Enter password" variant="outlined" />
            <TextField onChange={handleChange} name="confirmpassword" value={form.confirmpassword} type="password" sx={{marginTop:'32px',width:'340px'}} label="Confirm password" variant="outlined"/>


            <Button onClick={handleSubmit} sx={{marginTop:'40px',marginBottom:'20px',width:'340px',color:'white',backgroundColor:'#f04288'}}  size="large" variant="contained">Submit</Button>
            <Typography  sx={{ color: '#f06292',fontWeight:'bold'}}>Already have an account? <a  style={{color:'#c2185b'}} href='/login'>Login</a></Typography>
        </Card>
    </Box>
   
  );
}
