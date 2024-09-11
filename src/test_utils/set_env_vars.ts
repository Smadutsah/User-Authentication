const env = process.env;

process.env = {
  ...env,
  NODE_ENV: 'test'
};
