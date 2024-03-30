import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductState, Product, Category, Presentacion, TypeRate } from './typesProducts';


const initialState: ProductState = {
  allProducts: [],
  allCategori: [],
  allPresentacion: [],
  rate : null,
}

const productSlices = createSlice({
  name: 'product',
  initialState,
  reducers: {
    //Producto
    setAllProduct: (state, action: PayloadAction<Product[] | []>) => {
      state.allProducts = action.payload;
    },
    setNewProduct: (state, action: PayloadAction<Product>) =>{
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

    //rate
    setRate: (state, action: PayloadAction<TypeRate>) => {
      state.rate = action.payload;
    },
  }
});


export const { 
  setAllProduct, 
  setNewCategori, 
  setAllCategori, 
  setUpdateCategori, 
  setNewProduct,
  setAllPresentacion,
  setNewPresentacion,
  setUpdatePresentacion,
  setUpdateProduct,
  setRate } = productSlices.actions;

export default productSlices.reducer;
