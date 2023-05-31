import { api } from '../api/axios';

const API_URL = '/admin-api';
const axios = api;

const getAllData = () => {
  return axios.get(API_URL + "/profiles",);
};

const postProfile = (data) => {
  return axios.post(API_URL + "/profile", data,);
};

const deleteProfile = (id) => {
  return axios.delete(API_URL + "/profile/" + id,);
}

const syncProfile = (id) => {
  return axios.post(API_URL + "/cache/" + id,{},);
}

const profileService = {
    getAllData,
    postProfile,
    deleteProfile,
    syncProfile
};

export default profileService;
