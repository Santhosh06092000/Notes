import axios from "axios";

const api = axios.create({ baseURL: `${import.meta.env.VITE_APP_API_URL}` });

// request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    // config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    /*      error handling       */

    // const originalRequest = error.config;

    // console.log(originalRequest);

    // expired token
    if (
      error.response.status === 401
      // &&originalRequest.url === 'http://127.0.0.1:3000/v1/auth/token'
    ) {
      // router.push('/login')
      return Promise.reject(error);
    }

    // refresh token
    // if (error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true
    //   const refreshToken = localStorageService.getRefreshToken()
    //   return axios
    //     .post('/auth/token', {
    //       refresh_token: refreshToken
    //     })
    //     .then(res => {
    //       if (res.status === 201) {
    //         localStorageService.setToken(res.data)
    //         axios.defaults.headers.common['Authorization'] =
    //           'Bearer ' + localStorageService.getAccessToken()
    //         return axios(originalRequest)
    //       }
    //     })
    // }
    return Promise.reject(error);
  }
);

export default api;
