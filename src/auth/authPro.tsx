import React, { useState, useEffect, createContext, useContext } from "react"
import Loading from "../Loading/Loading";
import axios from "axios"
import { UserInfo, AuthResponse } from "./typesProtecterRoute"
import { getAllTipoDni } from "../redux/slices/user/actionUser";
import { useCustomDispatch } from "../hooks/redux";
import { getRateBCVRedux, getAllDepartamentos } from "../redux/slices/products/actionsProducts"

interface AuthProviderProps{
  children: React.ReactNode;
}

const baseEndPoint =  import.meta.env.VITE_BASENDPOINT_BACK;

const AuthContext = createContext({
  isAuthenticated: false,
  isAdmin: false,
  getAccessToken: () => ({} as string),
  saveUser: (_authResponse: AuthResponse) => {
    // This function is intentionally left empty.
  },  
  getRefreshToken: () => ({} as string | null),
  getUser: () => ({} as UserInfo | undefined),
  getAccess: () => {
    // This function is intentionally left empty.
  },
  signOut: () => {
    // This function is intentionally left empty.
  },
  saveDataUser: (_user: UserInfo) => {
    // This function is intentionally left empty.
  },
});



export function AuthProvider({ children }: AuthProviderProps) {

  const dispatch = useCustomDispatch();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<UserInfo>()
  const [accessToken, setAccessToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true); 
 

  async function requestNewAccessToken(refreshToken: string) {
    try {
      const endpoint = baseEndPoint + "/token/refresh-token";
      
      const config = {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      };
      const response = await axios.post(endpoint, null ,config);
      if (response.status === 200) {
        if(response.data.error){
          throw new Error(response.data.error)
        }
        return response.data.accessToken;
      }
    } catch (error) {
      return null;
    }
  }

  const saveDataUser = (user: UserInfo) => {
    setUser(user);
  };

  async function checkAuth() {
    try {
      setIsLoading(true)
      getAllTipoDni(dispatch)
      
      if (accessToken) {
        //This user is autenticated
        const  userInfo = await getUserInfo(accessToken);
        if(userInfo){
          saveSessionInfo(userInfo, accessToken, getRefreshToken() ?? '');
          setIsLoading(false);
          return;
        }
      } else {
        const token = getRefreshToken();
  
        if (token) {
          const newAccessToken = await requestNewAccessToken(token)
          if (newAccessToken) {
            const  userInfo = await getUserInfo(newAccessToken);
            
            if(userInfo){
              saveSessionInfo(userInfo, newAccessToken, token);
              await getRateBCVRedux(newAccessToken, dispatch);
              await getAllDepartamentos(dispatch);
              setIsLoading(false);
              return;
            }
          }
        }
      }
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false);
    }

  }

  function saveSessionInfo(userInfo: UserInfo, accessToken:string, refreshToken:string){
    setAccessToken(accessToken);
    setUser(userInfo);
    localStorage.setItem("token", refreshToken); 
    if(userInfo.level === 'root'){
      setIsAdmin(true);
    }
    setIsAuthenticated(true);  
  }

  async function getUserInfo(accessToken:string){
    try {
      const endpoint = baseEndPoint + "/data-user";
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(endpoint, config);
      if (response.status === 200) {
        if(response.data.error){
          throw new Error(response.data.error)
        }
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  function getAccessToken() {
    return accessToken;
  }

  function getRefreshToken():string|null {
    const token = localStorage.getItem("token");
    if (token) {
      return token;
    }
    return null;
  }

  function saveUser(authResponse: AuthResponse) {
    const user = authResponse.user;
    const accessTokens = authResponse.accessToken;
    const refreshTokens = authResponse.refreshToken;
    saveSessionInfo(user, accessTokens, refreshTokens);
  }

  function getAccess() {
    setIsAuthenticated(true);
  }

  function signOut(){
    setAccessToken('');
    setUser(undefined);
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }

  function getUser(){
    return user;
  }

  
  useEffect(() => {    
    checkAuth();
  }, []);
  
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken, signOut, getUser, getAccess, isAdmin, saveDataUser }}>
      {isLoading? <Loading/> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)