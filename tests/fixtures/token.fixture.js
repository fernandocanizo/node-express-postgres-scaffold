const rfr = require('rfr');
const moment = require('moment');

const config = rfr('/src/config/config');
const { tokenTypes } = rfr('/src/config/tokens');
const tokenService = rfr('/src/services/token.service');
const { userOne, admin } = rfr('/tests/fixtures/user.fixture');

const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
const userOneAccessToken = tokenService.generateToken(userOne._id, accessTokenExpires, tokenTypes.ACCESS);
const adminAccessToken = tokenService.generateToken(admin._id, accessTokenExpires, tokenTypes.ACCESS);

module.exports = {
  userOneAccessToken,
  adminAccessToken,
};
