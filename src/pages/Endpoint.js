import * as React from "react";
import EndpointList from "../components/Endpoint/EndpointList";
import { alpha } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import { Button, Grid, Typography, Card, CardContent, FormGroup, FormControlLabel } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import InputBase from "@mui/material/InputBase";
import EndpointModal from "../components/modal/EndpointModal";
import endpointService from "../services/endpointService";
import { useNavigate, useParams } from "react-router-dom";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/system';
import EndpointFilter from "../components/Endpoint/filter/EndpointFilter"
import { createTheme, ThemeProvider} from '@mui/material/styles';

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

const SingleTab = styled(Tab)({
  "& .MuiTab-notchedTab ": {
    color: "#EBE9E1",
  },
  "& .Mui-selected": {
    color: "#EBE9E1",
  },
  "& .MuiTab-root.Mui-selected": {
    // color: 'red'
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
    // vertical padding + font size from searchIcon
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
  const [profileName, setProfileName] = React.useState("Profile Name")
  const [search, setSearch] = React.useState("")
  const [queryList, setQueryList] = React.useState([])
  const [endpoints, setEndpoints] = React.useState([
    { id: 0, name: "Loading..." },
  ]);
  const navigate = useNavigate()

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const params = useParams()

  React.useEffect(() => {
    setSearch("")
    updateData();
  }, [modal]);
  
  async function updateData() {
    await endpointService.getAllData().then((result) => {
      let data = result.data;
      let profilesData = [];
      for (const key in data) {
        profilesData.push(data[key]);
      }
      console.log(profilesData)
      setEndpoints(profilesData);
      setQueryList(profilesData);
    });
  }

  function handleSearch(e){
    let q = e.target.value.trim()
    setSearch(q)
    let allData = queryList
    allData = allData.filter((item) => {
    return item.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    }  );
    setEndpoints(allData)
  }

  return (
    <>
      <CssBaseline />
      <Box width={"100%"} my={4} ml={12} mr={4}>
        <Typography fontSize={24} fontWeight="bold" color="#A3A4A2"> 
        <Button
            onClick={() => navigate("/profiles")}
            sx={{
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
            }}
          >
            <ArrowBackIcon />
          </Button>
        Profile Name </Typography>
        <Box display="grid" mt={4} mb={24} backgroundColor="white">
            
        <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ px: 2, marginTop: 1,  borderBottom: 1, borderColor: 'divider' }}>
          <ThemeProvider theme={theme} >
          <TabList TabIndicatorProps={{style: {color: "#FC574E", background:"#FC574E"}}} onChange={handleChange} aria-label="lab API tabs example">
            <SingleTab style={{ textTransform: "none" }} label="Endpoints" value="1" />
            <SingleTab style={{ textTransform: "none" }} label="Services" value="2" />
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
                    onChange={handleSearch}
                    value={search}
                    placeholder="Search Endpoints..."
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
                <EndpointFilter />
              </Box>
              <Box>
                <Button
                onClick={() => setModal(true)}
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
                  New Endpoint
                </Button>
              </Box>
            </Box>
          </Box>
          <EndpointList endpoints={endpoints}/>
        </TabPanel>
        <TabPanel value="2">Services</TabPanel>
      </TabContext>
    </Box>        
        </Box>
      </Box>
      <EndpointModal setModal={setModal} modal={modal} />

    </>
  );
}
