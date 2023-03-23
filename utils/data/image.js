import { clientCredentials } from '../client';
import { createJobImage } from './utils';

const dbUrl = clientCredentials.databaseURL;

const createJobImages = (imageArr) => new Promise((resolve, reject) => {
  const createImages = imageArr.map((image) => createJobImage(image));
  Promise.all(createImages)
    .then(resolve)
    .catch(reject);
});

const deleteImage = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/images/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const updateImage = (obj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/images/${obj.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then(resolve)
    .catch(reject);
});

export {
  createJobImages, deleteImage, updateImage,
};
