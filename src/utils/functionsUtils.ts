import axios, { AxiosError } from 'axios'
import { ProductSearch, TypeGetTotalPrice } from '../redux/slices/products/typesProducts'

const baseEndPoint = import.meta.env.VITE_BASENDPOINT_BACK;

export const getDateCountry = async () =>{

  try {
    const response = await fetch('https://worldtimeapi.org/api/timezone/America/Caracas');
    const data = await response.json();
    const currentDate = new Date(data.utc_datetime);
    const dia = String(currentDate.getDate()).padStart(2, '0');
    const mes = String(currentDate.getMonth() + 1).padStart(2, '0');
    const anio = currentDate.getFullYear();
    return `${dia}-${mes}-${anio}`

  } catch (error) {
    const currentDate = new Date();
    const currentDateVenezuela = new Date(currentDate.toLocaleString("en-US", { timeZone: "America/Caracas" }));
    const dia = String(currentDateVenezuela.getDate()).padStart(2, '0');
    const mes = String(currentDateVenezuela.getMonth() + 1).padStart(2, '0');
    const anio = currentDateVenezuela.getFullYear();
    return `${dia}-${mes}-${anio}`
  }  
}

export const getProductIdName = async  (refreshToken: string, wordSearch: string) =>{
  try {
    const endPoiont = baseEndPoint + `/productos/codigo-nombre-ptv/wordSearch/${wordSearch}`;
    const config = {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      data: null
    };
    const response = await axios.get(endPoiont, config);
    const data : ProductSearch[] | [] = response.data;
    return {data};
  } catch (error: unknown) {
    if (typeof error === 'string') {
      return { error };
    } else if ((error as AxiosError).isAxiosError) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 400) {
        return { error: axiosError.response.data }; // Devuelve el error del servidor
      }
      return { error: axiosError };
    } else {
      console.log(error);
      return { error: 'Error desconocido' };
    }
  }
}

export const getTotalsPrice = async (refreshToken : string, idRate: number , dataProduct: ProductSearch[]) => {
  try {
    const data = {
      idRate: idRate,
      dataProduct: dataProduct
    }
    const config = {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      data: null
    };
    const endPoint = baseEndPoint + '/venta/get-totals';
    const response = await axios.post(endPoint, data ,config);
    if(response.status === 200){
      const data = response.data as TypeGetTotalPrice
      return data;
    }
  } catch (error: unknown) {
    if (typeof error === 'string') {
      return { error };
    } else if ((error as AxiosError).isAxiosError) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 400) {
        return { error: axiosError.response.data }; // Devuelve el error del servidor
      }
      return { error: axiosError };
    } else {
      console.log(error);
      return { error: 'Error desconocido' };
    }
  }
}

export const getDatesUTC = (date: [Date, Date]) :string[] => {
  const initDate = date[0];
  const endDate = date[1];

  //obtener la hora UTC
  const horaInit = String(initDate.getUTCHours()).padStart(2, '0');
  const minutosInit = String(initDate.getUTCMinutes()).padStart(2, '0');
  const segundosInit = String(initDate.getUTCSeconds()).padStart(2, '0');
  //obtener la fecha UTC 
  const diaInit = String(initDate.getUTCDate()).padStart(2, '0');
  const mesInit = String(initDate.getUTCMonth() + 1).padStart(2, '0');
  const anioInit = String(initDate.getUTCFullYear());
  //==================================================
  //obtener la hora UTC
  const horaEnd = String(endDate.getUTCHours()).padStart(2, '0');
  const minutosEnd = String(endDate.getUTCMinutes()).padStart(2, '0');
  const segundosEnd = String(endDate.getUTCSeconds()).padStart(2, '0');
  //obtener la fecha UTC 
  const diaEnd = String(endDate.getUTCDate()).padStart(2, '0');
  const mesEnd = String(endDate.getUTCMonth() + 1).padStart(2, '0');
  const anioEnd = String(endDate.getUTCFullYear());

  const fechaInit = `${anioInit}-${mesInit}-${diaInit}T${horaInit}:${minutosInit}:${segundosInit}+0000`;
  const fechaEnd = `${anioEnd}-${mesEnd}-${diaEnd}T${horaEnd}:${minutosEnd}:${segundosEnd}+0000`;

  return [fechaInit, fechaEnd]
}
