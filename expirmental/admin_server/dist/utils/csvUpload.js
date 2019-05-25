'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _csv2json = require('csv2json');

var _csv2json2 = _interopRequireDefault(_csv2json);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const uploadDir = '../tmp';

exports.default = ({ stream, companyName }) => {
  // Ensure upload directory exists
  _mkdirp2.default.sync(uploadDir);
  const filePath = `${uploadDir}${companyName}.json`;
  _fs2.default.unlinkSync(filePath);
  return new Promise((resolve, reject) => stream.pipe((0, _csv2json2.default)({
    // Defaults to comma.
    separator: ','
  })).pipe(_fs2.default.createWriteStream(filePath)).on('error', error => reject(error)).on('finish', () => resolve({ filePath })));
};
//# sourceMappingURL=csvUpload.js.map