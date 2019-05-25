'use strict';

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { PORT = 8080 } = process.env;

_server2.default.listen(PORT, () => console.log(`🚀 Server ready at ${PORT}`)); // eslint-disable-line no-console
//# sourceMappingURL=index.js.map