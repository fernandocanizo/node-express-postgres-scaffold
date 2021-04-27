const rfr = require('rfr');

const { version } = rfr('/package.json');
const config = rfr('/src/config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'neps API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/fernandocanizo/node-express-postgres-scaffold/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
