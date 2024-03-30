import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserStatus, TipoDniType } from './typeUser';
import { UserInfo } from '../../../auth/typesProtecterRoute';


const initialState: UserStatus = {
  user: null,
  allTipoDni: []
}

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
    },
    setAllTipoDni: (state, action: PayloadAction<TipoDniType[] | []>) => {
      state.allTipoDni = action.payload;
    },
    setNewTipoDni: (state, action:PayloadAction<TipoDniType>)=> {
      state.allTipoDni = [...state.allTipoDni, action.payload]
    }
  }
})

export const{
  setUser,
  setAllTipoDni,
  setNewTipoDni
} = userSlice.actions;

export default userSlice.reducer;