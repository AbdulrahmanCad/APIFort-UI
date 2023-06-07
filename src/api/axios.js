import axios from "axios";
import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Cookies from "js-cookie";
import authService from "../services/authService";
import { Alert } from "@mui/material";

const api = axios.create({
  baseURL: "http://localhost:8787",
});


const setTokenCookie = (client, secret, token) => {
  const expires = new Date();
  expires.setHours(expires.getHours() + 1);
  Cookies.set("client", client, { expires });
  Cookies.set("secret", secret, { expires, secure: true, sameSite: 'strict' });
  Cookies.set("tokenValue", token, { expires, secure: true, sameSite: 'strict' });
  Cookies.set("tokenExpiresAt", expires.getTime(), { expires });
  Cookies.set("tokenAddedAt", Date.now(), { expires });
};

const AxiosInterceptor = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    checkTokenExpiration();
  
    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 3 * 60 * 1000);
  
    return () => clearInterval(interval);
  }, []);

  api.interceptors.request.use( async (config) => {
    const tokenValue = Cookies.get("tokenValue");
    const tokenExpiresAt = Cookies.get("tokenExpiresAt");
      if (tokenValue && tokenExpiresAt) {
      const now = Date.now();
      if (now < tokenExpiresAt) {
        config.headers.Authorization = `Bearer ${tokenValue}`;
      } else {
        Cookies.remove("tokenValue");
        Cookies.remove("tokenExpiresAt");
        Cookies.remove("tokenAddedAt");
        Cookies.remove("client");
        Cookies.remove("secret");
      }
    } else {
        Cookies.remove("tokenValue");
        Cookies.remove("tokenExpiresAt");
        Cookies.remove("tokenAddedAt");
        Cookies.remove("client");
        Cookies.remove("secret");
    }
    config.headers["x-api-key"] = "AZ87-6563-XUJH-00000";
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      if (response.config.method === "delete") {
        setMessage("Item deleted successfully");
        setSeverity("success");
        setOpen(true);
      } else if (response.config.method === "post") {
        setMessage("Success");
        setSeverity("success");
        setOpen(true);
      }
      return response;
    },
      (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login" 
    }
    else if (error.response.status >= 400 && error.response.status < 500) {
      setMessage(`Error: ${error.response.data.message}`);
      setSeverity("error");
      setOpen(true);
    } else if (error.response.status >= 500) {
      setMessage(`Error: ${error.response.data.message}`);
      setSeverity("warning");
      setOpen(true);
      return error.response; 
    }
    return Promise.reject(error);
  }
);

   const checkTokenExpiration = () => {
    const tokenExpiresAt = Cookies.get("tokenExpiresAt");
    const tokenAddedAt = Cookies.get("tokenAddedAt");
    const client = Cookies.get("client");
    const secret = Cookies.get("secret");
    if (tokenAddedAt && tokenExpiresAt) {
      const now = Date.now();
      const timeSinceAdded = now - tokenAddedAt;
      const timeUntilExpires = tokenExpiresAt - now;
      if (timeSinceAdded > 360000 || timeUntilExpires < 0.1 * 60 * 60 * 1000) {
        if(client && secret){
        authService.signIn(client, secret)
        }
      }
    }
  };

  return (
    <>
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
    </>
  );
};

export { api, AxiosInterceptor, setTokenCookie };
