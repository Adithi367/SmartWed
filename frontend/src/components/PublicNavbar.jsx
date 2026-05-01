import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const userToken = localStorage.getItem("myToken");
  const adminToken = localStorage.getItem("adminToken");
  const isAdmin=!!adminToken
  const isLoggedIn = userToken || adminToken;

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    localStorage.removeItem("myToken");
    localStorage.removeItem("adminToken");
    navigate("/login");
    window.location.reload();
  };

  return (
    <AppBar sx={{ backgroundColor: isAdmin ? "#6a1b9a" :'rgba(240, 102, 102, 0.93)', }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <img src={logo} alt="Logo" style={{ height: "55px", marginRight: "10px" }} />

          {/* Title Desktop */}
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 3,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            SmartWed
          </Typography>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem onClick={() => { navigate("/"); handleCloseNavMenu(); }}>
                Home
              </MenuItem>

              <MenuItem onClick={() => { navigate("/about"); handleCloseNavMenu(); }}>
                About
              </MenuItem>

              {!isLoggedIn && (
                [
                  <MenuItem onClick={() => { navigate("/login"); handleCloseNavMenu(); }}>
                    Login
                  </MenuItem>,

                  <MenuItem onClick={() => { navigate("/register"); handleCloseNavMenu(); }}>
                    Register
                  </MenuItem>
                ]
                
              )}

              {/* {isLoggedIn && (
                <MenuItem onClick={() => { navigate("/myprofile"); handleCloseNavMenu(); }}>
                  My Profile
                </MenuItem>
              )} */}
              {userToken && (
                <MenuItem onClick={()=>{navigate('/user/dashboard'); handleCloseNavMenu();}}>
                  My Profile
                </MenuItem>
              )}

            </Menu>
          </Box>

          {/* Title Mobile */}
          <Typography
            variant="h6"
            noWrap
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".2rem",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            SmartWed
          </Typography>

          {/* Desktop Navbar Links */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button sx={{ color: "white", fontWeight: "bold" }} onClick={() => navigate("/")}>
              Home
            </Button>

            <Button sx={{ color: "white", fontWeight: "bold" }} onClick={() => navigate("/about")}>
              About
            </Button>

            {!isLoggedIn && (
              <>
                <Button sx={{ color: "white", fontWeight: "bold" }} onClick={() => navigate("/login")}>
                  Login
                </Button>

                <Button sx={{ color: "white", fontWeight: "bold" }} onClick={() => navigate("/register")}>
                  Register
                </Button>
              </>
            )}

            {/* {isLoggedIn && (
              <Button sx={{ color: "white", fontWeight: "bold" }} onClick={() => navigate("/myprofile")}>
                My Profile
              </Button>
            )} */}
            {userToken && (
              <Button sx={{color:'white',fontWeight:'bold'}} onClick={()=>{navigate('/user/dashboard')}}>
                My Profile
              </Button>
            )}
          </Box>

          {/* Avatar only if logged in */}
          {isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Account">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: "#1976d2" }} />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                {userToken &&(
                  <MenuItem onClick={() => { navigate("/myprofile"); handleCloseUserMenu(); }}>
                    Profile
                  </MenuItem>

                )}
               
                {adminToken && (
                  <MenuItem onClick={() => { navigate("/admin/dashboard"); handleCloseUserMenu(); }}>
                    Admin Dashboard
                  </MenuItem>
                )}

                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
