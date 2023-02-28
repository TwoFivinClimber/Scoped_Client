import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const findPlace = (input) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/place?input=${input}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const getLocationDetails = (placeId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/detail?placeId=${placeId}`)
    .then((response) => resolve(response.json()))
    .catch((response) => reject(response));
});

export { findPlace, getLocationDetails };
