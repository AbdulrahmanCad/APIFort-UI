import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Grid, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import profileService from "../../services/profileService";
import DeleteIcon from "@mui/icons-material/Delete";
import SyncIcon from "@mui/icons-material/Sync";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const listStyle = {
  width: "100%",
  bgcolor: "background.paper",
};

const listItemStyle = {
  ":hover": {
    bgcolor: "#f4f3ee",
    cursor: "pointer",
  },
  border: "1px solid #c7c7c1",
  borderRadius: 2,
};

const closeIconStyle = {
  display: "flex",
  justifyContent: "end",
  color: "#A3A4A2",
  minWidth: "2rem",
  minHeight: "2.5rem",
  animationTimeline: 5000,
  "&:hover": {
    opacity: 1,
    boxShadow: 4,
  },
};

export default function ProfileList({ profiles, setRefresh }) {
  const navigate = useNavigate();

  function handleProfileClick(id) {
    navigate("/profile/" + id);
  }

  function handleDelete(id) {
    profileService.deleteProfile(id).then((result) => {
      setRefresh(id);
    });
  }

  function handleSync(id) {
    profileService.syncProfile(id).then((result) => {
      setRefresh(id);
    });
  }

  return (
    <List sx={listStyle}>
      {profiles.length === 0 ? (
        <Box display="flex" justifyContent="center" mt={12}>
          <Typography variant="h6" component="h5" sx={{ color: "#112849" }}>
            No data found!
          </Typography>
        </Box>
      ) : (
        ""
      )}
      <Grid container spacing={2}>
        {profiles.map((profile, i) => (
          <Grid key={i} item xs={12} md={6} lg={4}>
            <ListItem sx={listItemStyle}>
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: "#7968d3" }}>
                  <Box color="white">
                    {profile.realm &&
                      profile.realm.substring(0, 1).toUpperCase()}
                  </Box>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                onClick={() => handleProfileClick(profile.realm)}
                primary={profile.realm}
                secondary={
                  <span>
                    <span>{profile.total_services} Services </span>
                    <span
                      style={{
                        marginLeft: "0.75rem",
                        marginRight: "0.75rem",
                        borderRightStyle: "solid",
                        borderRightColor: "#ebe9e1",
                      }}
                    ></span>
                    <span>{profile.total_endpoints} Endpoints</span>
                  </span>
                }
              />
              <Button onClick={() => handleSync(profile.realm)} sx={closeIconStyle}>
              <SyncIcon style={{ color: "blue" }} fontSize="small" />
              </Button>
              <Button
                onClick={() => handleDelete(profile.client_profile_uuid)}
                sx={closeIconStyle}
              >
                <DeleteIcon style={{ color: "red" }} fontSize="small" />
              </Button>
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </List>
  );
}
