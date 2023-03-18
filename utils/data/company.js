import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getCompany = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/companies/${id}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const createCompany = (obj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/companies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const updateCompany = (obj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/companies/${obj.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then((response) => resolve(response.json))
    .catch(reject);
});

const updateCompanyLogo = (obj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/companies/${obj.cid}/logoadd`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const deleteCompany = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/companies/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export {
  getCompany, createCompany, updateCompany, deleteCompany, updateCompanyLogo,
};
