import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, FormControlLabel } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import profileService from "../../services/profileService";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HelpIcon from "@mui/icons-material/Help";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import SelectMethod from "./SelectMethod";
import SelectService from "./SelectService";
import Switch from "@mui/material/Switch";

const style = {
  position: "absolute",
  top: "60%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "110vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  bgcolor: "#FBFBF9",
  border: "1px solid #EBE9E1",
  borderRadius: "12px",
  boxShadow: 2,
  my: 16,

  

  "@media (min-width: 576px)": {
    width: "26rem",
  },

  "@media (min-width: 780px)": {
    width: "32rem",
  },

  "@media (min-width: 1280px)": {
    width: "42rem",
  },
};

const contant = {
  display: "flex",
  flexDirection: "column",
  px: 6,
  // overflow: "hidden",
  // overflow: "scroll", 
};

const cloes = {
  px: 1,
  pt: 2,
  display: "flex",
  justifyContent: "end",
};

const SecondModalStyle = {
  position: "absolute",
  top: "40%",
  left: "50%",
  display: "flex",
  flexDirection: "column",
  transform: "translate(-50%, -50%)",
  width: "37%",
  height: "22rem",
  bgcolor: "#FBFBF9",
  border: "1px solid #EBE9E1",
  borderRadius: "12px",
  boxShadow: 2,
  px: 8,
  pt: 6,
};

const ValidationTextField = styled(OutlinedInput)({
  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
    borderColor: "#EBE9E1",
    borderWidth: 2,
  },
  "& input:valid + fieldset ": {
    borderColor: "#EBE9E1",
    borderWidth: 2,
  },
  "& input:invalid + fieldset": {
    borderColor: "blue",
    borderWidth: 2,
  },
  "&:hover": {
    backgroundColor: "#EBE9E1",
    border: "#D4D2CB",
  },
  "&:hover .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
    border: " 1px solid #D4D2CB",
  },
});

const sxStyle = {
  height: 40,
  backgroundColor: "#F4F3EE",
  width: "100%",
};
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

