import axios from "axios";
import { setTokenCookie } from "../api/axios";

const API_URL = "http://localhost:8180/realms/master/protocol/openid-connect";

const setCookie = () => {

let urlencoded = new URLSearchParams();
urlencoded.append("client_id", "backend-client");
urlencoded.append("grant_type", "client_credentials");
urlencoded.append("client_secret", "QRcmVrIxzIzQ1sXznMzVGZybc7M4fuXX");

axios.post(API_URL + "/token", urlencoded, 
{ headers: { 'Content-Type': 'application/x-www-form-urlencoded'},})
    .then((result) => {
      let token = result.data.access_token;
      setTokenCookie(token);
    });
};

const authService = {
  setCookie,
};

export default authService;