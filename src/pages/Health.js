import * as React from "react";
import ProfileHealthList from "../components/Health/ProfileHealthList";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import InputBase from "@mui/material/InputBase";
import healthService from "../services/healthService";

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

const searchInputStyle = {
  ":hover": {
    bgcolor: "#ebe9e1",
    color: "#7e8282",
  },
  border: 1,
  borderColor: "#EBE9E1",
  borderRadius: 2,
}

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

export default function Profile() {
  const [search, setSearch] = React.useState("")
  const [loading, setLoading] = React.useState(true)
  const [mainStatus, setMainStatus] = React.useState("")
  const [queryList, setQueryList] = React.useState([])
  const [profiles, setProfiles] = React.useState([
    { id: 0, profile_name: "Loading..." },
  ]);

  React.useEffect(() => {
    setSearch("")
    updateData();
  }, []);
  
  async function updateData() {
    await healthService.getHealth().then((result) => {
      let mainStatus = result.data.status
      let data = result.data.checks;
      setMainStatus(mainStatus)
      setProfiles(data);
      setQueryList(data);
    }).finally((error) => {
      setLoading(false)
    });
  }

  function handleSearch(e){
    let q = e.target.value.trim()
    setSearch(q)
    let allData = queryList
    allData = allData.filter((item, i) => {
    return item.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    }  );
    setProfiles(allData)
    
  }

  return (
    <>
      <CssBaseline />
      <Box width={"100%"} my={4} ml={12} mr={4}>
        <Typography fontSize={24} fontWeight="bold" color="#A3A4A2"> Profiles Health Check </Typography>
        <Box display="grid" mt={4} mb={24} backgroundColor="white">
          <Box mx={2} mb={12}>
            <Box display="flex" justifyContent="space-between" my={4}>
              <Box>
                <Search sx={searchInputStyle} >
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    onChange={handleSearch}
                    value={search}
                    placeholder="Search Health…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              </Box>
            </Box>
            { loading ? 
            <Typography fontSize={12} fontWeight="bold"> Loading ... </Typography>
            :
            <ProfileHealthList mainStatus={mainStatus} profiles={profiles}/>
              }
          </Box>
        </Box>
      </Box>
    </>
  );
}