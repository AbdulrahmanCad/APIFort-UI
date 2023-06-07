import axios from "axios";
import { setTokenCookie } from "../api/axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:8180/realms/master/protocol/openid-connect";

const signIn = (clientId, clientSecret) => {

let urlencoded = new URLSearchParams();
urlencoded.append("client_id", clientId);
urlencoded.append("grant_type", "client_credentials");
urlencoded.append("client_secret", clientSecret);

axios.post(API_URL + "/token", urlencoded, 
{ headers: { 'Content-Type': 'application/x-www-form-urlencoded'},})
    .then((result) => {
      let token = result.data.access_token;
      setTokenCookie(clientId, clientSecret, token);
    }).catch((error) => {
      Cookies.remove("tokenValue");
      Cookies.remove("tokenExpiresAt");
      Cookies.remove("client");
      Cookies.remove("secret");
    });
};

const authService = {
  signIn,
};

export default authService;