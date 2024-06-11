import axiosClient from "./AxiosClient";

class UserApi {

    register = async (data: object) => {
        const url = "/api/register";
        return await axiosClient.post(url, data);
    }

    verifyOtp = async (data: object) => {
        const url = '/api/register/check-otp';
        return await axiosClient.post(url, data);
    }

    addInformation = async (data: object) => {
        const url = 'api/user/create/information';
        return await axiosClient.post(url, data);
    }

    loan = async (data: object) => {
        const url = 'api/user/create/application';
        return await axiosClient.post(url, data);
    }
}

export default new UserApi();

