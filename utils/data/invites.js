import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getInvitesByUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/crews?uid=${uid}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const acceptJob = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/crews/${id}/accept`, {
    method: 'PUT',
  })
    .then((response) => response.json)
    .catch(reject);
});

const declineJob = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/crews/${id}/decline`, {
    method: 'PUT',
  })
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const reSendJob = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/crews/${id}/re_send`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

export {
  getInvitesByUser, acceptJob, declineJob, reSendJob,
};
