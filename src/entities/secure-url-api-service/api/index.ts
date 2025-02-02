import axios from 'axios';

export const secureUrlApi = axios.create({
  url: '',
});

export const SecureUrlApiRoutes = {
  scanRequest: 'http://localhost:3000/scanner/scan-url',
};
