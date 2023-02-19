import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Grid, Typography, Box } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { useNavigate } from "react-router-dom";

export default function ProfileList({profiles}) {
const navigate = useNavigate()

  function handleProfileClick(id) {
    navigate("/profile/"+id)
  }

  let secondaryProfileText = <span>
    <span>3 Services </span>
    <span style={{marginLeft: "0.75rem", marginRight: "0.75rem", borderRightStyle: "solid", borderRightColor: "#ebe9e1"}}></span>
    <span>3 Endpoints</span>
    </span>
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      <Grid container spacing={2}>
        {profiles.map((profile, i) => (
          <Grid key={i} item xs={12} md={6} lg={4}>
            <ListItem sx={{
               ":hover": {
                bgcolor: "#f4f3ee",
                cursor: "pointer"
              },
              border: "1px solid #c7c7c1", borderRadius: 2 }}
              onClick={() => handleProfileClick(1)}
              >
              <ListItemAvatar>
                <Avatar sx={{backgroundColor: "#7968d3"}}>
                  <Box color="white">{profile.profile_name && profile.profile_name.substring(0, 1)}</Box>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={profile.profile_name}
                secondary={secondaryProfileText}
              />          
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </List>
  );
}
