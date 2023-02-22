import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getJobsByCrew = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/jobs?uid=${uid}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getJobsByCrew };
