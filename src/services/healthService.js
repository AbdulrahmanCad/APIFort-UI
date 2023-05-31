import { api } from '../api/axios';

const API_URL = '/q/health/ready';
const axios = api;

const getHealth = () => {
  return axios.get(API_URL);
};

const healthService = {
   getHealth,
};

export default healthService;
