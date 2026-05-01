import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import StarIcon from '@mui/icons-material/Star';
import LogoutIcon from '@mui/icons-material/Logout';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import BookingStatus from '../user/BookingStatus'
import Invoice from '../user/Invoice'
import Profile from '../user/Profile'
import GiveFeedback from '../user/GiveFeedback'
import MyQuotations from '../user/MyQuotations'
import Home from '../public/Home'
import About from '../public/About'
import AfterLogin from '../public/AfterLogin';
import logo from '../../assets/logo.png'
const NAVIGATION = [
  {
    kind: 'header',
    title: 'Customer Menu',
  },
  {
    segment: "home",
    title: "Home Page",
    icon: <DashboardIcon />,
  },
  {
    segment: "about",
    title: "About Page",
    icon: <DashboardIcon />,
},

  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'bookings',
    title: 'My Bookings',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'quotations',
    title: 'My Quotations',
    icon: <RequestQuoteIcon />,
  },
  {
    segment:'invoice',
    title:'My Invoice',
    icon:<ReceiptLongIcon />
  },
  {
    segment:'feedback',
    title:'Give Feedback',
    icon:<StarIcon />
  },
  {
    kind: 'divider',
  },
  
  
     
  {
    segment: 'logout',
    title: 'Logout',
    icon: <LogoutIcon />,
  },
];
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#f04288", // SmartWed pink
        },
        secondary: {
          main: "#c2185b",
        },
        background: {
          default: "#fff0f5",
          paper: "#ffffff",
        },
      },
    },
    dark: false,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// const demoTheme = createTheme({
//   cssVariables: {
//     colorSchemeSelector: 'data-toolpad-color-scheme',
//   },
//   colorSchemes: { light: true, dark: false },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

function PageContent({ pathname }) {
    if(pathname==="/dashboard") return <Profile/>
    if(pathname==="/bookings") return <BookingStatus/>
    if(pathname==="/invoice") return <Invoice/>
    if(pathname==="/feedback") return <GiveFeedback/>
    if(pathname==="/quotations") return <MyQuotations/>
    if(pathname==='/home') return <Home/>
    if(pathname==='/about') return <About/>
    //if(pathname==='/Explore') return <AfterLogin/>
    if(pathname==="/logout") {
      localStorage.removeItem("myToken");
      window.location.href="/login"
      return null;
    }
    return <Profile/>
}
  PageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default function UserDashboardLayout(props) {
  const { window } = props;

  const router = useDemoRouter("/dashboard");

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        title:"SmartWed",
        logo:(
          <img src={logo} alt="SmartWed Logo" />
        )
      }}
    >
      <DashboardLayout  >
        <PageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

UserDashboardLayout.propTypes = {
  window: PropTypes.func,
};





// import * as React from "react";
// import PropTypes from "prop-types";
// import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
// import { createTheme } from "@mui/material/styles";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
// import StarIcon from "@mui/icons-material/Star";
// import LogoutIcon from "@mui/icons-material/Logout";
// import LayersIcon from "@mui/icons-material/Layers";

// import { AppProvider } from "@toolpad/core/AppProvider";
// import { DashboardLayout } from "@toolpad/core/DashboardLayout";
// import { useDemoRouter } from "@toolpad/core/internal";

// import BookingStatus from "../user/BookingStatus";
// import Invoice from "../user/Invoice";
// import Profile from "../user/Profile";
// import GiveFeedback from "../user/GiveFeedback";
// import MyQuotations from "../user/MyQuotations";
// import Home from "../public/Home";
// import About from "../public/About";
// import AfterLogin from "../public/AfterLogin";
// import BudgetPlanner from "../user/BudgetPlanner";

// const NAVIGATION = [
//   {
//     kind: "header",
//     title: "Customer Menu",
//   },
//   {
//     segment:"budgetplanner",
//     title:"Budget Planner",
//     icon:<LayersIcon/>
//   },
//   {
//     segment: "explore",
//     title: "Explore Vendors",
//     icon: <LayersIcon />,
//   },
//   {
//     segment: "dashboard",
//     title: "My Profile",
//     icon: <DashboardIcon />,
//   },
//   {
//     segment: "bookings",
//     title: "My Bookings",
//     icon: <ShoppingCartIcon />,
//   },
//   {
//     segment: "quotations",
//     title: "My Quotations",
//     icon: <RequestQuoteIcon />,
//   },
//   {
//     segment: "invoice",
//     title: "My Invoice",
//     icon: <ReceiptLongIcon />,
//   },
//   {
//     segment: "feedback",
//     title: "Give Feedback",
//     icon: <StarIcon />,
//   },
//   {
//     kind: "divider",
//   },
//   {
//     segment: "home",
//     title: "Home Page",
//     icon: <DashboardIcon />,
//   },
//   {
//     segment: "about",
//     title: "About Page",
//     icon: <DashboardIcon />,
//   },

//   {
//     kind: "divider",
//   },
//   {
//     segment: "logout",
//     title: "Logout",
//     icon: <LogoutIcon />,
//   },
// ];

// const demoTheme = createTheme({
//   palette: {
//     primary: {
//       main: "#f04288",
//     },
//   },
//   typography: {
//     fontFamily: "Poppins, Arial, sans-serif",
//   },
// });

