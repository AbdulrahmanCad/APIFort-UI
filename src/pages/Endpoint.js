import * as React from "react";
import EndpointList from "../components/Endpoint/EndpointList";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Typography} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import InputBase from "@mui/material/InputBase";
import EndpointModal from "../components/modal/EndpointModal";
import { useNavigate, useParams } from "react-router-dom";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/system';
import EndpointFilter from "../components/Endpoint/filter/EndpointFilter"
import { createTheme, ThemeProvider} from '@mui/material/styles';
import endpointService from "../services/endpointService";
import ServiceList from "../components/Service/ServiceList";
import ServiceModal from "../components/modal/ServiceModal";

const theme = createTheme({
  palette: {
    primary: {
      main: '#FC574E'
    }
  },
  typography: { fontFamily: ["Poppins"].join(",") },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(.25,.1,.36,1.18)',
    },
  },
});

const backarrowStyle = {
  color: "#A3A4A2",
  fontSize: 16,
  minWidth: '3rem',
  minHeight: '3rem',
  mr: "1rem",
  animationTimeline: 5000,
     "&:hover": {
        opacity: 1,
        backgroundColor: "white",
        boxShadow: 4,
      },
}

const searchInputStyle = {
  ":hover": {
    bgcolor: "#ebe9e1",
    color: "#7e8282",
  },
  border: 1,
  borderColor: "#EBE9E1",
  borderRadius: 2,
  marginRight: "1rem"
}

const newEndpointBtnStyle = {
  ":hover": {
    bgcolor: "#CA463E",
    color: "white",
  },
  color: "white",
  textTransform: 'none',
  backgroundColor: "#FC574E",
}

const SingleTab = styled(Tab)({
  "& .MuiTab-notchedTab ": {
    color: "#EBE9E1",
  },
  "& .Mui-selected": {
    color: "#EBE9E1",
  },
  "&:hover": {
    border: "#D4D2CB",
  },
  "&:focus": {
    color: "#FC574E",
  },"&:selected": {
    color: "#FC574E",
  },
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Endpoint() {
  const [modal, setModal] = React.useState(false)
  const [refresh, setRefresh] = React.useState(false)
  const [serviceModal, setServiceModal] = React.useState(false)
  const [profileName, setProfileName] = React.useState("")
  const [endpointsSearch, setEndpointsSearch] = React.useState("")
  const [servicesSearch, setServicesSearch] = React.useState("")
  const [queryList, setQueryList] = React.useState([])
  const [endpoints, setEndpoints] = React.useState([
    { id: 0, name: "Loading..." },
  ]);
  const [services, setServices] = React.useState([
    { id: 0, name: "Loading..." },
  ]);
  const navigate = useNavigate()
  const params = useParams()

  const [value, setValue] = React.useState('1');

  const [checked, setChecked] = React.useState([false, false, false, false]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    setProfileName(params.id)
    setServicesSearch("")
    setEndpointsSearch("")
    updateData();
  }, [modal,serviceModal,refresh]);
  
  async function updateData() {
    await endpointService.getService(params.id).then((result) => {
      let data = result.data;
      setServices(data)
      setEndpoints(data)
      setQueryList(data)
    })
  }

  async function handleAccessUpdate(data){
    console.log(data)
    let access = !data.is_public_service
    const newData = {
      endpoint_uuid: data.endpoint_uuid,
      service_uuid: data.service_uuid,
      title: data.title,
      description: data.description,
      endpoint_path: data.endpoint_path,
      method_type: data.method_type,
      auth_claim_value: data.auth_claim_value,
      offline_authentication: data.offline_authentication,
      version_number: data.version_number,
      is_public_service: access
    }
   await endpointService.updateAccess(params.id, newData).then((res) => {
    if(res)
    updateData()
   }).catch((err) => console.log(err))
  }

  function handleServicesSearch(e){
    let q = e.target.value
    setServicesSearch(q)
    let allData = queryList
    allData = allData.filter((item) => {
    return item.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    setServices(allData)
  }

  function handleEndpointsSearch(e){
    let q = e.target.value
    setEndpointsSearch(q)
    let allData = queryList
    allData = allData.filter((item) => {
    return item.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    setEndpoints(allData)
  }

  return (
    <>
      <CssBaseline />
      <Box width={"100%"} my={4} ml={12} mr={4}>
        <Typography fontSize={24} fontWeight="bold" color="#A3A4A2"> 
        <Button
            onClick={() => navigate("/profiles")}
            sx={backarrowStyle}
          >
            <ArrowBackIcon />
          </Button>
          {profileName}
         </Typography>
        <Box display="grid" mt={4} mb={24} backgroundColor="white">
        <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ px: 2, marginTop: 1,  borderBottom: 1, borderColor: 'divider' }}>
          <ThemeProvider theme={theme} >
          <TabList TabIndicatorProps={{style: {color: "#FC574E", background:"#FC574E"}}} onChange={handleChange} aria-label="lab API tabs example">
            <SingleTab style={{ textTransform: "none" }} label="Services" value="1" />
            <SingleTab style={{ textTransform: "none" }} label="Endpoints" value="2" />
          </TabList>
          </ThemeProvider>
        </Box>
        <TabPanel sx={{ px: 2, pt: 0, pb: 12}} value="1">
        <Box my={3}>
            <Box display="flex" justifyContent="space-between">
              <Box display="flex">
                <Search
                  sx={{
                    ":hover": {
                      bgcolor: "#ebe9e1",
                      color: "#7e8282",
                    },
                    border: 1,
                    borderColor: "#EBE9E1",
                    borderRadius: 2,
                    marginRight: "1rem"
                  }}
                >
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    onChange={handleServicesSearch}
                    value={servicesSearch}
                    placeholder="Search Services..."
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
                  
              </Box>
              <Box>
                <Button
                onClick={() => setServiceModal(true)}
                  sx={{
                    ":hover": {
                      bgcolor: "#CA463E",
                      color: "white",
                    },
                    color: "white",
                    textTransform: 'none',
                    backgroundColor: "#FC574E",
                  }}
                  variant="contained"
                >
                  New Servcie
                </Button>
              </Box>
            </Box>
          </Box>
          <ServiceList setRefresh={setRefresh} services={services}/>
        </TabPanel>
        <TabPanel sx={{ px: 2, pt: 0, pb: 12}} value="2">
        <Box my={3}>
            <Box display="flex" justifyContent="space-between">
              <Box display="flex">
                <Search
                  sx={searchInputStyle}
                >
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    onChange={handleEndpointsSearch}
                    value={endpointsSearch}
                    placeholder="Search Endpoints..."
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
                <EndpointFilter checked={checked} setChecked={setChecked} />
              </Box>
              <Box>
                <Button
                onClick={() => setModal(true)}
                  sx={newEndpointBtnStyle}
                  variant="contained"
                >
                  New Endpoint
                </Button>
              </Box>
            </Box>
          </Box>
          <EndpointList setRefresh={setRefresh} checkedMethods={checked} endpoints={endpoints} handleAccessUpdate={handleAccessUpdate}/>
        </TabPanel>
      </TabContext> 
    </Box>        
        </Box>
      </Box>
      <EndpointModal setModal={setModal} modal={modal} />
      <ServiceModal setServiceModal={setServiceModal} serviceModal={serviceModal} />

    </>
  );
}
