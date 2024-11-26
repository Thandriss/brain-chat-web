import Cookies from "js-cookie";
import { axiosDefault, axiosWithAuth } from "./authservice";

export async function register(data) {
    const res = await axiosDefault.post("/api/v1/auth/register", JSON.stringify(data));
    if (res.status !== 200 ) {
      throw res.data;
    }
    return res.data;
}

export async function login(data) {
    const res = await axiosDefault.post("/api/v1/auth/login", JSON.stringify(data));
    if (res.status !== 200) {
      throw res.data;
    }
    return res.data;
}

export async function confirm(confirm) {
  console.log(confirm)
  const res = await axiosDefault.post("/api/v1/auth/confirm/"+ confirm.code, JSON.stringify(confirm.email));
  if (res.status !== 200) {
    throw res.data;
  }
  return res.data;
}

export async function create(chatName) {
  const res = await axiosWithAuth.post("/api/groups/create", JSON.stringify(chatName));
  if (res.status !== 200) {
    throw res.data;
  }
  return res.data;
}

export async function send(message) {
  const res = await axiosWithAuth.post("/api/groups/send", JSON.stringify(message));
  if (res.status !== 200) {
    throw res.data;
  }
  return res.data;
}

export async function join(accessCode) {
  const res = await axiosWithAuth.post("/api/groups/join/" + accessCode);
  if (res.status !== 200) {
    throw res.data;
  }
  return res.data;
}

export async function bind(accessCode) {
  const res = await axiosWithAuth.get("/api/groups/bindToChat/" + accessCode);
  if (res.status !== 200) {
    throw res.data;
  }
  return res.data;
}

export async function getAllChats() {
  const res = await axiosWithAuth.get("/api/groups/allChats");
  if (res.status !== 200) {
    throw res.data;
  }
  return res.data;
}