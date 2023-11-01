import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  user: any; 
}


const initialState: UserState = {
  user:{
    displayName:'',
    email: '',
    emailVerified: false,  
    phoneNumber: '',
    photoURL: '',
    uid: '',
  } 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = {  
        displayName: action.payload.displayName, 
        email: action.payload.email,
        emailVerified: action.payload.emailVerified,  
        phoneNumber: action.payload.phoneNumber,
        photoURL: action.payload.photoURL,
        uid: action.payload.uid,
      };
    },
    logoutUser: (state) => {
      state.user = undefined; 
    },
  },
});

// export const { setUser, logoutUser } = userSlice.actions;
// export default userSlice.reducer;