import axios, { AxiosError } from "axios";
import { setAllProduct, setNewCategori, setAllCategori, setUpdateCategori, setNewProduct, setNewPresentacion, setAllPresentacion, setUpdatePresentacion, setUpdateProduct } from ".";
import { Dispatch } from "../../store/store";
import { Category, Presentacion, EditProduct, RegisterProduct } from "./typesProducts";

const basePoint = import.meta.env.VITE_BASENDPOINT_BACK;

//Productos
export const getAllProducts = async (dispatch: Dispatch) => {
  try {
    const endpoint = basePoint + `/productos`;
    
    const { data } = await axios.get(endpoint); 
    dispatch(setAllProduct(data));
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

export const postProduct = async (dispatch: Dispatch, newProduct: RegisterProduct, presentacion: Presentacion) => {
  try {
    const endpoint = basePoint + '/productos';
    const response = await axios.post(endpoint, { newProduct, presentacion});
    dispatch(setNewProduct(response.data));
    return response.status;
  } catch (error) {
    return error;
  }
}

export const putUpdateProduct = async (dispatch: Dispatch, productEdit: EditProduct) => {
  try {
    const endpoint = basePoint + '/productos';
    const response = await axios.put(endpoint, productEdit);
    dispatch(setUpdateProduct(response.data));
    return response.status;
  } catch (error) {
    return error;
  }
}

//Categori
export const postCategori = async (dispatch: Dispatch, body: {nombre: string}) => {
  try {
    const endpoint = basePoint + `/categorias`;
    const response = await axios.post(endpoint, body); 
    dispatch(setNewCategori(response.data));
    return response.status;
  } catch (error) {
    if (typeof error === "string") {
      return error;
    } else if (error instanceof AxiosError) {
      return error
    } else {
      console.log(error);
    }
  }
}

export const getAllCategori = async (dispatch: Dispatch) => {
  try {
    const endpoint = basePoint + `/categorias`;
    const { data } = await axios.get(endpoint);
    const allCategory: Category[] = [];
    data.forEach((element: Category) => {
      allCategory.push({id: element.id, nombre: element.nombre.charAt(0).toUpperCase() + element.nombre.slice(1)})
    }); 
    dispatch(setAllCategori(allCategory));
  } catch (error) {
    return error;
  }
}

export const putUpdateCategory = async (dispatch: Dispatch, body: Category) => {
  try {
    const endpoint = basePoint + '/categorias';
    const response = await axios.put(endpoint, body);
    dispatch(setUpdateCategori(response.data));
    return response.status
  } catch (error) {
    return error;
  }
}

//Presentacion
export const postPresentacion = async (dispatch: Dispatch, body: {nombre: string}) => {
  try {
    const endpoint = basePoint + `/presentacion`;
    const response = await axios.post(endpoint, body); 
    dispatch(setNewPresentacion(response.data));
    return response.status;
  } catch (error) {
    if (typeof error === "string") {
      return error;
    } else if (error instanceof AxiosError) {
      return error
    } else {
      console.log(error);
    }
  }
}

export const getAllPresentacion = async (dispatch: Dispatch) => {
  try {
    const endpoint = basePoint + '/presentacion';
    const { data } = await axios.get(endpoint);
    const allPresentacion: Presentacion[] = [];
    data.forEach((element: Presentacion) => {
      allPresentacion.push({id: element.id, nombre: element.nombre.charAt(0).toUpperCase() + element.nombre.slice(1)})
    }); 
    dispatch(setAllPresentacion(allPresentacion));
  } catch (error) {
    return error;
  }
}

export const putUpdatePresentacion = async (dispatch: Dispatch, body: Presentacion) => {
  try {
    const endpoint = basePoint + '/presentacion';
    const response = await axios.put(endpoint, body);
    dispatch(setUpdatePresentacion(response.data));
    return response.status
  } catch (error) {
    return error;
  }
}



