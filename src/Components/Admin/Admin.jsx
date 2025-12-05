import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon,
  ExpandLess,
  ExpandMore,
  ArrowRight as ArrowRightIcon,
  ShoppingCart as ShoppingCartIcon,
  Category as CategoryIcon,
  Web as WebIcon,
  LocationOn as LocationIcon,
  Flag as FlagIcon,
  Public as PublicIcon,
} from "@mui/icons-material";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile";

const drawerWidth = 280;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Admin() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [itemsOpen, setItemsOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [websiteOpen, setWebsiteOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);

  const [stateOpen, setStateOpen] = useState(false); // ✅ New state for Manage State
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/admin", { replace: true });
    else setIsAuthenticated(true);
  }, [navigate]);

  const isActiveLink = (path) => location.pathname === path;

  const itemsSubmenu = [
    { to: "/category_list", label: "Category" },
    { to: "/item_department_list", label: "Department" },
    { to: "/item_key_fetures_list", label: "Key Features" },
    { to: "/item_type_list", label: "Type" },
    { to: "/item_diseases_list", label: "Diseases" },
    { to: "/item_category_banner_list", label: "Category Banner" },
    { to: "/item_diseases_banner_list", label: "Diseases Banner" },
    { to: "/item_certificate_list", label: "Certificate Type" },
    { to: "/item_lab_list", label: "Lab" },
    { to: "/item_list", label: "Items" },
    { to: "/discount", label: "Discount COUPON " },
  ];

  const orderSubmenu = [
    { to: "/order_list", label: "Order Master" },
    { to: "/order_report", label: "Order Report" },
  ];

  const websiteSubmenu = [
    { to: "/bannerlist", label: "Banner List" },
    { to: "/pagelist", label: "Page List" },
    { to: "/manage_testimonials", label: "Testimonials" },
    { to: "/manage_faqs", label: "FAQs" },
    
  ];

  // ✅ Proper State Management Submenu
  const stateSubmenu = [
    { to: "/manage_countries", label: "Countries", icon: <PublicIcon fontSize="small" /> },
    { to: "/manage_states", label: "States", icon: <FlagIcon fontSize="small" /> },
    { to: "/manage_cities", label: "Cities", icon: <LocationIcon fontSize="small" /> },
    { to: "/manage_areas", label: "Areas/Localities", icon: <LocationIcon fontSize="small" /> },
    { to: "/manage_pincodes", label: "Pincodes", icon: <LocationIcon fontSize="small" /> },
    { to: "/service_availability", label: "Service Availability", icon: <LocationIcon fontSize="small" /> },
  ];

  const blogSubmenu = [
  { to: "/manage_blogs", label: "All Blogs" },
  { to: "/manage_blogs", label: "Add Blog" },
  { to: "/blog_categories", label: "Blog Categories" },
  { to: "/blog_tags", label: "Tags" },
];


 const userListSubmenu = [
  { to: "/manage_users", label: "All Users", icon: <PublicIcon fontSize="small" /> },
  { to: "/add_user", label: "Add User", icon: <PublicIcon fontSize="small" /> },
];


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ bgcolor: "#8FCFD2", color: "black" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(true)}
              edge="start"
              sx={{ marginRight: 5, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>test</Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}></Typography>
            </Box>
          </Box>
          <Profile setIsAuthenticated={setIsAuthenticated} />
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ bgcolor: "#8FCFD2" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", flex: 1, ml: 4 }}>
           Wello Healthcare
          </Typography>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ bgcolor: "#8FCFD2", height: "100%" }}>
          {/* Dashboard */}
          <Link to="/admin" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem disablePadding>
              <ListItemButton sx={{ color: isActiveLink("/admin") ? "#1E9C9D" : "black" }}>
                <ListItemIcon sx={{ color: "inherit" }}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" primaryTypographyProps={{ fontSize: "13px", fontWeight: 500 }} />
              </ListItemButton>
            </ListItem>
          </Link>

          {/* Items */}
          <ListItem disablePadding onClick={() => setItemsOpen(!itemsOpen)}>
            <ListItemButton>
              <ListItemIcon><CategoryIcon /></ListItemIcon>
              <ListItemText primary="Items" primaryTypographyProps={{ fontSize: "13px", fontWeight: 500 }} />
              {itemsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={itemsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {itemsSubmenu.map(({ to, label }) => (
                <Link key={label} to={to} style={{ textDecoration: "none", color: "inherit" }}>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ pl: 4, py: 0.5, color: isActiveLink(to) ? "#1E9C9D" : "black" }}>
                      <ListItemIcon sx={{ minWidth: 32 }}><ArrowRightIcon fontSize="small" /></ListItemIcon>
                      <ListItemText primary={label} primaryTypographyProps={{ fontSize: "13px" }} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Collapse>

          {/* Orders */}
          <ListItem disablePadding onClick={() => setOrderOpen(!orderOpen)}>
            <ListItemButton>
              <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
              <ListItemText primary="Manage Orders" primaryTypographyProps={{ fontSize: "13px", fontWeight: 500 }} />
              {orderOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={orderOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {orderSubmenu.map(({ to, label }) => (
                <Link key={label} to={to} style={{ textDecoration: "none", color: "inherit" }}>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ pl: 4, py: 0.5, color: isActiveLink(to) ? "#1E9C9D" : "black" }}>
                      <ListItemIcon sx={{ minWidth: 32 }}><ArrowRightIcon fontSize="small" /></ListItemIcon>
                      <ListItemText primary={label} primaryTypographyProps={{ fontSize: "13px" }} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Collapse>

          {/* Website Management */}
          <ListItem disablePadding onClick={() => setWebsiteOpen(!websiteOpen)}>
            <ListItemButton>
              <ListItemIcon><WebIcon /></ListItemIcon>
              <ListItemText primary="Manage Website" primaryTypographyProps={{ fontSize: "13px", fontWeight: 500 }} />
              {websiteOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={websiteOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {websiteSubmenu.map(({ to, label }) => (
                <Link key={label} to={to} style={{ textDecoration: "none", color: "inherit" }}>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ pl: 4, py: 0.5, color: isActiveLink(to) ? "#1E9C9D" : "black" }}>
                      <ListItemIcon sx={{ minWidth: 32 }}><ArrowRightIcon fontSize="small" /></ListItemIcon>
                      <ListItemText primary={label} primaryTypographyProps={{ fontSize: "13px" }} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Collapse>

          <ListItem disablePadding onClick={() => setBlogOpen(!blogOpen)}>
  <ListItemButton>
    <ListItemIcon><WebIcon /></ListItemIcon> {/* You can replace WebIcon with a Blog icon if you want */}
    <ListItemText
      primary="Manage Blog"
      primaryTypographyProps={{ fontSize: "13px", fontWeight: 500 }}
    />
    {blogOpen ? <ExpandLess /> : <ExpandMore />}
  </ListItemButton>
</ListItem>
<Collapse in={blogOpen} timeout="auto" unmountOnExit>
  <List component="div" disablePadding>
    {blogSubmenu.map(({ to, label }) => (
      <Link key={label} to={to} style={{ textDecoration: "none", color: "inherit" }}>
        <ListItem disablePadding>
          <ListItemButton sx={{ pl: 4, py: 0.5, color: isActiveLink(to) ? "#1E9C9D" : "black" }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <ArrowRightIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={label}
              primaryTypographyProps={{ fontSize: "13px", fontWeight: isActiveLink(to) ? 600 : 400 }}
            />
          </ListItemButton>
        </ListItem>
      </Link>
    ))}
  </List>
</Collapse>

          {/* ✅ Manage State - Proper Implementation */}
          <ListItem disablePadding onClick={() => setStateOpen(!stateOpen)}>
            <ListItemButton>
              <ListItemIcon><LocationIcon /></ListItemIcon>
              <ListItemText primary="Manage Locations" primaryTypographyProps={{ fontSize: "13px", fontWeight: 500 }} />
              {stateOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={stateOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {stateSubmenu.map(({ to, label, icon }) => (
                <Link key={label} to={to} style={{ textDecoration: "none", color: "inherit" }}>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ pl: 4, py: 0.5, color: isActiveLink(to) ? "#1E9C9D" : "black" }}>
                      <ListItemIcon sx={{ minWidth: 32, color: "inherit" }}>
                        {icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={label} 
                        primaryTypographyProps={{ 
                          fontSize: "13px",
                          fontWeight: isActiveLink(to) ? 600 : 400
                        }} 
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Collapse>
          <ListItem disablePadding onClick={() => setStateOpen(!stateOpen)}>
            <ListItemButton>
              <ListItemIcon><LocationIcon /></ListItemIcon>
              <ListItemText primary="Manage Users" primaryTypographyProps={{ fontSize: "13px", fontWeight: 500 }} />
              {stateOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={stateOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {stateSubmenu.map(({ to, label, icon }) => (
                <Link key={label} to={to} style={{ textDecoration: "none", color: "inherit" }}>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ pl: 4, py: 0.5, color: isActiveLink(to) ? "#1E9C9D" : "black" }}>
                      <ListItemIcon sx={{ minWidth: 32, color: "inherit" }}>
                        {icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={label} 
                        primaryTypographyProps={{ 
                          fontSize: "13px",
                          fontWeight: isActiveLink(to) ? 600 : 400
                        }} 
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Collapse>
          
        </List>

        
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}