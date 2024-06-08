import client from "./client";

const login = (email, password) => {
  return client.post("/get_client_info_token", { email, password });
};
export default {
  login,
};
