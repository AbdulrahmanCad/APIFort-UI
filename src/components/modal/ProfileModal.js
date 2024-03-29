import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import profileService from "../../services/profileService";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HelpIcon from "@mui/icons-material/Help";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "549px",
  display: "flex",
  flexDirection: "column",
  bgcolor: "#FBFBF9",
  border: "1px solid #EBE9E1",
  borderRadius: "12px",
  boxShadow: 2,
  "@media (min-width: 780px)": {
    width: "48rem"
  },
};

const contant = {
  display: "flex",
  flexDirection: "column",
  px: 6,
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
  "@media (min-width: 480px)": {
    width: "100%",
  },

  "@media (min-width: 780px)": {
    width: "32rem",
  },

  "@media (min-width: 1280px)": {
    width: "42rem",
  },
};

const ValidationTextField = styled(OutlinedInput)({
  ".MuiOutlinedInput-notchedOutline": {
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
  },"&:hover .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
    border: " 1px solid #D4D2CB",
  },
});

const validationTextStyle = {
  height: 40, 
  backgroundColor: "#F4F3EE",
  width: "100%",
};

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

const cancelBtnStyle = {
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
};

const createProfileBtnStyle = {
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
}

const doneBtnStyle = {
   my: 1,
   textTransform: "none",
   fontSize: 16,
   borderRadius: "6px",
   backgroundColor: "#ebe9e1",
   color: "#363d43",
    "&:hover": {
      backgroundColor: "#C7C7C1",
    },
};

const formInputStyle = {
  my: 1.5,
  color: "#112849" 
};

const createAnotherAccountBtnStyle = {
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
};

const checkStyle = {
  alignItems: "center",
  bgcolor: "#e8f3eb",
  width: 70,
  height: 70,
}

export default function BasicModal({ modal, setModal }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [showPassword2, setShowPassword2] = React.useState(false);
  const [showPassword3, setShowPassword3] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const [formData, setFormData] = React.useState({
    title: "",
    api_key: "",
    auth_claim_key: "realm_access",
    realm: "",
    description: "Testing"
  });

  const {
    title,
    api_key,
    auth_claim_key,
    realm,
    description
  } = formData;

  const [validateForm, setValidateForm] = React.useState({
    title_valid: false,
    api_key_valid: false,
    auth_claim_valid: false,
    realm_valid: false,
  });

  const {
    title_valid,
    api_key_valid,
    auth_claim_valid,
    realm_valid,
  } = validateForm;

  const onChange = (e) => {
    setError("");
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClickShowPasswordAPI = () => setShowPassword((show) => !show);

  const handleMouseDownPasswordAPI = (event) => {
    event.preventDefault();
  };
  const handleClickShowPasswordAuth = () => setShowPassword2((show) => !show);

  const handleMouseDownPasswordAuth = (event) => {
    event.preventDefault();
  };
  const handleClickShowPasswordRealm = () => setShowPassword3((show) => !show);

  const handleMouseDownPasswordRealm = (event) => {
    event.preventDefault();
  };

  async function handleAddProfile() {
    if (
      title === "" ||
      api_key === "" ||
      realm === "" ||
      auth_claim_key === ""
    ) {
      setError("Please fill out all fields!");
      return;
    }

    const data = {
      title,
      description,
      api_key,
      auth_claim_key,
      realm,
    };
    await profileService.postProfile(data).then((result) => {
      setDone(true);
    }).catch((err) => setError(err.response.data));
  }

  function handleCloseModal() {
    setModal(false);
    setShowPassword(false);
    setShowPassword2(false);
    setShowPassword3(false);
  }

  return (
    <>
      {!done ? (
        <div>
          <Modal
            open={modal}
            onClose={() => {
              handleCloseModal();
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box sx={cloes}>
                <Button
                  onClick={() => handleCloseModal()}
                  sx={closeIconStyle}
                >
                  <CloseIcon />
                </Button>
              </Box>
              <Box sx={contant}>
                <Typography
                  id="modal-modal-title"
                  variant="h5"
                  component={'span'}
                  sx={{ mb: 2, color: "#112849"}}
                >
                  Create new profile
                </Typography>
                
                <FormControl
                  variant="outlined"
                  sx={formInputStyle}
                >
                  <Typography 
                  component={'span'}
                  >
                    Profile Name{" "}
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
                        error={title_valid}
                        sx={validationTextStyle}
                        name="title"
                        onChange={onChange}
                        placeholder="Enter name"
                      />
                    </Grid>
                  </Typography>
                </FormControl>
                <FormControl
                  variant="outlined"
                  sx={formInputStyle}
                >
                  <Typography
                  component={'span'}
                  >
                    API Key{" "}
                    <Tooltip
                      placement="top"
                      describeChild
                      title="API Key of your profile"
                    >
                      <HelpIcon fontSize="inherit" />
                    </Tooltip>
                    <Grid 
                  component={'span'}
                  item xs={12}>
                      <ValidationTextField
                        error={api_key_valid}
                        sx={validationTextStyle}
                        id="outlined-adornment-password"
                        name="api_key"
                        type={showPassword ? "text" : "password"}
                        onChange={onChange}
                        placeholder="Enter key"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPasswordAPI}
                              onMouseDown={handleMouseDownPasswordAPI}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </Grid>
                  </Typography>
                </FormControl>
                <FormControl
                  variant="outlined"
                  sx={formInputStyle}
                >
                  <Typography 
                  component={'span'}
                  >
                    Auth Claim Key{" "}
                    <Tooltip
                      placement="top"
                      describeChild
                      title="Auth Claim Key of your profile"
                    >
                      <HelpIcon fontSize="inherit" />
                    </Tooltip>
                    <Grid 
                  component={'span'}
                  item xs={12}>
                      <ValidationTextField
                        error={auth_claim_valid}
                        sx={validationTextStyle}
                        name="auth_claim_key"
                        value={auth_claim_key}
                        onChange={onChange}
                        placeholder="Enter key"
                      />
                    </Grid>
                  </Typography>
                </FormControl>
                <FormControl
                  variant="outlined"
                  sx={formInputStyle}
                >
                  <Typography 
                  component={'span'}
                  >
                    Realm Key{" "}
                    <Tooltip
                      placement="top"
                      describeChild
                      title="Realm Key of your profile"
                    >
                      <HelpIcon fontSize="inherit" />
                    </Tooltip>
                    <Grid 
                  component={'span'}
                  item xs={12}>
                      <ValidationTextField
                        error={realm_valid}
                        sx={validationTextStyle}
                        name="realm"
                        onChange={onChange}
                        placeholder="Enter realm"
                      />
                    </Grid>
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
                    sx={cancelBtnStyle}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleAddProfile()}
                    sx={createProfileBtnStyle}
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
                  sx={checkStyle}
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
                component={'span'}
                align="center"
                fontFamily={"600 22px Poppins"}
                sx={{
                  my: 0.75,
                  color: "#5a6062",
                  font: "bold 14px/22px Poppins",
                }}
              >
                <span style={{ fontWeight: 'bold',   color: "black" }}>{title}</span>{" "}
                profile has been successfully created.
              </Typography>
              <Button
                onClick={() => {
                  setDone(false);
                  setModal(true);
                }}
                sx={createAnotherAccountBtnStyle}
              >
                Create Another Account
              </Button>
              <Button
                onClick={() => {
                  setModal(false);
                  setDone(false);
                }}
                sx={doneBtnStyle}
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
