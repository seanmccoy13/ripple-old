'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forgotPasswordLockAccount = undefined;

var _removeAllUsersSessions = require('./removeAllUsersSessions');

var _models = require('../models');

const forgotPasswordLockAccount = exports.forgotPasswordLockAccount = async (userId, redis) => {
  await _models.User.update({ id: userId }, { forgotPasswordLocked: true });
  await (0, _removeAllUsersSessions.removeAllUsersSessions)(userId, redis);
};
//# sourceMappingURL=forgotPasswordLockAccount.js.map