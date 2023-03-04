import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getSingleJob = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/jobs/${id}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const getJobs = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/jobs`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const getJobsByCrew = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/jobs?uid=${uid}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const createJob = (obj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const updateJob = (obj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/jobs/${obj.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteJob = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/jobs/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .then(reject);
});
export {
  getJobsByCrew, getSingleJob, createJob, updateJob, getJobs, deleteJob,
};
