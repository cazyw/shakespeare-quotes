'use strict';

const config = {
  production: {
    database: `${process.env.MONGODB_URI}`
  },

  development: {
    database: 'mongodb://mongo:27017/shakespeare'
  },

  test: {
    database: 'mongodb://mongo:27017/testDatabase'
  },

  default: {
    database: 'mongodb://mongo:27017/shakespeare'
  }
};

exports.get = function get(env) {
  return config[env] || config.default;
};
