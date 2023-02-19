import React from "react";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import Switch from "@mui/material/Switch";

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
    // ColorSwitch: "red",
  },
  "& .css-1dnugo-MuiSwitch-root .MuiSwitch-switchBase.Mui-checked": {
    color: "white",
  },
}));

function EndpointList({endpoints}) {
  const [checked, setChecked] = React.useState(false);

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  return (
    <>
    {endpoints.map((endpoint, i) => ( 
      <Box key={i} mb={2}>
      <Accordion >
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
                {endpoint.name}
              </Typography>
              <Typography variant="div" component="div"  sx={{ width: "100%", color: '#7E8282',  }}>
              <Box sx={{ fontWeight: 'light',}}>{endpoint.description}</Box>
              </Typography>
            </Box>
            <Box mt={2} mr={2}>
              <Typography
                sx={{ width: "100%", color: "#7E8282", font: "14px" }}
              >
               {endpoint.endpoints && endpoint.endpoints.length} endpoints
              </Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {endpoint.endpoints && endpoint.endpoints.map((api, i) => (
          <Card
            key={i}
            sx={{ minWidth: 275, border: 1, borderColor: "#C7C7C1", mb: 1.5 }}
          >
            <CardContent>
              <Box display="flex">
                <Grid sx={{ width: "15%" }}>
                  { api.method === "Post" &&
                  <Box
                    sx={{
                      border: '1px solid #C8E7D3',
                      bgcolor: "#E8F3EB",
                      color: "#0D9943",
                      fontWeight: "bold",
                      width: "8rem",
                      p: 1,
                      textAlign: "center",
                    }}
                  >
                    {api.method}
                  </Box>
                  }
                  { api.method === "Get" &&
                    <Box
                    sx={{
                      border: '1px solid #D0DBF7',
                      bgcolor: "#E7EDFB",
                      color: "#124BD8",
                      fontWeight: "bold",
                      width: "8rem",
                      p: 1,
                      textAlign: "center",
                    }}
                  >
                    {api.method}
                  </Box>
                    }
                    { api.method === "Put" &&
                    <Box
                    sx={{
                      border: '1px solid #F7E5D8',
                      background: '#F9EFE7 0% 0% no-repeat padding-box',
                      color: "#DE6918",
                      fontWeight: "bold",
                      width: "8rem",
                      p: 1,
                      textAlign: "center",
                    }}
                  >
                    {api.method}
                  </Box>
                    }
                     { api.method === "Delete" &&
                    <Box
                    sx={{
                       border: '1px solid #F54949',
                      bgcolor: "#FFCCCB",
                      color: "#FF0000",
                      fontWeight: "bold",
                      width: "8rem",
                      p: 1,
                      textAlign: "center",
                    }}
                  >
                    {api.method}
                  </Box>
                    }
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
                  <Typography sx={{color: '#112849'}}variant="body2">{api.path}</Typography>
                  <Typography sx={{color: '#7E8282'}}variant="body2">
                    {api.api_description}
                  </Typography>
                  <Typography sx={{color: '#7E8282'}}variant="body2">Created on 2023</Typography>
                </Grid>
                <Grid sx={{ width: "5%", marginTop: 4 }}>
                  <FormGroup>
                    <FormControlLabel
                      value="start"
                      labelPlacement="start"
                      control={<ColorSwitch checked={checked} onChange={toggleChecked} size="" />}
                      sx={{color: checked ? `#FC574E`:``}}
                      label={checked ?"Enabled":"Disabled"}
                    />
                  </FormGroup>
                </Grid>
                <Grid sx={{ width: "20%" }}>
                  
                </Grid>
              </Box>
            </CardContent>
          </Card>
          ))}
        </AccordionDetails>
      </Accordion>
      </Box>
    ))}
    </>
  );
}

export default EndpointList;
