import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getUser = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${id}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const getAvailableUsers = (cid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users?cid=${cid}`)
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const updateUserProfile = (obj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${obj.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  })
    .then(resolve)
    .catch(reject);
});

const deleteUser = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const getCrewForJob = (id, cid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users?job=${id}&cid=${cid}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const createCrew = (obj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/crews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then(resolve)
    .catch(reject);
});

const updateCrew = (obj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/crews/${obj.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then(resolve)
    .then(reject);
});

const deleteCrew = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/crews/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export {
  getUser, getCrewForJob, createCrew, updateCrew, deleteCrew, deleteUser, updateUserProfile, getAvailableUsers,
};
