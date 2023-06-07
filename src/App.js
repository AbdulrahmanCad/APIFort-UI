import React, { lazy } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Sidebar from "./components/Sidebar/Sidebar";
import { AxiosInterceptor } from "./api/axios";
import Protected from "./Protected";

const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));
const Endpoint = lazy(() => import("./pages/Endpoint"));
const Health = lazy(() => import("./pages/Health"));

const mainBgStyle = {
  backgroundColor: "#F4F3EE",
  height: "100%",
  display: "flex",
  minHeight: "100vh",
};
const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
  },
  typography: { fontFamily: ["Poppins"].join(",") },
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(.25,.1,.36,1.18)",
    },
  },
  Select: { fontFamily: ["Poppins"].join(",") },
});

function App() {

  const [viewSidebar, setViewSidebar] = React.useState(false)

  return (
    <>
      <AxiosInterceptor />
      <ThemeProvider theme={theme}>
        <Router>
          { viewSidebar && <Sidebar /> } 
          <div style={viewSidebar ? mainBgStyle : {}}>
            <Routes>
            <Route path="/login" element={<Login setViewSidebar={setViewSidebar} />}></Route>
              <Route
                path="/profiles"
                element={<Protected setViewSidebar={setViewSidebar} component={Profile} />}
              ></Route>
              <Route
                path="/profiles/:id"
                element={<Protected setViewSidebar={setViewSidebar} component={Endpoint} />}
              ></Route>
              <Route
                path="/health"
                element={<Protected setViewSidebar={setViewSidebar} component={Health} />}
              ></Route>
              <Route path="*" element={<Navigate to="/profiles" replace />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
