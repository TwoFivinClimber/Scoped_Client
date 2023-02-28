import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getGear = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/gear`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getGear };
