/* eslint-disable import/no-anonymous-default-export */
export default ({ apiUrl, get, post }) => {
  const getRebates = payload =>
    get({
      url: apiUrl,
      endPoint: '/rebates',
      contentType: 'application/json',
      removeDefaultPostData: true,
      data: payload,
    });

  return { getRebates };
};
