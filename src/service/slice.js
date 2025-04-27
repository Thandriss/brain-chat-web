import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import * as api from "./api";

const initialState = {
  user: undefined,
  chats: [],
  createdChat: "",
  isAuth: false,
  isLoading: false,
  currentMessages: [],
  userRegistr: {
    name: "",
    email: "",
  },
  error: false,
  errorMessage: "",
  errorExistMessage: "",
  currentChat: undefined,
};
  
export const register = createAsyncThunk("register", async (data) => api.register(data));
  
export const login = createAsyncThunk("login", async (data) => api.login(data));

export const getUser = createAsyncThunk("getUser", async (data) => api.getUser(data));

export const reset = createAsyncThunk("reset", async (data) => api.reset(data));

export const confirm = createAsyncThunk("confirm", async (data) => api.confirm(data));

export const create = createAsyncThunk("create", async (data) => api.create(data));

export const join = createAsyncThunk("join", async (data) => api.join(data));

export const send = createAsyncThunk("send", async (data) => api.send(data));

export const getChat = createAsyncThunk("getChat", async (data) => api.getChat(data));

export const closeChat = createAsyncThunk("closeChat", async (data) => api.closeChat(data));

export const openChat = createAsyncThunk("openChat", async (data) => api.openChat(data));

export const getTime = createAsyncThunk("getTime", async (data) => api.getTime(data));

export const getPrompt = createAsyncThunk("getPrompt", async (data) => api.getPrompt(data));

export const changePrompt = createAsyncThunk("changePrompt", async (data) => api.changePrompt(data));

export const getBindings = createAsyncThunk("getBindings", async (data) => api.getBindings(data));

export const getAllChats = createAsyncThunk("getAllChats", async () => api.getAllChats());

export const bind = createAsyncThunk("bind", async (data) => api.bind(data));

export const getMessages = createAsyncThunk("getAllMessages", async (data) => api.getAllMessages(data));

