'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeFS = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const uploadDir = _path2.default.join(__dirname, '../public/images');

// Ensure upload directory exists
_mkdirp2.default.sync(uploadDir);

const storeFS = exports.storeFS = ({ stream, filename }) => {
  const id = _uuid2.default.v4();
  const path = `${uploadDir}/${id}-${filename}`;
  return new Promise((resolve, reject) => stream.on('error', error => {
    if (stream.truncated)
      // Delete the truncated file
      _fs2.default.unlinkSync(path);
    reject(error);
  }).pipe(_fs2.default.createWriteStream(path)).on('error', error => reject(error)).on('finish', () => resolve({ path })));
};
//# sourceMappingURL=imageUpload.js.map