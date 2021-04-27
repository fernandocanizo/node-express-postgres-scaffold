const rfr = require('rfr');
const express = require('express');
const config = require('config');

const authRoute = rfr('/src/routes/v1/auth');
const userRoute = rfr('/src/routes/v1/user');
const docsRoute = rfr('/src/routes/v1/docs');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach(route => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