const slice = createSlice({
    name: "slice",
    initialState,
    reducers: {
      logout(state) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("adminToken");
        state.user = undefined;
        state.isAuth = false;
      },
      setUserRegistr(state, action) {
        state.userRegistr = action.payload;
      },
      clearUserRigistr(state) {
        state.userRegistr = {
          name: "",
        };
      },
      clearError(state) {
        state.error = false;
      },
      clearErrorMessage(state) {
        state.errorMessage = "";
      },
      clearErrorExistMessage(state) {
        state.errorExistMessage = "";
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(register.fulfilled, (state, action) => {
        console.log("Full")
        state.isLoading = false;
        if (action.payload.message) {
          state.errorExistMessage = action.payload.message;
        } else {
          console.log(action.payload)
          state.user = action.payload;
          console.log(state.user)
          state.errorExistMessage = "";
          state.userRegistr = {
            fullName: "",
            email: "",
          };
        }
      })
        .addCase(getUser.rejected, (state, action) => {
          state.errorMessage = action.error.message;
          state.isLoading = false;
        })
        .addCase(getUser.pending, (state) => {
          state.isLoading = true;
          state.errorMessage = "";
        })
        .addCase(getUser.fulfilled, (state, action) => {
          state.isLoading = false;
          if (action.payload.message) {
            state.errorExistMessage = action.payload.message;
          } else {
            console.log(action.payload)
            state.user = action.payload;
            console.log(state.user)
            state.errorExistMessage = "";
            state.userRegistr = {
              fullName: "",
              email: "",
            };
          }
        })
          .addCase(register.rejected, (state, action) => {
            state.errorMessage = action.error.message;
            state.isLoading = false;
          })
          .addCase(register.pending, (state) => {
            state.isLoading = true;
            state.errorMessage = "";
          })
        .addCase(bind.fulfilled, (state, action) => {
          state.isLoading = false;
        })
        .addCase(bind.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(bind.rejected, (state) => {
          state.error = true;
          state.isLoading = false;
        })
        .addCase(getChat.fulfilled, (state, action) => {
          state.currentChat = action.payload;
          state.isLoading = false;
        })
        .addCase(getChat.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getChat.rejected, (state) => {
          state.error = true;
          state.isLoading = false;
        })
        .addCase(closeChat.fulfilled, (state, action) => {
          state.currentChat = action.payload;
          state.isLoading = false;
        })
        .addCase(closeChat.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(closeChat.rejected, (state) => {
          state.error = true;
          state.isLoading = false;
        })
        .addCase(openChat.fulfilled, (state, action) => {
          state.currentChat = action.payload;
          state.isLoading = false;
        })
        .addCase(openChat.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(openChat.rejected, (state) => {
          state.error = true;
          state.isLoading = false;
        })
        .addCase(getTime.fulfilled, (state, action) => {
          // state.currentChat = action.payload;
          state.isLoading = false;
        })
        .addCase(getTime.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getTime.rejected, (state) => {
          state.error = true;
          state.isLoading = false;
        })
        .addCase(getPrompt.fulfilled, (state, action) => {
          state.isLoading = false;
        })
        .addCase(getPrompt.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getPrompt.rejected, (state) => {
          state.error = true;
          state.isLoading = false;
        })
        .addCase(getAllChats.fulfilled, (state, action) => {
          state.chats = action.payload;
        })
        .addCase(getAllChats.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllChats.rejected, (state) => {
          state.error = true;
          state.isLoading = false;
        })
        .addCase(send.fulfilled, (state, action) => {
          console.log("sent");
        })
        .addCase(send.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(send.rejected, (state) => {
          state.error = true;
          state.isLoading = false;
        })
        .addCase(create.fulfilled, (state, action) => {
          state.createdChat = action.payload;
        })
        .addCase(create.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(create.rejected, (state) => {
          state.error = true;
          state.isLoading = false;
        })
        .addCase(confirm.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(confirm.rejected, (state) => {
          state.error = true;
          state.isLoading = false;
        })
        .addCase(confirm.fulfilled, (state, action) => {
          // state.user = action.payload;
          state.isLoading = false;
        })
        .addCase(login.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(login.rejected, (state) => {
          state.error = true;
          state.isLoading = false;
        })
        .addCase(login.fulfilled, (state, action) => {
          const { accessToken, refreshToken, adminToken } = action.payload;
          Cookies.set("accessToken", accessToken, { expires: 1 / 12, secure: true, sameSite: "strict" });
          Cookies.set("refreshToken", refreshToken, { expires: 30, secure: true, sameSite: "strict" });
          Cookies.set("adminToken", adminToken, { expires: 30, secure: true, sameSite: "strict" });
          state.isLoading = false;
          state.isAuth = true;
          state.errorExistMessage = "";
          state.userRegistr = {
            fullName: "",
            email: "",
          };
        })
        .addCase(reset.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(reset.rejected, (state) => {
          state.error = true;
          state.isLoading = false;
        })
        .addCase(reset.fulfilled, (state, action) => {
          
        })
        .addCase(join.fulfilled, (state, action) => {
          state.chats.push(action.payload);
        })
        .addCase(join.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(join.rejected, (state) => {
          state.error = true;
          state.isLoading = false;
        })
        .addCase(getMessages.fulfilled, (state, action) => {
          state.currentMessages = action.payload;
        })
        .addCase(getMessages.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getMessages.rejected, (state) => {
          state.error = true;
          state.isLoading = false;
          state.currentMessages = [];
        })
        .addCase(getBindings.fulfilled, (state, action) => {
          // state.currentMessages = action.payload;
        })
        .addCase(getBindings.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getBindings.rejected, (state) => {
          state.error = true;
          state.isLoading = false;
          state.currentMessages = [];
        })
        
    },
});
  
export const { logout, setUserRegistr, clearUserRigistr, clearError, clearErrorMessage, clearErrorExistMessage } = slice.actions;
export default slice.reducer;