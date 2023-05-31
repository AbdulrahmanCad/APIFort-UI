import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Grid, Typography, Box } from "@mui/material";
import ArrowUpIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownIcon from "@mui/icons-material/ArrowDownward";

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
  display: "inline-flex",
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

export default function ProfileList({ mainStatus, profiles }) {

  return (
    <List sx={listStyle}>
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} md={6} lg={4}>
          <ListItem sx={listItemStyle}>
            <ListItemText primary="Service Health" />
            <span sx={closeIconStyle}>
              {mainStatus}
              {mainStatus === "UP" ? (
                <ArrowUpIcon style={{ color: "green" }} fontSize="small" />
              ) : (
                <ArrowDownIcon style={{ color: "red" }} fontSize="small" />
              )}
            </span>
          </ListItem>
        </Grid>
      </Grid>

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
              <ListItemText primary={profile.name} />
              <span sx={closeIconStyle}>
                {profile.status}
                {profile.status === "UP" ? (
                  <ArrowUpIcon style={{ color: "green" }} fontSize="small" />
                ) : (
                  <ArrowDownIcon style={{ color: "red" }} fontSize="small" />
                )}
              </span>
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </List>
  );
}
