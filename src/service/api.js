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

export async function getUser(data) {
  const res = await axiosWithAuth.post("/api/v1/auth/user", JSON.stringify(data));
  if (res.status !== 200) {
    throw res.data;
  }
  return res.data;
}

export async function reset(data) {
  const res = await axiosDefault.post("/api/v1/auth/reset", JSON.stringify(data));
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

export async function create(create) {
  const res = await axiosWithAuth.post("/api/groups/create", JSON.stringify(create));
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

export async function getAllMessages(accessCode) {
  const res = await axiosWithAuth.get("/api/groups/getMessages/" + accessCode);
  if (res.status !== 200) {
    throw res.data;
  }
  return res.data;
}

export async function getBindings(accessCode) {
  const res = await axiosWithAuth.get("/api/groups/count/" + accessCode);
  if (res.status !== 200) {
    throw res.data;
  }
  return res.data;
}

export async function getChat(data) {
  console.log(JSON.stringify(data))
  const res = await axiosWithAuth.post("/api/groups/getChatData", JSON.stringify(data));
  if (res.status !== 200) {
    throw res.data;
  }
  return res.data;
}
export async function closeChat(data) {
  console.log(JSON.stringify(data))
  const res = await axiosWithAuth.post("/api/groups/closeChat", JSON.stringify(data));
  if (res.status !== 200) {
    throw res.data;
  }
  return res.data;
}

export async function openChat(data) {
  console.log(JSON.stringify(data))
  const res = await axiosWithAuth.post("/api/groups/openChat", JSON.stringify(data));
  if (res.status !== 200) {
    throw res.data;
  }
  return res.data;
}

export async function getTime(data) {
  console.log(JSON.stringify(data))
  const res = await axiosWithAuth.post("/api/groups/getTime", JSON.stringify(data));
  if (res.status !== 200) {
    throw res.data;
  }
  return res.data;
}

export async function changePrompt(data) {
  console.log(JSON.stringify(data))
  const res = await axiosWithAuth.post("/api/ai/changePrompt", JSON.stringify(data));
  if (res.status !== 200) {
    throw res.data;
  }
  return res.data;
}
export async function getPrompt(data) {
  const res = await axiosWithAuth.get("/api/ai/getPrompt/"+ data);
  if (res.status !== 200) {
    throw res.data;
  }
  return res.data;
}