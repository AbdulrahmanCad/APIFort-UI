import React from "react";
import { useParams } from "react-router-dom";
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
  Switch,
  Button
} from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import HttpsIcon from '@mui/icons-material/Https';

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
  },
  "& .css-1dnugo-MuiSwitch-root .MuiSwitch-switchBase.Mui-checked": {
    color: "white",
  },
}));

function EndpointList({endpoints, handleAccessUpdate, checkedMethods}) {

  const [loading, setLoading] = React.useState(true)
  const [empty, setEmpty] = React.useState(false)
  const [filteredEndpoints, setFilteredEndpoints] = React.useState([])

  const endpointsData = endpoints;
  
  React.useEffect(() => {
    setLoading(true)
    setEmpty(false)
    let EndpointArray = []
    let filteredArray = []
    let countItems = false
    if(!checkedMethods[0] && !checkedMethods[1] && !checkedMethods[2] && !checkedMethods[3]){
      setFilteredEndpoints(endpointsData)
      setLoading(false)
    } else {
      endpointsData.map((endpoint, i) => {
        endpoint.endpoints.map((api) =>{
          if(api.method_type === "POST" && checkedMethods[0]){
            filteredArray.push(api)
          } 
          if(api.method_type === "GET" && checkedMethods[1]){
            filteredArray.push(api)
          } 
          if(api.method_type === "PUT" && checkedMethods[2]){
            filteredArray.push(api)
          } 
          if(api.method_type === "DELETE" && checkedMethods[3]){
            filteredArray.push(api)
          } 
        })
        if(filteredArray.length !== 0){
          countItems = true
        }
        EndpointArray.push({
          title: endpoint.title,
          description: endpoint.description,
          endpoints: filteredArray
        })
        filteredArray = []
      }
      )
      setFilteredEndpoints(EndpointArray)
      setLoading(false)
      setEmpty(!countItems)
    }
  },[endpoints, checkedMethods])
  
  if(loading){
    return (
      <div>
        Loading...
        </div>
    )
  } else {

  return (
    <>
     {endpointsData.length === 0 || empty ? 
        <Box sx={{ display: 'flex', justifyContent: 'center'}} mt={12}>
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
    {filteredEndpoints && filteredEndpoints.map((endpoint, serviceIndex) => ( 
      <Box key={serviceIndex} mb={2}>
    {filteredEndpoints[serviceIndex].endpoints.length ? 
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
                {endpoint.title}
              </Typography>
              <Typography variant="div" component="div" sx={{ width: "100%", color: '#7E8282',  }}>
              <Box sx={{ fontWeight: 'light',}}>{endpoint.description}</Box>
              </Typography>
            </Box>
            <Box mt={2} mr={2}>
              <Typography
                sx={{ width: "100%", color: "#7E8282", font: "14px" }}
              >
               {filteredEndpoints[serviceIndex].endpoints && filteredEndpoints[serviceIndex].endpoints.length} endpoints 
              </Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {filteredEndpoints[serviceIndex].endpoints && filteredEndpoints[serviceIndex].endpoints.map((api, i) => (
            <div key={i}>
          <Card
            sx={{ minWidth: 275, border: 1, borderColor: "#C7C7C1", mb: 1.5 }}
          > 
            <CardContent>
              <Grid container>
                <Grid item xs={1}>
                  { api.method_type === "POST" &&
                  <Box
                    sx={{
                      border: '1px solid #C8E7D3',
                      bgcolor: "#E8F3EB",
                      color: "#0D9943",
                      fontWeight: "bold",
                      width: "90%",
                      p: 1,
                      textAlign: "center",
                    }}
                  >
                    {api.method_type}
                  </Box>
                  }
                  { api.method_type === "GET" &&
                    <Box
                    sx={{
                      border: '1px solid #D0DBF7',
                      bgcolor: "#E7EDFB",
                      color: "#124BD8",
                      fontWeight: "bold",
                      width: "90%",
                      p: 1,
                      textAlign: "center",
                    }}
                  >
                    {api.method_type}
                  </Box>
                    }
                    { api.method_type === "PUT" &&
                    <Box
                    sx={{
                      border: '1px solid #F7E5D8',
                      background: '#F9EFE7 0% 0% no-repeat padding-box',
                      color: "#DE6918",
                      fontWeight: "bold",
                      width: "90%",
                      p: 1,
                      textAlign: "center",
                    }}
                  >
                    {api.method_type}
                  </Box>
                    }
                     { api.method_type === "DELETE" && 
                    <Box
                    sx={{
                       border: '1px solid #F54949',
                      bgcolor: "#FFCCCB",
                      color: "#FF0000",
                      fontWeight: "bold",
                      width: "90%",
                      p: 1,
                      textAlign: "center",
                    }}
                  >
                    {api.method_type}
                  </Box>
                    }
                </Grid>
                <Grid item xs={8}>
                  <Typography color="text.secondary">
                    <span style={{ fontWeight: 100, color: '#7E8282' }}>
                      <span>{api.version_number} </span>
                      <span
                        style={{
                          marginLeft: "0.75rem",
                          marginRight: "0.75rem",
                          borderRightStyle: "solid",
                          borderRightColor: "#ebe9e1",
                        }}
                      ></span>
                      <span style={{display: "inline-flex"}}>{api.is_public_service ? 
                      <>
                      Public Service {' '}
                      <LockOpenIcon fontSize="small" />
                      </>
                      : 
                      <>
                      Private Service {' '}
                      <HttpsIcon fontSize="small" />
                      </>
                      } </span>
                      <span
                        style={{
                          marginLeft: "0.75rem",
                          marginRight: "0.75rem",
                          borderRightStyle: "solid",
                          borderRightColor: "#ebe9e1",
                        }}
                      ></span>
                      <span>{api.offline_authentication ? 'Offline': 'Online'} Authentication</span>
                    </span>
                  </Typography>
                  <Typography sx={{color: '#112849'}}variant="body2">{api.endpoint_path}</Typography>
                  <Typography sx={{color: '#7E8282'}}variant="body2">
                    {api.description}
                  </Typography>
                  <Typography sx={{color: '#7E8282'}}variant="body2">Created at {api.created_date}</Typography>
                </Grid>
                <Grid item xs={2} sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                    }}>
                  <FormGroup>
                    <FormControlLabel
                      value="start"
                      labelPlacement="start"
                      control={<ColorSwitch checked={api.is_public_service} 
                      onChange={() => handleAccessUpdate(api)} 
                      size="" />}
                      sx={{color: api.is_public_service ? `#FC574E`:``}}
                      label={api.is_public_service ?"Public":"Private"}
                    />
                  </FormGroup>
                </Grid>
                
              </Grid>
             
            </CardContent>
          </Card>
          </div>
          ))}
        </AccordionDetails>
      </Accordion>
      : 
      <></>
      }
      </Box>
    ))}
    </>
  )
    };
}

export default EndpointList;
