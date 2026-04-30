import { useState } from "react";
import PlanContext from "../context/PlanContext";
import axios from 'axios'
const PlanProvider=({children})=>{
    const [selectedPlan,setSelectedPlan]=useState(()=>{
        const saved=localStorage.getItem("selectedPlan");
        return saved? JSON.parse(saved) : null
    })
    const BaseUrl=import.meta.env.VITE_BASE_URL
    const createPlan=async(plan)=>{
        try {
            const token=localStorage.getItem('myToken')
            return await axios.post(`${BaseUrl}/plan/createPlan`,plan,{
            headers:{auth:token}
        })
        } catch (error) {
            console.log(error)
        }
       
    }
    const getPlan=async()=>{
        try {
            const token=localStorage.getItem('myToken')
            return await axios.get(`${BaseUrl}/plan/getPlan`,{
                headers:{
                    auth:token
                }
            })
            
        } catch (error) {
            console.log(error)
        }
        
    }
    const getVendors=async(location,service,budget)=>{
        try {
            const res=await axios.get(`${BaseUrl}/vendor/getVendor`,{
                params:{location,service,budget}
            })
            return res.data;
        } catch (error) {
            console.log(error)
        }
    }
    const value={
        createPlan,
        getPlan,
        getVendors,
        setSelectedPlan,
        selectedPlan
    }
    return(
        <PlanContext.Provider value={value}>
            {children}
        </PlanContext.Provider>
    )

}
export default PlanProvider