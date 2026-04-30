import QuotationContext from "../context/QuotationContext";
import axios from 'axios'
import { useState } from "react";
const QuotationProvider=({children})=>{
    const BaseUrl=import.meta.env.VITE_BASE_URL;
    const [myQuotations,setMyQuotations]=useState([])
    const [loading,setLoading]=useState(false)
    const requestQuotation=async({planId,vendorId,allocatedBudget})=>{
        try {
            const token=localStorage.getItem('myToken');
            const res=await axios.post(`${BaseUrl}/quotation/generate`,
                {planId,vendorId,allocatedBudget},
                {
                headers:{auth:token}
            })
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    
    const getMyQuotations=async()=>{
        try {
            setLoading(true)
            const token=localStorage.getItem('myToken')
            const res=await axios.get(`${BaseUrl}/quotation/myquotation`,{
                headers:{auth:token}
            })
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    const getAllQuotations=async()=>{
        try {
            const token=localStorage.getItem('adminToken')
            const res=await axios.get(`${BaseUrl}/quotation/allQuotations`,{
                headers:{auth:token}
            })
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    const updateQuotation=async(id,data)=>{
        try {
            const token=localStorage.getItem('adminToken')
            const res=await axios.put(`${BaseUrl}/quotation/updateQuotation/${id}`,data,{
                headers:{auth:token}
            })
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    

    const value={
        requestQuotation,
        getAllQuotations,
        getMyQuotations,
        updateQuotation
    }
    return(
        <QuotationContext.Provider value={value}>
            {children}
        </QuotationContext.Provider>
    )

}
export default QuotationProvider