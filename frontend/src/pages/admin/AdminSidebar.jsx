// // pages/admin/AdminLayout.jsx
// import * as React from "react";
// import PropTypes from "prop-types";

// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import StarIcon from "@mui/icons-material/Star";
// import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
// import LogoutIcon from "@mui/icons-material/Logout";

// import { createTheme } from "@mui/material/styles";
// import { AppProvider } from "@toolpad/core/AppProvider";
// import { DashboardLayout } from "@toolpad/core/DashboardLayout";
// import { useDemoRouter } from "@toolpad/core/internal";

// import AdminDashboard from "./AdminDashboard";
// import ViewBookings from "./ViewBookings";
// import ViewFeedback from "./ViewFeedback";
// import ViewQuotations from "./ViewQuotations";

// const NAVIGATION = [
//   { kind: "header", title: "Admin Menu" },
//   { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },
//   { segment: "viewBookings", title: "Bookings", icon: <ShoppingCartIcon /> },
//   { segment: "viewQuotations", title: "Quotations", icon: <RequestQuoteIcon /> },
//   { segment: "viewFeedback", title: "Feedback", icon: <StarIcon /> },
//   { kind: "divider" },
//   { segment: "logout", title: "Logout", icon: <LogoutIcon /> },
// ];

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#e91e63",
//     },
//   },
// });

// function PageContent({ pathname }) {
//   if (pathname === "/dashboard") return <AdminDashboard />;
//   if (pathname === "/viewBookings") return <ViewBookings />;
//   if (pathname === "/viewQuotations") return <ViewQuotations />;
//   if (pathname === "/viewFeedback") return <ViewFeedback />;

//   if (pathname === "/logout") {
//     localStorage.removeItem("adminToken");
//     window.location.href = "/login";
//     return null;
//   }

//   return <AdminDashboard />;
// }

// PageContent.propTypes = {
//   pathname: PropTypes.string.isRequired,
// };

// export default function AdminLayout(props) {
//   const { window } = props;

//   const router = useDemoRouter("/dashboard");
//   const demoWindow = window !== undefined ? window() : undefined;

//   return (
//     <AppProvider navigation={NAVIGATION} router={router} theme={theme} window={demoWindow}>
//       <DashboardLayout>
//         <PageContent pathname={router.pathname} />
//       </DashboardLayout>
//     </AppProvider>
//   );
// }

// AdminLayout.propTypes = {
//   window: PropTypes.func,
// };



import * as React from "react";
import PropTypes from "prop-types";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import LogoutIcon from "@mui/icons-material/Logout";

import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import logo from '../../assets/logo.png'
import AdminDashboard from "./AdminDashboard";
import ViewBookings from "./ViewBookings";
import ViewFeedback from "./ViewFeedback";
import ViewQuotations from "./ViewQuotations";

const NAVIGATION = [
  { kind: "header", title: "Admin Panel" },

  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },
  { segment: "bookings", title: "View Bookings", icon: <ShoppingCartIcon /> },
  { segment: "feedback", title: "View Feedback", icon: <StarIcon /> },

  { kind: "divider" },

  { segment: "logout", title: "Logout", icon: <LogoutIcon /> },
];

const theme = createTheme({
  palette: {
    primary: {
     // main: "#e91e63",
     main:'#5f18c2'
    },
  },
});

function PageContent({ pathname }) {
  if (pathname === "/dashboard") return <AdminDashboard />;
  if (pathname === "/bookings") return <ViewBookings />;
  if (pathname === "/feedback") return <ViewFeedback />;

  if (pathname === "/logout") {
    localStorage.removeItem("adminToken");
    window.location.href = "/login";
    return null;
  }

  return <AdminDashboard />;
}

PageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default function AdminLayout(props) {
  const { window } = props;

  const router = useDemoRouter("/dashboard");
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={theme} window={demoWindow} 
      branding={{
        title:"SmartWed Admin",
        logo:(<img src={logo} alt="SmartWed Admin Logo" />)
      }}>
      <DashboardLayout>
        <PageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

AdminLayout.propTypes = {
  window: PropTypes.func,
};