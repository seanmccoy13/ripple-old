'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendSMS = undefined;

var _goo = require('goo.gl');

var _goo2 = _interopRequireDefault(_goo);

var _messagemediaMessagesSdk = require('messagemedia-messages-sdk');

var _messagemediaMessagesSdk2 = _interopRequireDefault(_messagemediaMessagesSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const controller = _messagemediaMessagesSdk2.default.MessagesController;

const { SMS_KEY, SMS_USER, GOOGLE_API_KEY } = process.env;

_messagemediaMessagesSdk2.default.Configuration.basicAuthUserName = SMS_USER; // Your API Key
_messagemediaMessagesSdk2.default.Configuration.basicAuthPassword = SMS_KEY; // Your Secret Key

// Setup for Google URL Shortner
_goo2.default.setKey(GOOGLE_API_KEY);
_goo2.default.getKey();

// SMS service
const sendSMS = exports.sendSMS = async (mobile, linkUrl, companyName, firstTime) => {
  const shortUrl = await _goo2.default.shorten(linkUrl);
  // const firstBody = `${companyName} has engaged the use of Ripple to be implemented as an easy and efficient device that promotes positive behaviour in your organisation and has been customised specifically to suit the needs of your professional environment. Please click ${shortUrl} and commence completion of this survey`
  // const secondBody = `Ripple – Contagious Attitude notification – Survey required! Please click ${shortUrl} to commence completion`
  const body = `Welcome to Ripple. This is your periodic link to complete the survey approved by ${companyName}. Please click ${shortUrl} to complete Ripple.`;

  const messageBody = new _messagemediaMessagesSdk2.default.SendMessagesRequest({
    "messages": [{
      "content": body,
      "destination_number": mobile,
      "format": "SMS"
    }]
  });

  const sms = await controller.createSendMessages(messageBody, (err, res) => res ? res : err);
  return sms;
};
//# sourceMappingURL=sendSMS.js.map