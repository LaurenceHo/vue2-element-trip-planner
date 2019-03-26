const SERVER_URL = 'http://localhost:3000/api/';

const checkStatus = (response: any) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(response.statusText);
  }
};

const parseJSON = (response: any) => response.json();

export const getAllTrips = () => {
  return fetch(SERVER_URL + 'trip', {
    method: 'POST'
  }).then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(error => console.error('request failed', error));
};

export const getTripDetail = (id: number) => {
  return fetch(SERVER_URL + `trip/${id}`, {
    method: 'GET'
  }).then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(error => console.error('request failed', error));
};
