import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getEmployees = (cid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/employees?cid=${cid}`)
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const deleteEmployee = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/employees/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getEmployees, deleteEmployee };
