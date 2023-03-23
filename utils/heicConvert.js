import heic2any from 'heic2any';

const convertHeic = async (file) => {
  const jpeg = await heic2any({
    blob: file,
    toType: 'image/jpeg',
  });
  return jpeg[0];
};

export default convertHeic;
