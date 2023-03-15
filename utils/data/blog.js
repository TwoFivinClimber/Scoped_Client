import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getCompanyBlog = (cid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/blogs?cid=${cid}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const createBlogPost = (obj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then(resolve)
    .catch(reject);
});

const updateBlogPost = (obj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/blogs/${obj.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then(resolve)
    .catch(reject);
});

const deleteBlogPost = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/blogs/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export {
  getCompanyBlog, createBlogPost, updateBlogPost, deleteBlogPost,
};
