import React, {lazy} from "react"
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Profile = lazy (() => import("./pages/Profile"))

function App() {
  return (<>
  <Router>
    <Routes>
      <Route path="*" element={<Profile />}></Route>
    </Routes>
  </Router>
  
  </>);
}

export default App;
