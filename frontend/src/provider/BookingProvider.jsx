import BookingContext from "../context/BookingContext";
import axios from 'axios'
const BookingProvider=({children})=>{
    const BaseUrl=import.meta.env.VITE_BASE_URL;
    
    const getVendorById=async(id)=>{
        try {
            const res=await axios.get(`${BaseUrl}/vendor/getVendorById/${id}`)
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    const createBooking=async(vendorId,data)=>{

        try {
            const token=localStorage.getItem('myToken')

            const res=await axios.post(`${BaseUrl}/booking/createBooking/${vendorId}`,data,
                {
                    headers:{ auth:token}
                }
            ) 
            return res;
        } catch (error) {
            console.log(error)
            
        }
    }
    const checkServiceStatus=async(service)=>{
        try {
            const token=localStorage.getItem('myToken')
            const res=await axios.get(`${BaseUrl}/booking/checkServiceBookingStatus/${service}?t=${Date.now()}`,{
                headers:{auth:token}
            })
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    const checkStatus=async(id)=>{
        try {
            const token=localStorage.getItem('myToken')

            const res=await axios.get(`${BaseUrl}/booking/checkStatus/${id}?t=${Date.now()}`,{
                headers:{
                    auth:token
                }
            })
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    const getBookings=async()=>{
        try {
            const token=localStorage.getItem('myToken')

            const res=await axios.get(`${BaseUrl}/booking/getBookings`,{
                headers: {auth:token}
            })
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    const addReview=async(vendorId,rating,comment)=>{
        try {
            const token=localStorage.getItem('myToken')

            const res=await axios.post(`${BaseUrl}/vendor/addReview/${vendorId}`,
                { rating, comment },
                { headers: { auth: token } }

            )
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    const generateBill=async()=>{
        try {
            const token=localStorage.getItem('myToken')

            const res=await axios.get(`${BaseUrl}/booking/generateBill`,{
                headers:{auth:token}
            })
            return res
        } catch (error) {
            console.log(error)
        }
    }
    const value={
        getVendorById,
        createBooking,
        checkStatus,
        getBookings,
        addReview,
        checkServiceStatus,
        generateBill
    }
    return(
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    )
}
export default BookingProvider