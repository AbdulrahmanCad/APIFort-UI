import React, {lazy} from "react"
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider} from '@mui/material/styles';

const Sidebar = lazy (() => import("./components/Sidebar/Sidebar"))
const Profile = lazy (() => import("./pages/Profile"))
const Endpoint = lazy (() => import("./pages/Endpoint"))

var mainBgStyle = {
  backgroundColor : '#F4F3EE',
  height: '100vh',
  display: "flex",
  minHeight : '100vh'
}
const theme = createTheme({
  typography: { fontFamily: ["Yellowtail", "Poppins"].join(",") },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(.25,.1,.36,1.18)',
    },
  },
});

function App() {
  return (<>
  <ThemeProvider theme={theme}>
  <Sidebar />
  <div style={mainBgStyle}>
  
  <Router>
    <Routes>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/profile/:id" element={<Endpoint />}></Route>
      <Route path="*" element={<Profile />}></Route>
    </Routes>
  </Router>
  </ div>
  </ThemeProvider>
  </>);
}

export default App;
