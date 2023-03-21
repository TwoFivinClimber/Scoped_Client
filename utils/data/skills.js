import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getSkills = (cid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/skills?cid=${cid}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const getUserSkills = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/userskills?uid=${id}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const createSkill = (obj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/skills`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then(resolve)
    .catch(reject);
});

const deleteSkill = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/skills/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const createUserSkills = (obj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/userskills`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then(resolve)
    .catch(reject);
});

export {
  getSkills, getUserSkills, createUserSkills, createSkill, deleteSkill,
};
