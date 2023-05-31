import React from 'react'
import authService from './services/authService';
import Cookies from "js-cookie";
import { useLocation } from 'react-router-dom';

function Protected(props) {
    let Component = props.component;
    const [loading, setLoading] = React.useState(true)
    const location = useLocation()

    React.useEffect(() => {
      setLoading(true)
      checkCookie()
    }, [location.pathname]);

    async function checkCookie() {
      const tokenValue = Cookies.get("tokenValue");
      const tokenExpiresAt = Cookies.get("tokenExpiresAt");
        if(tokenValue && tokenExpiresAt){
            setLoading(false)
        } else {
         await authService.setCookie()
         await new Promise(resolve => setTimeout(resolve, 100));
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