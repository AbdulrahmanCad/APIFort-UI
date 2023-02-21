import axios from '../api/axios';

const API_URL = '/endpoints.json';
const API_URL2 = '/profile/';

const getAllData = () => {
  return axios.get(API_URL);
};

const getEndpoint = (id) => {
  return axios.get(API_URL2 + id + ".json");
}

const updateAccess = (data, profileId, serviceId, endpointId) => {
  return axios.put(API_URL2 + profileId + "/services/" + serviceId + "/endpoints/" + endpointId + ".json", data)
}

const endpointService = {
    getAllData,
    getEndpoint,
    updateAccess
};

export default endpointService;