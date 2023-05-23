import axios from 'axios';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';

const api = axios.create({
  baseURL: 'http://localhost:8787',
});

const AxiosInterceptor = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  api.interceptors.response.use(
    (response) => {
      if (response.config.method === 'delete') {
        setMessage('Item deleted successfully');
        setOpen(true);
      }
      return response;
    },
    (error) => {
      if (error.response.status === 400) {
        setMessage(`Error: ${error.response.data.message}`);
        setOpen(true);
      }
      return Promise.reject(error);
    }
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={message}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
     }}
      ContentProps={{
        sx: {
          background: "red"
        }
      }}
    />
  );
};

export { api, AxiosInterceptor };