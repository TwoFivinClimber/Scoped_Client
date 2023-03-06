import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getSkills = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/skills`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const getUserSkills = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/userskills?uid=${id}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

export { getSkills, getUserSkills };
