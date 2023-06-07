import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Button, TextField, Typography, Snackbar, Alert } from '@mui/material';
import Cookies from "js-cookie";
import axios from "axios";
import { setTokenCookie } from "../api/axios";
import LoginIcon from '@mui/icons-material/Login';

const API_URL = "http://localhost:8180/realms/master/protocol/openid-connect";

const Login = (props) => {

const [err, setErr] = React.useState("") 
const [client, setClient] = React.useState("backend-client") 
const [secret, setSecret] = React.useState("QRcmVrIxzIzQ1sXznMzVGZybc7M4fuXX")
const [open, setOpen] = React.useState(false);
const [message, setMessage] = React.useState("");
const [severity, setSeverity] = React.useState("success");

const navigate = useNavigate()

React.useEffect(() => {
  props.setViewSidebar(false)
  const tokenValue = Cookies.get("tokenValue");
  if(tokenValue){
    navigate("/profiles")
  } 
},[])

 function handleLogin(){
   if(client.trim() === "" || secret.trim() === ""){
      setErr("Please fill out all fields")
      return
   }
   let urlencoded = new URLSearchParams();
   urlencoded.append("client_id", client);
   urlencoded.append("grant_type", "client_credentials");
   urlencoded.append("client_secret", secret);

    axios.post(API_URL + "/token", urlencoded, 
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded'},})
        .then((result) => {
          let token = result.data.access_token;
          setTokenCookie(client, secret, token);
          navigate("/profiles")
        }).catch((error) => {
          setMessage(`Error: ${error.response.data.error_description}`);
          setSeverity("error");
          setOpen(true);
        });
 }

    const handleClose = () => {
      setOpen(false);
      };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F3EE',
        minHeight: '100vh',
      }}
    >
      <Card sx={{ boxShadow: 0.75, minWidth: 500 }}>
        <CardContent sx={{ backgroundColor: 'white', textAlign: 'center' }}>
          <Typography variant="h4" sx={{ my: 6, color: "#052056" }}>
          <LoginIcon sx={{ color: '#052056', mx: 1 }} />
            Login
          </Typography>
          <div  
          style={{
              margin: '2rem',
            }}>
          <Typography variant="h6" sx={{ textAlign: 'left', my: 2 }}>
            Client ID
          </Typography>
            <TextField
              label="Client Id..."
              variant="outlined"
              fullWidth
              value={client}
              onChange={(e) => setClient(e.target.value)}
            />
             <Typography variant="h6" sx={{ textAlign: 'left', my: 2 }}>
            Client Secret
          </Typography>
            <TextField
              label= "Client secret..."
              type="password"
              variant="outlined"
              fullWidth
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#FC574E',
                color: 'white',
                my: 4,
                ":hover": {
                  bgcolor: "#CA463E",
                  color: "white",
                },
              }}
              onClick={() => handleLogin()}
            >
              Login
            </Button>
            <Typography sx={{ textAlign: 'left', color: 'red' }}>
            {err}
          </Typography>
          </div>
        </CardContent>
      </Card>

      <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Alert
        severity={severity}
        onClose={handleClose}
      >
        {message}
      </Alert>
    </Snackbar>

    </div>
  );
};

export default Login;
