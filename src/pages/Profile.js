import * as React from "react";
import ProfileList from "../components/Profile/ProfileList";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import InputBase from "@mui/material/InputBase";
import Modal from "../components/modal/ProfileModal";
import profileService from "../services/profileService";

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

const newProfileBtnStyle = {
  ":hover": {
    bgcolor: "#CA463E",
    color: "white",
  },
  color: "white",
  textTransform: 'none',
  backgroundColor: "#FC574E",
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
  const [modal, setModal] = React.useState(false)
  const [refresh, setRefresh] = React.useState("")
  const [search, setSearch] = React.useState("")
  const [queryList, setQueryList] = React.useState([])
  const [profiles, setProfiles] = React.useState([
    { id: 0, profile_name: "Loading..." },
  ]);

  React.useEffect(() => {
    setSearch("")
    updateData();
  }, [modal, refresh]);
  
  async function updateData() {
    await profileService.getAllData().then((result) => {
      let data = result.data.data;
      setProfiles(data);
      setQueryList(data);
    });
  }

  function handleSearch(e){
    let q = e.target.value.trim()
    setSearch(q)
    let allData = queryList
    allData = allData.filter((item, i) => {
    return item.realm.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    }  );
    setProfiles(allData)
  }

  return (
    <>
      <CssBaseline />
      <Box width={"100%"} my={4} ml={12} mr={4}>
        <Typography fontSize={24} fontWeight="bold" color="#A3A4A2"> Profiles </Typography>
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
                    placeholder="Search Profiles…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              </Box>
              <Box>
                <Button
                  onClick={() => setModal(true)}
                  sx={newProfileBtnStyle}
                  variant="contained"
                >
                  New Profile
                </Button>
              </Box>
            </Box>
            <ProfileList setRefresh={setRefresh} profiles={profiles}/>
          </Box>
        </Box>
      </Box>
      <Modal setModal={setModal} modal={modal} />
    </>
  );
}