import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { status, TypeOrder } from './typesOrders';


const initialState: status = {
  allOrders: []
}

const orderSlices = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    //Producto
    setAllOrders: (state, action: PayloadAction<TypeOrder[] | []>) => {
      state.allOrders = action.payload;
    },
    /* setNewProduct: (state, action: PayloadAction<Product>) =>{
      state.allProducts = [...state.allProducts, action.payload];
    },
    setUpdateProduct: (state, action: PayloadAction<Product>) =>{
      const newProducts = state.allProducts.filter((prod) => {
        return Number(prod.id) !== Number(action.payload.id)
      });
      newProducts.push(action.payload)      
      state.allProducts = newProducts;
    },

    //Categori
    setNewCategori: (state, action: PayloadAction<Category>) =>{
      state.allCategori = [...state.allCategori, action.payload]       
    },
    setAllCategori: (state, action: PayloadAction<Category[] | []>) =>{
      state.allCategori = action.payload;
    },
    setUpdateCategori: (state, action: PayloadAction<Category>) => {
      const newCategori = state.allCategori.filter((cat) => cat.id != action.payload.id);
      newCategori.push(action.payload);
      state.allCategori = newCategori;
    },    
    //Presentacion
    setNewPresentacion: (state, action: PayloadAction<Presentacion>) =>{
      state.allPresentacion = [...state.allPresentacion, action.payload]       
    },
    setAllPresentacion: (state, action: PayloadAction<Presentacion[] | []>) =>{
      state.allPresentacion = action.payload;
    },
    setUpdatePresentacion: (state, action: PayloadAction<Presentacion>) => {
      const newPresentacion = state.allPresentacion.filter((present) => present.id != action.payload.id);
      newPresentacion.push(action.payload);
      state.allPresentacion = newPresentacion;
    },
    //Departamentos
    setNewDepartamento: (state, action: PayloadAction<Departamento>) =>{
      state.allDepartamentos = [...state.allDepartamentos, action.payload]       
    },
    setAllDepartamento: (state, action: PayloadAction<Departamento[] | []>) =>{
      state.allDepartamentos = action.payload;
    },
    setUpdateDepartamento: (state, action: PayloadAction<Departamento>) => {
      const newDepartamento = state.allDepartamentos.filter((depart) => depart.id != action.payload.id);
      newDepartamento.push(action.payload);
      state.allDepartamentos = newDepartamento;
    },
    //rate
    setRate: (state, action: PayloadAction<TypeRate>) => {
      state.rate = action.payload;
    }, */
  }
});


export const { 
  setAllOrders, 
  } = orderSlices.actions;

export default orderSlices.reducer;
