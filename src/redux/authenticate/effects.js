import { request } from "@helpers";

export const authUser = async params => {
  const formData = new FormData();
  formData.append("username", params.username.trim());
  formData.append("password", params.password);
  try {
    const response = await request.post("/auth/login", formData)
    return response;
  } catch (e) {
    return e.response;
  }
}

export const getUser = async params => {
  try {
    const response = await request.get("/auth/user", {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    })
    return response;
  } catch (e) {
    return e.response;
  }
}
