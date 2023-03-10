import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import profileIcon from "../../assets/icons/profileIcon.jpg";

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.easeInOut,
    duration: '0.3s',
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.easeInOut,
    duration: '0.3s',
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


export default function MiniDrawer() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerClose = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box display="flex" sx={{ backgroundColor: "#052056" }}>
      <CssBaseline />
      <div onMouseOver={() => setOpen(true)} onMouseOut={() => setOpen(false)}>
        <Drawer
          onMouseOver={handleDrawerClose}
          PaperProps={{
            sx: {
              backgroundColor: "#052056",
              width: 500,
            },
          }}
          variant="permanent"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}></IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {["Profiles"].map((text, index) => (
              <ListItem
                style={{ backgroundColor: "#FC574E" }}
                key={text}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <img src={profileIcon} alt="icon"/>
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={{ color: "white", opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    </Box>
  );
}
