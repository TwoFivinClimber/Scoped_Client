import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const findPlace = (input) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/place?input=${input}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { findPlace };
