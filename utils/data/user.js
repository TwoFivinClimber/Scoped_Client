import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getUser = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${id}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const getCrewForJob = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users?job=${id}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

export { getUser, getCrewForJob };
