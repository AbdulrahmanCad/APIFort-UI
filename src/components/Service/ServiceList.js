import React from "react";
import { useParams } from "react-router-dom";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import { Box, Typography, Divider, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import endpointService from "../../services/endpointService";

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

function ServiceList({ services, setRefresh }) {
  const params = useParams();

  function handleDelete(id) {
    endpointService.deleteService(params.id, id).then((result) => {
      setRefresh(id);
    });
  }
  return (
    <>
      {services.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center" }} mt={12}>
          <Typography variant="h6" component="h5" sx={{ color: "#112849" }}>
            No data found!
          </Typography>
        </Box>
      ) : (
        ""
      )}
      {services &&
        services.map((service, i) => (
          <Box key={i} mb={2}>
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
                      {service.title}
                    </Typography>
                    <Typography
                      variant="div"
                      component="div"
                      sx={{ width: "100%", color: "#7E8282" }}
                    >
                      <Box sx={{ fontWeight: "light" }}>
                        {service.description}
                      </Box>
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
                    Service path/host: {service.service_path}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="h5"
                    sx={{ width: "100%" }}
                  >
                    Service context: {service.context_name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "right",
                      justifyContent: "right",
                    }}
                  >
                    <Button
                      onClick={() => handleDelete(service.context_name)}
                      sx={closeIconStyle}
                    >
                      <DeleteIcon style={{ color: "red" }} fontSize="small" />
                    </Button>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
    </>
  );
}

export default ServiceList;