// function PageContent({ pathname }) {
//   if (pathname === "/dashboard") return <Profile />;
//   if (pathname === "/bookings") return <BookingStatus />;
//   if (pathname === "/invoice") return <Invoice />;
//   if (pathname === "/feedback") return <GiveFeedback />;
//   if (pathname === "/quotations") return <MyQuotations />;
//   if (pathname === "/explore") return <AfterLogin />;
//   if (pathname === "/home") return <Home />;
//   if (pathname === "/about") return <About />;
//   if(pathname==='/budgetplanner') return <BudgetPlanner/>

//   if (pathname === "/logout") {
//     localStorage.removeItem("myToken");
//     window.location.href = "/login";
//     return null;
//   }

//   return <AfterLogin />;
// }

// PageContent.propTypes = {
//   pathname: PropTypes.string.isRequired,
// };

// export default function UserDashboardLayout(props) {
//   const { window } = props;
//   const router = useDemoRouter("/explore");

//   const demoWindow = window !== undefined ? window() : undefined;

//   return (
//     <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme} window={demoWindow}>
//       <DashboardLayout
//         sx={{
//           "& .MuiDrawer-paper": {
//             background: "linear-gradient(180deg, #fff0f5, #ffffff)",
//           },
//           "& .MuiToolbar-root": {
//             background: "linear-gradient(135deg, #f04288, #c2185b)",
//             color: "white",
//           },
//           "& main": {
//             background: "linear-gradient(180deg, #fff0f5, #ffffff)",
//             minHeight: "100vh",
//             overflowY: "auto",
//           },
//         }}
//       >
//         <PageContent pathname={router.pathname} />
//       </DashboardLayout>
//     </AppProvider>
//   );
// }

// UserDashboardLayout.propTypes = {
//   window: PropTypes.func,
// };







// import * as React from "react";
// import PropTypes from "prop-types";
// import { createTheme } from "@mui/material/styles";

// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
// import StarIcon from "@mui/icons-material/Star";
// import LogoutIcon from "@mui/icons-material/Logout";
// import LayersIcon from "@mui/icons-material/Layers";
// import RequestQuoteIcon from "@mui/icons-material/RequestQuote";

// import { AppProvider } from "@toolpad/core/AppProvider";
// import { DashboardLayout } from "@toolpad/core/DashboardLayout";

// import { useLocation } from "react-router-dom";

// import BookingStatus from "../user/BookingStatus";
// import Invoice from "../user/Invoice";
// import Profile from "../user/Profile";
// import GiveFeedback from "../user/GiveFeedback";
// import MyQuotations from "../user/MyQuotations";


// const NAVIGATION = [
//   { kind: "header", title: "Customer Menu" },

 
//   {
//     segment: "user/dashboard",
//     title: "My Profile",
//     icon: <DashboardIcon />,
//   },
//   {
//     segment: "user/bookings",
//     title: "My Bookings",
//     icon: <ShoppingCartIcon />,
//   },
//   {
//     segment: "user/quotations",
//     title: "My Quotations",
//     icon: <RequestQuoteIcon />,
//   },
//   {
//     segment: "user/invoice",
//     title: "My Invoice",
//     icon: <ReceiptLongIcon />,
//   },
//   {
//     segment: "user/feedback",
//     title: "Give Feedback",
//     icon: <StarIcon />,
//   },

  
 

//   { kind: "divider" },

//   {
//     segment: "logout",
//     title: "Logout",
//     icon: <LogoutIcon />,
//   },
// ];

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#f04288",
//     },
//   },
//   typography: {
//     fontFamily: "Poppins, Arial, sans-serif",
//   },
// });

// function PageContent() {
//   const location = useLocation();
//   const pathname = location.pathname;

//   if (pathname === "/user/dashboard") return <Profile />;
//   if (pathname === "/user/bookings") return <BookingStatus />;
//   if (pathname === "/user/invoice") return <Invoice />;
//   if (pathname === "/user/feedback") return <GiveFeedback />;
//   if (pathname === "/user/quotations") return <MyQuotations />;
  

//   if (pathname === "/logout") {
//     localStorage.removeItem("myToken");
//     window.location.href = "/login";
//     return null;
//   }

//   return <AfterLogin />;
// }

// export default function UserDashboardLayout(props) {
//   const { window } = props;

//   const location = useLocation();

//   const demoWindow = window !== undefined ? window() : undefined;

//   return (
//     <AppProvider
//       navigation={NAVIGATION}
//       router={{ pathname: location.pathname }}
//       theme={theme}
//       window={demoWindow}
//     >
//       <DashboardLayout
//         sx={{
//           "& .MuiDrawer-paper": {
//             background: "linear-gradient(180deg, #fff0f5, #ffffff)",
//           },
//           "& .MuiToolbar-root": {
//             background: "linear-gradient(135deg, #f04288, #c2185b)",
//             color: "white",
//           },
//           "& main": {
//             background: "linear-gradient(180deg, #fff0f5, #ffffff)",
//             minHeight: "100vh",
//             overflowY: "auto",
//           },
//         }}
//       >
//         <PageContent />
//       </DashboardLayout>
//     </AppProvider>
//   );
// }

// UserDashboardLayout.propTypes = {
//   window: PropTypes.func,
// };