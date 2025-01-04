import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: number
  email: string
  username: string
  role: string
  complianceStatus: string
}

interface AuthState {
  token: string | null
  mustChangePassword: boolean
  user: User | null
}

const initialState: AuthState = {
  token: null,
  mustChangePassword: false,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<AuthState>) {
      const { token, mustChangePassword, user } = action.payload
      state.token = token
      state.mustChangePassword = mustChangePassword
      state.user = user
    },
    clearAuthData(state) {
      state.token = null
      state.mustChangePassword = false
      state.user = null
    },
  },
})

export const { setAuthData, clearAuthData } = authSlice.actions
export default authSlice.reducer
