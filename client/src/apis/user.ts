import { apiCaller } from "../configs/apiCaller";
import { Register } from "../types/user";

const getProfile = async () => {
  const path = "/user/profile";
  const response = await apiCaller("GET", path);
  return response;
};

const register = async (data: Register) => {
  const path = "api/register";
  const response = await apiCaller("POST", path, data);
  return response;
};

const verifyOTP = async (data: Register) => {
  const path = "api/register/check-otp";
  const response = await apiCaller("POST", path, data);
  return response;
};

export { getProfile };
