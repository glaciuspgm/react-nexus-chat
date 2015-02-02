export default {
  render: {
    port: 8000,
  },

  flux: {
    protocol: 'http',
    hostname: 'localhost',
    port: 8080,
  },

  analytics: {
    UA: 'UA-XXXXX-X',
  },

  app: {
    heartbeat: 5000,
    nicknameLength: 10,
    messageLength: 128,
  },
};