export default function BasicModal({ modal, setModal }) {
  const [error, setError] = React.useState("");
  const [done, setDone] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [scroll, setScroll] = React.useState(false);
  const [accessibility, setAccessibility] = React.useState(false);
  const [publicService, setPublicService] = React.useState(false);

  const toggleOffline = () => {
    setChecked((prev) => !prev);
  };
  const toggleAccessibility = () => {
    setAccessibility((prev) => !prev);
  };
  const togglePublic = () => {
    setPublicService((prev) => !prev)
  }

  const [formData, setFormData] = React.useState({
    api_description: "",
    path: "",
    created_at: "",
    method: "",
    isAccess:false,
    isOffline: false,
    isPublic: false
  });

  const {
    api_description,
    path,
    created_at,
    method,
    isAccess,
    isOffline,
    isPublic
  } = formData;

  // const [validateForm, setValidateForm] = React.useState({
  //   profile_name_valid: false,
  //   api_key_valid: false,
  //   auth_calim_valid: false,
  //   realm_key_valid: false,
  // });

  // const {
  //   profile_name_valid,
  //   api_key_valid,
  //   auth_calim_valid,
  //   realm_key_valid,
  // } = validateForm;

  const onChange = (e) => {
    setError("");
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleAddProfile() {
    if (
      path === "" ||
      api_description === "" 
    ) {
      setError("Please fill out all fields!");
      return;
    }
    setDone(true);

    const data = {
      path
    };
    await profileService.postProfile(data).then((result) => {
      console.log(result);
      setDone(true);
    });
  }

  function handleCloseModal() {
    setModal(false);
  }

  return (
    <>
      {!done ? (
        <div 
        style={{ overflow: "scroll" }}>
          <Modal
            open={modal}
            onClose={() => {
              handleCloseModal();
              setScroll(false)
            }}
        onScroll={() => setScroll(true)}

            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflow: 'scroll', marginTop: scroll ? `` : `10rem` }}
          >
            <Box sx={style}>
              <Box sx={cloes}>
                <Button
                  onClick={() => handleCloseModal()}
                  sx={{
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
                  }}
                >
                  <CloseIcon />
                </Button>
              </Box>
              <Box sx={contant}>
                <Typography
                  component={'span'}
                  id="modal-modal-title"
                  variant="h5"
                  fontFamily={"normal normal 600 22px Poppins"}
                  sx={{
                    color: "#112849",
                  }}
                >
                  Create new endpoint
                </Typography>
                <FormControl
                  variant="outlined"
                  sx={{my: 4, color: "#112849" }}
                >
                  <Typography 
                  component={'span'}
                  >
                    Service{" "}
                    <Tooltip
                      placement="top"
                      describeChild
                      title="The method of your profile"
                    >
                      <HelpIcon fontSize="inherit" />
                    </Tooltip>
                    <Grid 
                  component={'span'}
                  item xs={12}>
                      <SelectService />
                    </Grid>
                  </Typography>
                </FormControl>

                <FormControl
                  variant="outlined"
                  sx={{my: 1, color: "#112849" }}
                >
                  <Typography
                  component={'span'}
                  >
                    Name{" "}
                    <Tooltip
                      placement="top"
                      describeChild
                      title="The main name of your profile"
                    >
                      <HelpIcon fontSize="inherit" />
                    </Tooltip>
                    <Grid 
                  component={'span'}
                  item xs={12}>
                      <ValidationTextField
                        // error={profile_name_valid}
                        sx={sxStyle}
                        name="profile_name"
                        onChange={onChange}
                        placeholder="Enter name"
                      />
                    </Grid>
                  </Typography>
                </FormControl>
                <FormControl
                  variant="outlined"
                  sx={{my: 1, color: "#112849" }}
                >
                  <Typography
                  component={'span'}
                  >
                    Description{" "}
                    <Tooltip
                      placement="top"
                      describeChild
                      title="The description of your  "
                    >
                      <HelpIcon fontSize="inherit" />
                    </Tooltip>
                    <Grid 
                  component={'span'}
                  item xs={12}>
                      <ValidationTextField
                        // error={profile_name_valid}
                        sx={sxStyle}
                        name="profile_name"
                        onChange={onChange}
                        placeholder="Enter description"
                      />
                    </Grid>
                  </Typography>
                </FormControl>
                <FormControl
                  variant="outlined"
                  sx={{my: 1, color: "#112849" }}
                >
                  <Typography 
                  component={'span'}
                  >
                    Method{" "}
                    <Tooltip
                      placement="top"
                      describeChild
                      title="The method of your profile"
                    >
                      <HelpIcon fontSize="inherit" />
                    </Tooltip>
                    <Grid 
                  component={'span'}
                  item xs={12}>
                      <SelectMethod />
                    </Grid>
                  </Typography>
                </FormControl>
                <FormControl
                  variant="outlined"
                  sx={{my: 1.5, color: "#112849" }}
                >
                  <Typography
                  component={'span'}
                  >
                    Path/URL{" "}
                    <Tooltip
                      placement="top"
                      describeChild
                      title="The path of your profile"
                    >
                      <HelpIcon fontSize="inherit" />
                    </Tooltip>
                    <Grid 
                  component={'span'}
                  item xs={12}>
                      <ValidationTextField
                        // error={profile_name_valid}
                        sx={sxStyle}
                        name="profile_name"
                        onChange={onChange}
                        placeholder="Enter Path"
                      />
                    </Grid>
                  </Typography>
                </FormControl>
                <FormControl
                  variant="outlined"
                  sx={{my: 1, color: "#112849" }}
                >
                  <Typography
                  component={'span'}
                  >
                    Version Number{" "}
                    <Tooltip
                      placement="top"
                      describeChild
                      title="The version number of your profile"
                    >
                      <HelpIcon fontSize="inherit" />
                    </Tooltip>
                    <Grid 
                  component={'span'}
                  item xs={12}>
                      <ValidationTextField
                        // error={profile_name_valid}
                        sx={sxStyle}
                        name="profile_name"
                        onChange={onChange}
                        placeholder="Enter number"
                      />
                    </Grid>
                  </Typography>
                </FormControl>
                <FormControl
                  variant="outlined"
                  sx={{my: 1.5, color: "#112849" }}
                >
                  <Typography
                  component={'span'}
                  >
                    Auth Claim Value{" "}
                    <Tooltip
                      placement="top"
                      describeChild
                      title="Tooltip text goes here."
                    >
                      <HelpIcon fontSize="inherit" />
                    </Tooltip>
                    <Grid 
                  component={'span'}
                  item xs={12}>
                      <ValidationTextField
                        // error={profile_name_valid}
                        sx={sxStyle}
                        name="profile_name"
                        onChange={onChange}
                        placeholder="Enter value"
                      />
                    </Grid>
                  </Typography>
                </FormControl>

                <FormControl
                  variant="outlined"
                  sx={{my: 1, color: "#112849" }}
                >
                  <Typography
                  component={'span'}
                  >
                    Accessibility{" "}
                    <Tooltip
                      placement="top"
                      describeChild
                      title="Tooltip text goes here."
                    >
                      <HelpIcon fontSize="inherit" />
                    </Tooltip>
                    <br />
                    <FormControlLabel
                      value="start"
                      labelPlacement="start"
                      control={
                        <ColorSwitch
                          checked={accessibility}
                          onChange={toggleAccessibility}
                          size=""
                        />
                      }
                      sx={{ color: accessibility ? `#FC574E` : ``, m: 0 }}
                      label={accessibility ? "Enabled" : "Disabled"}
                    />
                  </Typography>
                </FormControl>
                <FormControl
                  variant="outlined"
                  sx={{my: 1, color: "#112849" }}
                >
                  <Typography>
                    Offline Authentication{" "}
                    <Tooltip
                      placement="top"
                      describeChild
                      title="Tooltip text goes here."
                    >
                      <HelpIcon fontSize="inherit" />
                    </Tooltip>
                    <br />
                    <FormControlLabel
                      value="start"
                      labelPlacement="start"
                      control={
                        <ColorSwitch
                          checked={checked}
                          onChange={toggleOffline}
                          size=""
                        />
                      }
                      sx={{ color: checked ? `#FC574E` : ``, m: 0 }}
                      label={checked ? "Enabled" : "Disabled"}
                    />
                  </Typography>
                </FormControl>
                <FormControl
                  variant="outlined"
                  sx={{my: 1, color: "#112849" }}
                >
                  <Typography>
                    Public Service{" "}
                    <Tooltip
                      placement="top"
                      describeChild
                      title="Tooltip text goes here."
                    >
                      <HelpIcon fontSize="inherit" />
                    </Tooltip>
                    <br />
                    <FormControlLabel
                      value="start"
                      labelPlacement="start"
                      control={
                        <ColorSwitch
                          checked={publicService}
                          onChange={togglePublic}
                          size=""
                        />
                      }
                      sx={{ color: publicService ? `#FC574E` : ``, m: 0 }}
                      label={publicService ? "Enabled" : "Disabled"}
                    />
                  </Typography>
                </FormControl>

                <Typography sx={{ color: "red" }}>{error}</Typography>
                <Box
                  height="2.5rem"
                  mt="0.5rem"
                  display="flex"
                  justifyContent="end"
                >
                  <Button
                    onClick={() => handleCloseModal(false)}
                    style={{ backgroundColor: "transparent" }}
                    sx={{
                      textTransform: "none",
                      textDecoration: "underline",
                      color: "#A3A4A2",
                      my: 1.5,
                      mr: 1,
                      fontSize: 16,
                      animationTimeline: 5000,
                      "&:hover": {
                        opacity: 1,
                        color: "#FC574E",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleAddProfile()}
                    sx={{
                      textTransform: "none",
                      boxShadow: "none",
                      fontSize: 16,
                      padding: "6px 12px",
                      borderRadius: "6px",
                      backgroundColor: "#FC574E",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#CA463E",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Create Profile
                  </Button>
                </Box>
              </Box>
            </Box>
          </Modal>
        </div>
      ) : (
        <div>
          <Modal
            open={modal}
            onClose={() => {
              handleCloseModal();
              setDone(false);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={SecondModalStyle}>
              <Box display="flex" justifyContent="center">
                <Avatar
                  sx={{
                    alignItems: "center",
                    bgcolor: "#e8f3eb",
                    width: 70,
                    height: 70,
                  }}
                >
                  <CheckCircleOutlineIcon fontSize="large" color="success" />
                </Avatar>
              </Box>
              <Typography
                id="modal-modal-title"
                variant="h5"
                component="h2"
                align="center"
                fontFamily={"normal normal 600 22px Poppins"}
                sx={{
                  mt: 2,
                  color: "#112849",
                }}
              >
                Profile Successfully Created!
              </Typography>
              <Typography
                id="modal-modal-title"
                variant="h5"
                component="h2"
                align="center"
                fontFamily={"600 22px Poppins"}
                sx={{
                  my: 0.75,
                  color: "#5a6062",
                  font: "bold 14px/22px Poppins",
                }}
              >
                <span style={{ fontWeight: "bold", color: "black" }}>
                  Endpoint
                </span>{" "}
                 has been successfully created.
              </Typography>
              <Button
                onClick={() => {
                  setDone(false);
                  setModal(true);
                }}
                sx={{
                  my: 1,
                  textTransform: "none",
                  fontSize: 16,
                  borderRadius: "6px",
                  backgroundColor: "#FC574E",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#CA463E",
                    boxShadow: "none",
                  },
                }}
              >
                Create Another Account
              </Button>
              <Button
                onClick={() => {
                  setModal(false);
                  setDone(false);
                }}
                sx={{
                  my: 1,
                  textTransform: "none",
                  fontSize: 16,
                  borderRadius: "6px",
                  backgroundColor: "#ebe9e1",
                  color: "#363d43",
                  "&:hover": {
                    backgroundColor: "#C7C7C1",
                  },
                }}
              >
                Ok
              </Button>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
}
