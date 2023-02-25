import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getJobMessages = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/messages?job=${id}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const createMessage = (obj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then(resolve)
    .catch(reject);
});

const updateMessage = (obj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/messages/${obj.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then(resolve)
    .catch(reject);
});

const deleteMessage = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/messages/${id}`, {
    method: 'delete',
  })
    .then(resolve)
    .catch(reject);
});

export {
  getJobMessages, createMessage, updateMessage, deleteMessage,
};
