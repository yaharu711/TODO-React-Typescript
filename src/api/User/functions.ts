import axios, { AxiosResponse } from "axios";
import { LoginRequest } from "./type";

const ENDPOINT: string = import.meta.env.VITE_API_URL;

const login = async (request: LoginRequest): Promise<AxiosResponse> => {
  const res = await axios.post(ENDPOINT + "/login", request, {
    withCredentials: true,
  });
  return res;
};

const UserApi = {
  login,
};

export default UserApi;
