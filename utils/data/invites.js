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
    .then((response) => resolve(response.json()))
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

const getInvitesByCompany = (cid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/invites?cid=${cid}`)
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const getCmpInvitesByUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/invites?uid=${uid}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const createInvite = (obj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/invites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then(resolve)
    .catch(reject);
});

const deleteInvite = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/invites/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export {
  getInvitesByUser, acceptJob, declineJob, reSendJob, createInvite, deleteInvite, getInvitesByCompany, getCmpInvitesByUser,
};
