import axios from '../api/axios';

const API_URL = '/endpoints.json';

const getAllData = () => {
  return axios.get(API_URL);
};

const endpointService = {
    getAllData,
};

export default endpointService;
