import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/storage";
import { baseURL } from "./apiConfig";

const apiClient = create({
  baseURL: baseURL,
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers["x-auth-token"] = authToken;
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }

  const data = await cache.get(url);
  return data ? { ok: true, data } : response;
};

const post = apiClient.post;
apiClient.post = async (url, data, axiosConfig) => {
  const response = await post(url, data, axiosConfig);

  if (response.ok) {
    console.log("response sucess");
    // Optionally, you can handle caching for POST requests if needed
    return response;
  }

  // Handle errors here if necessary
  return response;
};

export default apiClient;
