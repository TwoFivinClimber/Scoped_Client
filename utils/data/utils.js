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

// eslint-disable-next-line import/prefer-default-export
export { createJobImage };
