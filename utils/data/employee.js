import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getEmployees = (cid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/employees?cid=${cid}`)
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getEmployees };
