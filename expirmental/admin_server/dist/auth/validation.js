'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatYupError = exports.userValidation = undefined;

var _yup = require('yup');

var yup = _interopRequireWildcard(_yup);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const emailNotLongEnough = 'email must be at least 3 characters';
const emailTooLong = 'email must be less than 255 characters';
const invalidEmail = 'email must be a valid email';
const passwordNotLongEnough = 'password must be at least 3 characters';
const passwordTooLong = 'password must be less than 255 characters';

const registerPasswordValidation = yup.string().min(3, passwordNotLongEnough).max(255);

const registerEmailValidation = yup.string().min(3, emailNotLongEnough).max(255).email(invalidEmail);

const userValidation = exports.userValidation = yup.object().shape({
  resetId: yup.bool(),
  reset: yup.string(),
  email: registerEmailValidation,
  password: registerPasswordValidation
});

const formatYupError = exports.formatYupError = err => {
  const errors = err.inner.map(e => ({
    path: e.path,
    message: e.message
  }));
  return errors;
};
//# sourceMappingURL=validation.js.map