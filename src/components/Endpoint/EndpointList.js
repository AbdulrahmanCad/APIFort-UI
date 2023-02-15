import React from "react";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import {
  Button,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import { alpha } from "@mui/material/styles";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid #C7C7C1`,
  borderRadius: 8,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const ColorSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#FC574E",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track ": {
    backgroundColor: "#FC574E",
    ColorSwitch: "red",
  },
  "& .css-1dnugo-MuiSwitch-root .MuiSwitch-switchBase.Mui-checked": {
    color: "white",
  },
}));

function EndpointList() {
  const [checked, setChecked] = React.useState(false);

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box display="flex" width="100%" justifyContent="space-between">
            <Box display="flex" flexWrap="wrap" width="50%">
              <Typography
                variant="h6"
                component="h5"
                sx={{ width: "100%", color: "#112849" }}
              >
                Service Name Goes Here
              </Typography>
              <Typography variant="div" component="div"  sx={{ width: "100%", color: '#7E8282',  }}>
              <Box sx={{ fontWeight: 'light',}}>Service Name Goes Here</Box>
              </Typography>
            </Box>
            <Box mt={2} mr={2}>
              <Typography
                sx={{ width: "100%", color: "#7E8282", font: "14px" }}
              >
                3 endpoints
              </Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Card
            sx={{ minWidth: 275, border: 1, borderColor: "#C7C7C1", mb: 1.5 }}
          >
            <CardContent>
              <Box display="flex">
                <Grid sx={{ width: "15%" }}>
                  <Box
                    sx={{
                      bgcolor: "#E8F3EB",
                      color: "#0D9943",
                      fontWeight: "bold",
                      width: "8rem",
                      p: 1,
                      textAlign: "center",
                    }}
                  >
                    Post
                  </Box>
                </Grid>
                <Grid sx={{ width: "60%" }}>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <span style={{fontWeight: 100, color: '#7E8282'}}>
                      <span>0021 </span>
                      <span
                        style={{
                          marginLeft: "0.75rem",
                          marginRight: "0.75rem",
                          borderRightStyle: "solid",
                          borderRightColor: "#ebe9e1",
                        }}
                      ></span>
                      <span>Public Service</span>
                      <span
                        style={{
                          marginLeft: "0.75rem",
                          marginRight: "0.75rem",
                          borderRightStyle: "solid",
                          borderRightColor: "#ebe9e1",
                        }}
                      ></span>
                      <span>Offline Authentication</span>
                    </span>
                  </Typography>
                  <Typography sx={{color: '#112849'}}variant="body2">/admin-api/cache</Typography>
                  <Typography sx={{color: '#7E8282'}}variant="body2">
                    Api Description Goes Here
                  </Typography>
                  <Typography sx={{color: '#7E8282'}}variant="body2">Created on 2023</Typography>
                </Grid>
                <Grid sx={{ width: "5%", marginTop: 4 }}>
                  <FormGroup>
                    <FormControlLabel
                      value="start"
                      labelPlacement="start"
                      control={<ColorSwitch checked={checked} onChange={toggleChecked} size="" />}
                      label={checked ?"Enabled":"Disabled"}
                    />
                  </FormGroup>
                </Grid>
                <Grid sx={{ width: "20%" }}>
                  
                </Grid>
              </Box>
            </CardContent>
          </Card>
          <Card
            sx={{ minWidth: 275, border: 1, borderColor: "#C7C7C1", mb: 1.5 }}
          >
            <CardContent>
              <Box display="flex">
                <Grid sx={{ width: "15%" }}>
                  <Box
                    sx={{
                      bgcolor: "#E7EDFB",
                      color: "#124BD8",
                      fontWeight: "bold",
                      width: "8rem",
                      p: 1,
                      textAlign: "center",
                    }}
                  >
                    Get
                  </Box>
                </Grid>
                <Grid sx={{ width: "60%" }}>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <span style={{fontWeight: 100, color: '#7E8282'}}>
                      <span>0021 </span>
                      <span
                        style={{
                          marginLeft: "0.75rem",
                          marginRight: "0.75rem",
                          borderRightStyle: "solid",
                          borderRightColor: "#ebe9e1",
                        }}
                      ></span>
                      <span>Public Service</span>
                      <span
                        style={{
                          marginLeft: "0.75rem",
                          marginRight: "0.75rem",
                          borderRightStyle: "solid",
                          borderRightColor: "#ebe9e1",
                        }}
                      ></span>
                      <span>Offline Authentication</span>
                    </span>
                  </Typography>
                  <Typography sx={{color: '#112849'}}variant="body2">/admin-api/cache</Typography>
                  <Typography sx={{color: '#7E8282'}} variant="body2">
                    Api Description Goes Here
                  </Typography>
                  <Typography sx={{color: '#7E8282'}}variant="body2">Created on 2023</Typography>
                </Grid>
                <Grid sx={{ width: "5%", marginTop: 4 }}>
                  <FormGroup>
                    <FormControlLabel
                      value="start"
                      labelPlacement="start"
                      control={<ColorSwitch checked={checked} onChange={toggleChecked} size="" />}
                      label={checked ?"Enabled":"Disabled"}
                    />
                  </FormGroup>
                </Grid>
                <Grid sx={{ width: "20%" }}>
                  
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default EndpointList;
