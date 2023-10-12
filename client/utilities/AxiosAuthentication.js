import axios from "axios";

const AuthenticationAxios = (token) => {
  return axios.create({
    baseURL: "http://localhost:3000/api/v1",
  });
};

export default AuthenticationAxios;
