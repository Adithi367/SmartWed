import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/public/Login'
import Register from './pages/public/Register'
import Home from './pages/public/Home'
import About from './pages/public/About'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Navbar from './components/PublicNavbar'
import BudgetPlanner from './pages/user/BudgetPlanner'
import PlanResult from './pages/user/PlanResult'
import VendorDetails from './pages/user/VendorDetails'
import BookingPage from './pages/user/BookingPage'
import BookingStatus from './pages/user/BookingStatus'
import ViewBookings from './pages/admin/ViewBookings'
import Invoice from './pages/user/Invoice'
import Profile from './pages/user/Profile'
import GiveFeedback from './pages/user/GiveFeedback'
import AdminDashboard from './pages/admin/AdminDashboard'
import Footer from './components/Footer'
import ViewFeedback from './pages/admin/ViewFeedback'
import AfterLogin from './pages/public/AfterLogin'
import ResetPassword from './pages/public/ResetPassword'
import MyQuotations from './pages/user/MyQuotations'
import ViewQuotations from './pages/admin/ViewQuotations'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <div className='no-print'>
      <Navbar/>
    </div>

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} /> 
        <Route path='/register' element={<Register/>} /> 
        <Route path='/about' element={<About/>}/>
        <Route path='/budgetplanner' element={<BudgetPlanner/>}/>
        <Route path='/planresult' element={<PlanResult/>}/>
        <Route path='/vendor/:id' element={<VendorDetails/>} />
        <Route path='/book/:vendorId' element={<BookingPage/>}/>
        <Route path='/bookingStatus' element={<BookingStatus/>}/>
        <Route path='/admin/viewBookings' element={<ViewBookings/>}/>
        <Route path='/invoice' element={<Invoice/>}/>
        <Route path='/myprofile' element={<Profile/>}/>
        <Route path='/giveFeedback' element={<GiveFeedback/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin/viewFeedback' element={<ViewFeedback/>}/>
        <Route path='/afterlogin' element={<AfterLogin/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/myQuotations' element={<MyQuotations/>}/>
        <Route path='/admin/viewQuotations'element={<ViewQuotations/>}/>
      </Routes>  
      <Footer/>
    </BrowserRouter>
  )
}

export default App
