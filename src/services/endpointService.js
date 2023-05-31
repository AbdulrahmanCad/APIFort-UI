import { api } from "../api/axios";

const API_URL = "/admin-api";
const axios = api;

const getAllData = (name) => {
  return axios.get(API_URL + "/" + name + "/endpoints");
};

const getEndpoint = (name) => {
  return axios.get(API_URL + "/" + name + "/endpoints",);
};

const getService = (name) => {
  return axios.get(API_URL + "/" + name + "/service",);
};

const updateAccess = (name, data) => {
  return axios.put(API_URL + "/" + name + "/endpoint", data,);
};

const updateEndpoint = (name, data) => {
  return axios.put(API_URL + "/" + name + "/endpoint", data,);
};

const postService = (profileName, data) => {
  return axios.post(API_URL + "/" + profileName + "/service", data,);
};

const deleteService = (serviceName, context) => {
  return axios.delete(API_URL + "/" + serviceName + "/service/" + context,);
};

const postEndpoint = (profileName, data) => {
  return axios.post(API_URL + "/" + profileName + "/endpoint", data,);
};

const deleteEndpoint = (profileName, id) => {
  return axios.delete(API_URL + "/" + profileName + "/endpoint/" + id,);
};

const endpointService = {
  getAllData,
  getService,
  getEndpoint,
  updateAccess,
  updateEndpoint,
  postService,
  deleteService,
  postEndpoint,
  deleteEndpoint,
};

export default endpointService;
