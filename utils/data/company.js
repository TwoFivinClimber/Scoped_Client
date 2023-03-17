import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getCompany = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/companies/${id}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const createCompany = (obj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/companies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then((response) => resolve(response.json()))
    .catch(reject);
});

export { getCompany, createCompany };
