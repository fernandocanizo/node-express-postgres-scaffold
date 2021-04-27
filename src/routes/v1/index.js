const rfr = require('rfr');
const express = require('express');

const authRoute = rfr('/src/routes/v1/auth.route');
const userRoute = rfr('/src/routes/v1/user.route');
const docsRoute = rfr('/src/routes/v1/docs.route');
const config = rfr('/src/config/config');

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

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
