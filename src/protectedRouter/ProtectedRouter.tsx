import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
/* import { useAuth } from "../../Authenticator/AuthPro"; */

function ProtectedRoute(){
  const [auth, _setUseAuth] = useState<boolean>(false)
    
  return (
    <>
      {auth ? <Outlet/> : <Navigate to="/"></Navigate>}
    </>
  )

}

export default ProtectedRoute;
