import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getSkills = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/skills`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

export default getSkills;
