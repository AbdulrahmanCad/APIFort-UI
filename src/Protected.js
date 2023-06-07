import React from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { useLocation } from 'react-router-dom';
import profileService from "./services/profileService"

function Protected(props) {
    let Component = props.component;
    const [loading, setLoading] = React.useState(true)
    const location = useLocation()

    const navigate = useNavigate()

    React.useEffect(() => {
      setLoading(true)
      checkCookie()
    }, [location.pathname]);

    function checkCookie() {
      const tokenValue = Cookies.get("tokenValue");
      const tokenExpiresAt = Cookies.get("tokenExpiresAt");
        if(tokenValue && tokenExpiresAt){
          profileService.getAllData().then((result) => {
            if(result){
              props.setViewSidebar(true)
              setLoading(false)
            }
          }).catch((error) => {
            if(error.response.status === 401){
              navigate("/login")
            }
          })
        } else {
            navigate("/login")
        }
    }

  if(loading) {
    return <div> Loading ...</div>
  }  

  return (
    <Component />
  )
}

export default Protected