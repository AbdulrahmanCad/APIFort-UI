import { api } from '../api/axios';
import authHeader from './authHeader';

const API_URL = '/admin-api';
const axios = api;

const getProfile = (id) => {
  return axios.get(API_URL + `/${id}.json`);
};

const getAllData = () => {
  return axios.get(API_URL + "/profiles", {headers: authHeader()});
};

const postProfile = (data) => {
  return axios.post(API_URL + "/profile", data, {headers: authHeader()});
};

const deleteProfile = (id) => {
  return axios.delete(API_URL + "/profile/" + id, {headers: authHeader()});
}

const profileService = {
    getProfile,
    getAllData,
    postProfile,
    deleteProfile
};

export default profileService;
