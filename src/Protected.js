import React from 'react'
import { useNavigate } from 'react-router-dom';
import authService from './services/authService';
import Cookies from "js-cookie";

function Protected(props) {
    let Component = props.component;
    const [loading, setLoading] = React.useState(true)

    const navigate = useNavigate();

    React.useEffect(() => {
      checkCookie()
    }, []);

    async function checkCookie() {
      const tokenValue = Cookies.get("tokenValue");
      const tokenExpiresAt = Cookies.get("tokenExpiresAt");
        if(tokenValue && tokenExpiresAt){
            navigate("/profile")
            setLoading(false)
        } else {
         await authService.setCookie()
         setLoading(false)
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