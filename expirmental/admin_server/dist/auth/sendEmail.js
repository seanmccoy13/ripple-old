'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmail = undefined;

var _sparkpost = require('sparkpost');

var _sparkpost2 = _interopRequireDefault(_sparkpost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { SPARKPOST_API_KEY } = process.env;
const client = new _sparkpost2.default(SPARKPOST_API_KEY);

const sendEmail = exports.sendEmail = async ({ email, url, resetId }) => {
  const newUrl = `${url}/change-password/${resetId}`;
  const response = await client.transmissions.send({
    options: {
      sandbox: true,
      endpoint: 'https://dev.sparkpost.com:443'
    },
    content: {
      from: 'testing@sparkpostbox.com',
      subject: 'Confirm Email',
      html: `
        <html>
          <body>
            <h1>Ripple - Contagious Attitudes!</h1>
            <h3>Follow this link and login to confirm your account</h3>
            <a href="${newUrl}">Confirm Email</a>
            <p>If you have not initiated this request, please ignore this email.</p>
          </body>
        </html>`
    },
    recipients: [{ address: email }]
  });
  return response;
};
//# sourceMappingURL=sendEmail.js.map