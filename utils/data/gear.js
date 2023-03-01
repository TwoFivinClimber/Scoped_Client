import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getGear = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/gear`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const createJobGear = (obj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/jobgears`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then(resolve)
    .catch(reject);
});

const updateJobGear = (obj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/jobgears/${obj.jobId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then(resolve)
    .catch(reject);
});

export { getGear, createJobGear, updateJobGear };
