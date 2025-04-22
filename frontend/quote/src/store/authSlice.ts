import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookie from "js-cookie";
axios.defaults.withCredentials = true;

interface LoginPayload {
  username: string;
  password: string;
}
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData: LoginPayload, { rejectWithValue }) => {
    try {
        await axios.post("http://localhost:8000/api/users/", {
        username:userData.username,
        password:userData.password,
      });
      return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error){
      return rejectWithValue("invalid credentials");
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async () => {
    const csrftoken = Cookie.get("csrftoken")
    const res = await axios.get("http://localhost:8000/api/users/session/", { headers: {'X-CSRFToken': csrftoken, 'Content-Type': 'application/json'}}).then((res)=>{return res})
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logout", 
  async()=>{
    const csrftoken = Cookie.get("csrftoken")
    const res = await axios.post("http://localhost:8000/api/users/logout/", {} ,{ headers: {'X-CSRFToken': csrftoken, 'Content-Type': 'application/json'}, }).then((res)=>{return res})
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  }
)
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = true;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string | null;
      state.isAuthenticated = false;
    })
    .addCase(checkAuthStatus.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.loading = false;
    })
    .addCase(checkAuthStatus.rejected, (state) => {
      state.isAuthenticated = false;
      state.loading = false;
    })
    .addCase(logoutUser.fulfilled, (state)=>{
      state.isAuthenticated = false;
      state.loading = false
    })
    .addCase(logoutUser.rejected, (state, action)=>{
      state.error = action.payload as string | null;
    })
    .addCase(logoutUser.pending, (state)=>{
      state.loading = true
    })

  },
});
export default authSlice.reducer;
