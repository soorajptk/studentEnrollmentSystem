const CustomError = require('../errors');
const { isTokenValid } = require('../utils');
const studentToken = require('../models/studentToken');
const employeeToken = require('../models/employeeToken');
const adminToken = require('../models/adminToken');
const { attachCookiesToResponse } = require('../utils');
const authenticateUser = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;
  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }

    const payload = isTokenValid(refreshToken);
    let model
    if(payload.user.role==='admin'){
      model=adminToken
    }
    if(payload.user.role==='employee'){
      model=employeeToken
    }
    if(payload.user.role==='student'){
      model=studentToken
    }

    const existingToken = await model.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });
    if (!existingToken || !existingToken?.isValid) {
      throw new CustomError.unauthenticated('Authentication Invalid');
    }

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });

    req.user = payload.user;
    next();
  } catch (error) {
    throw new CustomError.unauthenticated('Authentication Invalid');
  }
};

const authorizePermissions = ([...roles]) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
