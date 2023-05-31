import React, {lazy} from "react"
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import Sidebar from "./components/Sidebar/Sidebar"
import { AxiosInterceptor } from "./api/axios";
import Protected from "./Protected";

const Profile = lazy (() => import("./pages/Profile"))
const Endpoint = lazy (() => import("./pages/Endpoint"))
const Health = lazy (() => import("./pages/Health"))

var mainBgStyle = {
  backgroundColor : '#F4F3EE',
  height: '100vh',
  display: "flex",
  minHeight : '100vh',
}
const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF'
    },
  },
  typography: { fontFamily: ["Poppins"].join(",") },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(.25,.1,.36,1.18)',
    },
  },
  Select: { fontFamily: ["Poppins"].join(",")}
});

function App() {
  return (<>
  <AxiosInterceptor />
  <ThemeProvider theme={theme}>
  <Router>
  <Sidebar />
  <div style={mainBgStyle}>
    <Routes>
      <Route path="/profiles" element={<Protected component={Profile}/>}></Route>
      <Route path="/profiles/:id" element={<Protected component={Endpoint}/>}></Route>
      <Route path="/health" element={<Protected component={Health}/>}></Route>
      <Route path="*" element={<Navigate to="/profiles" replace />}/>
    </Routes>
  </ div>
  </Router>
  </ThemeProvider>
  </>);
}

export default App;
