import axios from "axios";
import { setAllOrders } from ".";

import { Dispatch } from "../../store/store";
import { TypeOrder } from "./typesOrders";

const basePoint = import.meta.env.VITE_BASENDPOINT_BACK;

export const getAllOrders = async ( accessToken: string, dispatch: Dispatch, page: number, limit: number) => {
  try {
    const endpoint = basePoint + `/pedidos/${page}/${limit}`;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: null
    };
    const { data } = await axios.get(endpoint, config); 
    dispatch(setAllOrders(data));
    if(data){
      return data as TypeOrder[]
    }
  } catch (error) {
    if (typeof error === "string") {
      console.log(error);
    } else if (error instanceof Error) {
      const message = error.message;
      console.log(message);
    } else {
      console.log(error);
    }
  }
  
};