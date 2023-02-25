import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getSingleJob = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/jobs/${id}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const getJobsByCrew = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/jobs?uid=${uid}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

export { getJobsByCrew, getSingleJob };
