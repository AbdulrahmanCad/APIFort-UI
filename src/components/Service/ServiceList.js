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
import Divider from "@mui/material/Divider";

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

function ServiceList({endpoints}) {
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
          </Box>
        </AccordionSummary>
        <AccordionDetails>
        <Divider light />
        <Box my={2}>
        <Typography
                variant="subtitle1"
                component="h5"
                sx={{ width: "100%" }}
              >
                Service path/host: {endpoint.host}
              </Typography>
              <Typography
                variant="subtitle1"
                component="h5"
                sx={{ width: "100%" }}
              >
               Service context: {endpoint.context}
              </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
      </Box>
    ))}
    </>
  );
}

export default ServiceList;