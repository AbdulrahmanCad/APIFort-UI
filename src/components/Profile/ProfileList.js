import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Grid, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const listStyle = {
  width: "100%",
  bgcolor: "background.paper",
}

const listItemStyle = {
  ":hover": {
    bgcolor: "#f4f3ee",
    cursor: "pointer"
  },
  border: "1px solid #c7c7c1", borderRadius: 2
}

export default function ProfileList({profiles}) {
const navigate = useNavigate()

  function handleProfileClick(id) {
    navigate("/profile/"+id)
  }

  return (
    <List
      sx={listStyle}
    >
       {profiles.length === 0 ? 
        <Box display="flex" justifyContent="center" mt={12}>
         <Typography
         variant="h6"
         component="h5"
         sx={{ color: "#112849" }}
       >
        No data found!
       </Typography>
       </Box>
        :
        ''}
      <Grid container spacing={2}>
        {profiles.map((profile, i) => (
          <Grid key={i} item xs={12} md={6} lg={4}>
            <ListItem sx={listItemStyle}
              onClick={() => handleProfileClick(profile.realm)}
              >
              <ListItemAvatar>
                <Avatar sx={{backgroundColor: "#7968d3"}}>
                  <Box color="white">{profile.realm && profile.realm.substring(0, 1).toUpperCase()}</Box>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={profile.realm}
                secondary={<span>
                  <span>{profile.total_services} Services </span>
                  <span style={{marginLeft: "0.75rem", marginRight: "0.75rem", borderRightStyle: "solid", borderRightColor: "#ebe9e1"}}></span>
                  <span>{profile.total_endpoints} Endpoints</span>
                  </span>}
              />          
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </List>
  );
}
