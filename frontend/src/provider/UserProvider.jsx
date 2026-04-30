import UserContext from "../context/UserContext"
import axios from "axios"
const UserProvider=({children})=>{
    const BaseUrl=import.meta.env.VITE_BASE_URL
    const handleLogin=async(data)=>{
        try {
            const res=await axios.post(`${BaseUrl}/auth/login`,data)
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    const handleRegister=async(data)=>{
        try {
            const res=await axios.post(`${BaseUrl}/auth/register`,data)
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    const resetPassword=async(data)=>{
        try {
            const res=await axios.post(`${BaseUrl}/auth/resetpassword`,data)
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    const getProfile=async()=>{
        try {
            const token=localStorage.getItem('myToken');
            const res=await axios.get(`${BaseUrl}/auth/profile`,{
                headers:{
                    auth:token
                }
            })
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    const value={
        handleLogin,
        handleRegister,
        resetPassword,
        getProfile
    }
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider