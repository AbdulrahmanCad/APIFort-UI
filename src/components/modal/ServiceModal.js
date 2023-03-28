
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import endpointService from "../../services/endpointService";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HelpIcon from "@mui/icons-material/Help";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";

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

const closeBtnStyle = {
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
}

const checkStyle= {
  alignItems: "center",
  bgcolor: "#e8f3eb",
  width: 70,
  height: 70,
}

const formInputStyle ={
  my: 1.5, color: "#112849"
}

const createAccountBtnStyle ={
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
}

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
      },}

const createBtnStyle = {
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
  },}

const contant = {
  display: "flex",
  flexDirection: "column",
  px: 6,
};

const close = {
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

const sxStyle = {
  height: 40, 
  backgroundColor: "#F4F3EE",
  width: "100%",
};

export default function BasicModal({ serviceModal, setServiceModal }) {
  const [error, setError] = React.useState("");
  const [done, setDone] = React.useState(false);

  const param = useParams()

  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    service_path: "",
    context_name: "",
  });

  const {
    title,
    description,
    service_path,
    context_name,
  } = formData;

  const [validateForm, setValidateForm] = React.useState({
    title_valid: false,
    description_valid: false,
    service_path: false,
    context_name_valid: false,
  });

  const {
    title_valid,
  } = validateForm;

  const onChange = (e) => {
    setError("");
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleAddProfile() {
    if (
      title === "" ||
      description === "" ||
      context_name === "" ||
      service_path === ""
    ) {
      setError("Please fill out all fields!");
      return;
    }
    setDone(true);

    const data = {
      title,
      description,
      service_path,
      context_name,
    };
    await endpointService.postService(param.id, data).then((result) => {
      console.log(result);
      setDone(true);
    }).catch((err) => console.log(err.response.data));
  }

  function handleCloseModal() {
    setServiceModal(false);
  }

  return (
    <>
      {!done ? (
        <div>
          <Modal
            open={serviceModal}
            onClose={() => {
              handleCloseModal();
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box sx={close}>
                <Button
                  onClick={() => handleCloseModal()}
                  sx={closeBtnStyle}>
                  <CloseIcon />
                </Button>
              </Box>
              <Box sx={contant}>
                <Typography
                  id="modal-modal-title"
                  variant="h5"
                  component="h2"
                  sx={{
                    mb: 2,
                    color: "#112849",
                  }}
                >
                  Create new service
                </Typography>

                <FormControl
                  variant="outlined"
                  sx={formInputStyle}
                >
                  <Typography
                  component={'span'}
                  >
                    Service Name{" "}
                    <Tooltip
                      placement="top"
                      describeChild
                      title="The main name of your profile"
                    >
                      <HelpIcon fontSize="inherit" />
                    </Tooltip>
                    <Grid item xs={12}>
                      <ValidationTextField
                        error={title_valid}
                        sx={sxStyle}
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
                    Description{" "}
                    <Tooltip
                      placement="top"
                      describeChild
                      title="The main name of your profile"
                    >
                      <HelpIcon fontSize="inherit" />
                    </Tooltip>
                    <Grid item xs={12}>
                      <ValidationTextField
                        error={title_valid}
                        sx={sxStyle}
                        name="description"
                        onChange={onChange}
                        placeholder="Enter description"
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
                    Host/Path{" "}
                    <Tooltip
                      placement="top"
                      describeChild
                      title="The main name of your profile"
                    >
                      <HelpIcon fontSize="inherit" />
                    </Tooltip>
                    <Grid item xs={12}>
                      <ValidationTextField
                        error={title_valid}
                        sx={sxStyle}
                        name="service_path"
                        onChange={onChange}
                        placeholder="Enter path"
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
                    Context{" "}
                    <Tooltip
                      placement="top"
                      describeChild
                      title="The main name of your profile"
                    >
                      <HelpIcon fontSize="inherit" />
                    </Tooltip>
                    <Grid item xs={12}>
                      <ValidationTextField
                        error={title_valid}
                        sx={sxStyle}
                        name="context_name"
                        onChange={onChange}
                        placeholder="Enter context"
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
                    sx={createBtnStyle}
                  >
                    Create Service
                  </Button>
                </Box>
              </Box>
            </Box>
          </Modal>
        </div>
      ) : (
        <div>
          <Modal
            open={serviceModal}
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
                component="h2"
                align="center"
                fontFamily={"600 22px Poppins"}
                sx={{
                  my: 0.75,
                  color: "#5a6062",
                  font: "bold 14px/22px Poppins",
                }}
              >
                <span style={{ fontWeight: 'bold', color: "black" }}>{title}</span>{" "}
                profile has been successfully created.
              </Typography>
              <Button
                onClick={() => {
                  setDone(false);
                  setServiceModal(true);
                }}
                sx={createAccountBtnStyle}
              >
                Create Another Account
              </Button>
              <Button
                onClick={() => {
                  setServiceModal(false);
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
 