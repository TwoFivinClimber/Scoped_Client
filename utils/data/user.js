import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getUser = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${id}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getUser };
