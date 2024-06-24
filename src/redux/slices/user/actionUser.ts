import axios, { AxiosError } from "axios"
import { TypeGetClose, NewTipoDni, TypeUserRootRegister } from "./typeUser";
import { setAllTipoDni, setNewTipoDni } from ".";
import { Dispatch } from "../../store/store";
import { UserInfo } from "../../../auth/typesProtecterRoute";

type DataLoginUser = {
  password?: string,
  email?: string,
  token?: string
}
/* interface RespLogout {
  message?: string; // La propiedad 'message' es opcional
  // Otras propiedades si las hay
} */

const baseEndPoint = import.meta.env.VITE_BASENDPOINT_BACK

export async  function loginUser(data: DataLoginUser) {
  try {
    const endpoint = baseEndPoint + `/sign-in-out/login`;
    const response = await axios.post(endpoint, data);
    const apiResponse = response.data;
    if('pass' in apiResponse){
      const user = apiResponse.user as UserInfo;
      if(user.level === 'caja'){
        const tkn = apiResponse.refreshToken;
        await singOut(tkn);
        const resp = {
          response: {
            data :{
              error : 'Usuario con acceso denegado'
            }
          }
        }
        return resp
      }
    }

    return apiResponse;
  } catch (error: any) {
    return error;
  }
}

export async function singOut(refreshToken : string): Promise<{message: string} | any | {error: string}>{
  try {
    const endpoint = baseEndPoint + '/sign-in-out/sign-out';
    const config = {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      data: null
    };
    const response = await axios.delete(endpoint, config);
    return response.data as {message: string}    
  } catch (error) {
    return error;
  }
}

export async function registerUser(data: TypeUserRootRegister): Promise<{message: string} | {error: string}>{
  try {
    const endpoint = baseEndPoint + '/sign-in-out/register-user-root';
    const response = await axios.post(endpoint, data);
    if(response.status === 200){
      const data = response.data
      return data as {message: string}
    }else if(response.status === 403){
      const data = response.data
      return data as {error: string}
    }else if(response.status === 400){
      const data = response.data
      return data as {error: string}
    }else {
      return  {error: 'Error, algo salio mal'}
    }
  } catch (error) {
    console.log(error)
    if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
      // Manejar el error del servidor con status 400
      return { error: error.response.data.error || 'Error interno' };
    } else if (error instanceof AxiosError) {
      // Manejar otros errores de Axios
      if(error.response){
        return { error: error.response.data.error };
      }else{
        return { error: 'Error interno' };
      }
    } else {
      // Manejar cualquier otro error
      return { error: 'Error interno' };
    }
  }
}

export async function getCutClose(accesToken : string, data: string[]): Promise<TypeGetClose | {error: string}> {
  try {
    const config = {
      headers :{
        Authorization: `Bearer ${accesToken}`
      },
      data: null
    } 
    const endPoint = baseEndPoint + `venta/cut-close/initDay/${data[0]}/endDay/${data[1]}`
    const response = await axios.get(endPoint, config);
    return response.data.data as TypeGetClose
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
      // Manejar el error del servidor con status 400
      return { error: error.response.data.error || 'Error interno' };
    } else if (error instanceof AxiosError) {
      // Manejar otros errores de Axios
      return { error: error.message };
    } else {
      // Manejar cualquier otro error
      return { error: 'Error interno' };
    }
  }
} 

export const getAllTipoDni = async( dispatch: Dispatch ) => {
  try {
    const endPoint = baseEndPoint + '/tipoDni';
    const response = await axios.get(endPoint);
    dispatch(setAllTipoDni(response.data));
    return response.status;
  } catch (error) {
    if (typeof error === "string") {
      return {error: error};
    } else if (error instanceof Error) {
      const message = error.message;
      return {error: message};
    } else {
      return {error: error}
    }
  }
}

export const posNewTipoDni = async(dispatch: Dispatch, body: NewTipoDni) =>{
  try {
    const endPoint = baseEndPoint + '/tipoDni';
    const response = await axios.post(endPoint,body);
    dispatch(setNewTipoDni(response.data));
    return response.status;

  } catch (error) {
    if (typeof error === "string") {
      return {error: error}
    } else if (error instanceof Error) {
      const message = error.message;
      return {error: message}
    } else {
      return {error: error}
    }
  }

}

export async function postResetPassword(password : string, token: string ) : Promise<{message : string} | {code: number, message: string}> {
  try {
    const config = {
      headers :{
        Authorization: `Bearer ${token}`
      },
      data: null
    } 
    const endPoint = baseEndPoint + `/sign-in-out/confirm-reset-password`
    const response = await axios.post(endPoint, {password}, config);
    return { code: response.status, message: response.data.message}
    
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
      const dataError = {
        code: error.response.status,
        message: error.response.data.error
      }
      return dataError || { error: 'Error interno' };
    } else if (error instanceof AxiosError) {
      // Manejar otros errores de Axios
      if(error.response?.data.error  === 'jwt expired'){
        return { code: error.status, message: 'Token expirado o invalido' };
      }
      return { code: error.status, message: error.response?.data.error };
    } else {
      // Manejar cualquier otro error
      return { message: 'Algo salio mal' };
    }
  }
}

export async function getLinkForgotPassword(email : string ) : Promise<{message : string} | {code: number, message: string}> {
  try {
    const endPointFront = import.meta.env.VITE_MY_ENDPOINT;
    const endPoint = baseEndPoint + `/sign-in-out/consult-reset-password`
    const response = await axios.post(endPoint, {email, endPointFront});
    return { code: response.status, message: response.data.message}
    
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
      const dataError = {
        code: error.response.status,
        message: error.response.data.error
      }
      return dataError || { error: 'Error interno' };
    } else if (error instanceof AxiosError) {
      // Manejar otros errores de Axios
      return { code: error.status, message: error.message };
    } else {
      // Manejar cualquier otro error
      console.log(error)
      return { message: 'Algo salio mal' };
    }
  }
}