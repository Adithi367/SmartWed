import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import UserProvider from './provider/UserProvider.jsx'
import App from './App.jsx'
import PlanProvider from './provider/PlanProvider.jsx'
import BookingProvider from './provider/BookingProvider.jsx'
import AdminProvider from './provider/AdminProvider.jsx'
import QuotationProvider from './provider/QuotationProvider.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <PlanProvider>
        <BookingProvider>
          <AdminProvider>
            <QuotationProvider>
              <App />
            </QuotationProvider>     
          </AdminProvider>
        </BookingProvider>
      </PlanProvider>
    </UserProvider>    
  </StrictMode>,
)
