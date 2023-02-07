import axios from '../api/axios';

const API_URL = '/profiles.json';

const getProfile = (id) => {
  return axios.get(API_URL + `/${id}`);
};

const getAllData = () => {
  return axios.get(API_URL);
};

const postProfile = (data) => {
  return axios.post(API_URL, data);
};

const profileService = {
    getProfile,
    getAllData,
    postProfile
};

export default profileService;
