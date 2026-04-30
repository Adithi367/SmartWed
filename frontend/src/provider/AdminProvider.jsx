import AdminContext from "../context/AdminContext";
import axios from "axios";
const AdminProvider=({children})=>{
    const BaseUrl=import.meta.env.VITE_BASE_URL
    const getDashboard=async()=>{
        try {
            const token=localStorage.getItem('adminToken')

            if(!token)
                return null;
            const res=await axios.get(`${BaseUrl}/admin/dashboard`,{
                headers:{
                    auth:token
                }
            })
            return res
        } catch (error) {
            console.log(error)
        }
    }
    const getAdminBookings=async(statusFilter,startDate,endDate)=>{
        try {
            const token = localStorage.getItem("adminToken");

            let url = `${BaseUrl}/admin/bookings?`;

            if (statusFilter) url += `status=${statusFilter}&`;
            if (startDate) url += `startDate=${startDate}&`;
            if (endDate) url += `endDate=${endDate}&`;

            const res = await axios.get(url, {
                headers: { auth: token },
            });
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    const updateBookingStatus=async(bookingId,status)=>{
        try {
            const token=localStorage.getItem('adminToken')
            const res=await axios.put(`${BaseUrl}/booking/updateBookings/${bookingId}`,
                {status},
            {
                headers:{auth:token}
            })
            return res
        } catch (error) {
            console.log(error)
        }
    }
    const updateBookingCharges=async(bookingId,discount,extraCharges)=>{
        try {
             const token=localStorage.getItem('adminToken');
            const res=await axios.put(`${BaseUrl}/booking/updateCharges/${bookingId}`,
                {
                    discount,
                    extraCharges
                },{
                headers:{auth:token}
                }
            )
            return res
        } catch (error) {
            console.log(error)
        }
       
    }
    const getFeedback=async()=>{
        try {
            const token=localStorage.getItem('adminToken')
            const res=await axios.get(`${BaseUrl}/admin/allFeedback`,
                {
                    headers:{auth:token}
                }
                
            )
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    const value={
        getDashboard,
        getAdminBookings,
        updateBookingStatus,
        updateBookingCharges,
        getFeedback
    }
    return(
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminProvider