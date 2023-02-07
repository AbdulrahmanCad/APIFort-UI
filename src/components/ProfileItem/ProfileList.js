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

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      <Grid container spacing={2}>
        {profiles.map((profile) => (
          <Grid key={profile.id} item xs={12} md={6} lg={4}>
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
                secondary="3 Services"
              />          
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </List>
  );
}
