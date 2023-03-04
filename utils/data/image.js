import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const createJobImages = (imageObj) => new Promise((resolve, reject) => {
  const formdata = new FormData();
  formdata.append('image', imageObj.image);
  formdata.append('job', imageObj.job);
  formdata.append('description', imageObj.description);
  formdata.append('key', `${imageObj.job}${imageObj.image.name}`);
  const requestOptions = {
    method: 'POST',
    body: formdata,
  };
  fetch(`${dbUrl}/images`, requestOptions)
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

export { createJobImages, deleteImage, updateImage };
