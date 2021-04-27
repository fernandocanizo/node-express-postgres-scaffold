const rfr = require('rfr');
const moment = require('moment');
const config = require('config');

const tokenService = rfr('/src/services/token');
const { userOne, admin } = rfr('/tests/fixtures/user.fixture');

const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
const userOneAccessToken = tokenService.generateToken(userOne._id, accessTokenExpires, config.tokenTypes.ACCESS);
const adminAccessToken = tokenService.generateToken(admin._id, accessTokenExpires, config.tokenTypes.ACCESS);

module.exports = {
  userOneAccessToken,
  adminAccessToken,
};
