module.exports = {
  reactStrictMode: true,
  // I don't want it to run when compiling as I trust the CI stage of the pipeline and Husky.
  images: {
    domains: ['res.cloudinary.com'],
  },
  ignoreDuringBuilds: true,

};
// /(https://res.cloudinary.com/twofiveclimb/image/upload/v1664024552/mad-app/cr69tv9cqzzppqasqkj5.jpg)/
