
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';
import UserContext from '../../context/UserContext';
export default function BasicCard() {
    const navigate=useNavigate();
    const [form,setForm]=useState({
        
        useremail:'',
       
        userpassword:''
    });
    const { handleLogin }=useContext(UserContext)
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
        console.log(e.target.value)
    }
    const handleSubmit=async()=>{
        try {
            const res=await handleLogin(form)
            if(!res){
                alert("Password Mismatch");
                return;
            }

            if(res.data.success){
                alert('Login successful')
                if(res.data.user.role==="admin"){
                    localStorage.setItem('adminToken',res.data.token)
                    navigate('/admin/dashboard')
                }
                else{
                    localStorage.setItem('myToken',res.data.token)
                    navigate('/afterlogin')
                    //navigate('/user/dashboard')
                }
            }
            else{
                alert('Login failed')
            }
            setForm({            
                useremail:'', 
                userpassword:''
            })

        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Box sx={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'flex-start',backgroundColor:'#fff0f3',paddingTop:'100px',flexDirection:'column'}}>
        <Card sx={{border:'2px solid rgba(247, 107, 165, 0.93)',flexDirection: 'column', height:'500px',width:'400px',borderRadius:'5%',display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'rgba(255, 255, 255, 0.93)'}}>
            <Typography variant='h4' gutterBottom sx={{ color: '#e75480',fontWeight:'bold'}}>
            Login
            </Typography>
            <TextField name='useremail' onChange={handleChange} value={form.useremail} sx={{margin:'20px',width:'300px'}} id="outlined-basic" label="Enter Username" variant='outlined' placeholder="Username" />
            <TextField name='userpassword'onChange={handleChange} value={form.userpassword} type="password" sx={{marginTop:'20px',width:'300px'}} id="outlined-basic" label="Enter password" variant="outlined" />
            <Typography sx={{color:'#f06292',marginTop:'20px'}}>Forgot password?{" "}<span style={{color:'#c2185b',cursor:'pointer'}} onClick={()=>{navigate('/reset-password')}}>Reset</span></Typography>
            <Button onClick={handleSubmit} sx={{width:'300px',marginTop:'50px',marginBottom:'20px',color:'white',backgroundColor:'#f04288'}}  size="large" >Submit</Button>
            <Typography  sx={{ color: '#f06292'}}>Don't have an account? <a style={{color:'#c2185b'}} href='/register'>Sign up</a></Typography>
        </Card>
    </Box>
   
  );
}
