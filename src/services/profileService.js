import axios from '../api/axios';

const API_URL = '/profile';

const getProfile = (id) => {
  return axios.get(API_URL + `/${id}.json`);
};

const getAllData = () => {
  return axios.get(API_URL + ".json");
};

const postProfile = (data) => {
  return axios.post(API_URL + ".json", data);
};

const profileService = {
    getProfile,
    getAllData,
    postProfile
};

export default profileService;
