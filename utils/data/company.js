import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getCompany = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/companies/${id}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getCompany };
