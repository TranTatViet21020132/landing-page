import axios from 'axios';
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request` for the full list of configs

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/',
});
axiosClient.interceptors.request.use(async (config) => {
    const token = await localStorage.getItem('accessToken');

    if (token) {
        const accessToken = JSON.parse(token)
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json';

    return config;
})
axiosClient.interceptors.response.use((response) => {
    if (response && (response.data || response.data === 0)) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    return error.response;
});
export default axiosClient;