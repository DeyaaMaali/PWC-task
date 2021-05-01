import axios from "axios";

const baseUrl = "http://localhost:5000/api";

const axiosConfig = {
  withCredentials: true, // to work locally
};

//response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.response.data.type != "refreshToken"
    ) {
      originalRequest._retry = true;
      return axios
        .get(
          `${baseUrl}/users/refreshToken`,
          axiosConfig // to work locally
        )
        .then((res) => {
          if (res.status === 200) {
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

//functions to make api calls

const api = {
  login: (credentials) => {
    return axios.post(`${baseUrl}/users/login`, credentials, axiosConfig);
  },
  logout: () => {
    return axios.post(`${baseUrl}/users/logout`, {}, axiosConfig);
  },
  register: (body) => {
    return axios.post(`${baseUrl}/users/register`, body, axiosConfig);
  },
  getComplaints: (params) => {
    return axios.get(`${baseUrl}/complaints`, { ...axiosConfig, params });
  },
  updateComplaintStatus: (id, status) => {
    return axios.patch(`${baseUrl}/complaints/${id}`, { status }, axiosConfig);
  },
  getUserComplaints: (params) => {
    return axios.get(`${baseUrl}/users/complaints`, { ...axiosConfig, params });
  },
  createComplaint: (complaint) => {
    return axios.post(`${baseUrl}/complaints`, complaint, axiosConfig);
  },
};

export default api;
