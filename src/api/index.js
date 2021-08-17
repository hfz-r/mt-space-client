/* eslint-disable import/no-anonymous-default-export */
import httpService from './http';
import investor from './investor';

export default () => {
  const http = httpService();
  const apiUrl = process.env.REACT_APP_API_URL;
  return {
    ...investor({ apiUrl, ...http }),
  };
};
