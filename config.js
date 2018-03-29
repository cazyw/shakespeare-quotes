'use strict';

const config = {
  production: {
    database: `${process.env.MONGODB_URI}`
  },

  development: {
    database: 'mongodb://localhost/shakespeare'
  },

  test: {
    database: 'mongodb://localhost/testDatabase'
  },

  default: {
    database: 'mongodb://localhost/shakespeare'
  }
};

exports.get = function get(env) {
  return config[env] || config.default;
};
