import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface UserState {
  id: string
  name: string
  email: string
  address?: string
  occupation?: string
  birthDate?: string | null
  role: string
  profilePic: string | null
}

const initialState: UserState = {
  id: "",
  name: "",
  email: "",
  address: "",
  occupation: "",
  birthDate: null,
  role:"USER",
  profilePic: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload }
    },
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload }
    },
    clearUser: () => initialState,
  },
})

export const { setUser, updateUser, clearUser } = userSlice.actions
export default userSlice.reducer
