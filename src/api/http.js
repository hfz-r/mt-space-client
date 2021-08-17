/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import queryString from 'query-string';
import { merge, mergeRight, path, pathOr, prop } from 'ramda';

axios.defaults.withCredentials = false;
axios.defaults.timeout = Infinity;

export default () => {
  const encodeData = (data, contentType, removeDefaultPostData) => {
    const defaultData = {
      //ct: Date.now(),
    };
    const allData = removeDefaultPostData ? data : merge(defaultData, data);

    if (contentType === 'application/x-www-form-urlencoded') {
      return queryString.stringify(allData);
    }
    return allData;
  };

  const getHeaders = (sessionToken, contentType) => {
    const headers = {
      'Content-Type': contentType,
    };
    //if (sessionToken) headers.Authorization = `Bearer ${sessionToken}`;

    return headers;
  };

  const request = ({
    cancelToken,
    contentType = 'application/x-www-form-urlencoded',
    data,
    endPoint,
    headers,
    method,
    removeDefaultPostData,
    sessionToken,
    url,
    ...options
  }) => {
    return axios
      .request({
        url: `${url}${endPoint}`,
        method,
        data: encodeData(data, contentType, removeDefaultPostData),
        headers: mergeRight(getHeaders(contentType, sessionToken), headers),
        cancelToken,
        ...options,
      })
      .catch(error => {
        const errorData = pathOr({}, ['response', 'data'], error);
        const status = path(['response', 'status'], error);
        if (typeof errorData === 'string') throw errorData;
        throw merge(errorData, { status });
      })
      .then(prop('data'));
  };

  const get = ({ data, endPoint, ignoreQueryParams, ...options }) =>
    request({
      ...options,
      method: 'GET',
      endPoint: ignoreQueryParams
        ? endPoint
        : `${endPoint}?${encodeData(
            data,
            'application/x-www-form-urlencoded'
          )}`,
    });
  const deleteRequest = options => request({ method: 'DELETE', ...options });
  const post = options => request({ method: 'POST', ...options });
  const put = options => request({ method: 'PUT', ...options });
  const patch = options => request({ method: 'PATCH', ...options });

  return {
    deleteRequest,
    get,
    post,
    put,
    patch,
  };
};
