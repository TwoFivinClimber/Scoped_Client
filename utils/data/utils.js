import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const createJobImage = (imageObj) => new Promise((resolve, reject) => {
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

const createCompanyImage = (imageFile) => new Promise((resolve, reject) => {
  const key = Math.floor(1000 + Math.random() * 9000);
  const formdata = new FormData();
  formdata.append('image', imageFile);
  formdata.append('key', `${key}${imageFile.name}`);
  const requestOptions = {
    method: 'POST',
    body: formdata,
  };
  fetch(`${dbUrl}/images`, requestOptions)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

export { createJobImage, createCompanyImage };
