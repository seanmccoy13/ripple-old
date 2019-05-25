'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

var _sendSMS = require('../server/utils/sendSMS');

var _constants = require('../server/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = ({ CompanyModel, EmployeeModel }) => {
  let monthlyMondaySchedule = new _nodeSchedule2.default.RecurrenceRule();
  monthlyMondaySchedule.dayOfWeek = 1;
  monthlyMondaySchedule.hour = 8;
  monthlyMondaySchedule.minute = 0;
  monthlyMondaySchedule.dayOfMonth = [1, 2, 3, 4, 5, 6, 7];

  let monthlySundaySchedule = new _nodeSchedule2.default.RecurrenceRule();
  monthlySundaySchedule.hour = 11;
  monthlySundaySchedule.minute = 59;
  monthlySundaySchedule.dayOfMonth = 28;

  let startMonthSchedule = _nodeSchedule2.default.scheduleJob(monthlyMondaySchedule, function () {
    let companies = CompanyModel.find({ schedule: 'monthly' }).exec();
    companies.forEach(async ({ companyName }) => {
      const employees = await EmployeeModel.find({
        companyName
      }).exec();
      employees.forEach(async ({ mobile, companyName, firstTime }) => {
        await EmployeeModel.findOneAndUpdate({ mobile }, { surveyOwed: true });
        await (0, _sendSMS.sendSMS)(mobile, _constants.LINK_URL, companyName, firstTime);
      });
    });
  });

  let endMonthSchedule = _nodeSchedule2.default.scheduleJob(monthlySundaySchedule, function () {
    let companies = CompanyModel.find({ schedule: 'monthly' }).exec();
    companies.forEach(async ({ companyName }) => {
      await EmployeeModel.updateMany({ companyName }, { surveyOwed: false }).exec();
    });
  });

  /**----------------------------------------------------------------**/

  let weeklyMondaySchedule = new _nodeSchedule2.default.RecurrenceRule();
  weeklyMondaySchedule.dayOfWeek = 1;
  weeklyMondaySchedule.hour = 8;
  weeklyMondaySchedule.minute = 0;

  let weeklySundaySchedule = new _nodeSchedule2.default.RecurrenceRule();
  weeklySundaySchedule.dayOfWeek = 0;
  weeklySundaySchedule.hour = 11;
  weeklySundaySchedule.minute = 59;

  let startWeekSchedule = _nodeSchedule2.default.scheduleJob(weeklyMondaySchedule, function () {
    let companies = CompanyModel.find({ schedule: 'weekly' }).exec();
    companies.forEach(async ({ companyName }) => {
      const employees = await EmployeeModel.find({
        companyName
      }).exec();
      employees.forEach(async ({ mobile, companyName, firstTime }) => {
        await EmployeeModel.findOneAndUpdate({ mobile }, { surveyOwed: true });
        await (0, _sendSMS.sendSMS)(mobile, _constants.LINK_URL, companyName, firstTime);
      });
    });
  });

  let endWeekSchedule = _nodeSchedule2.default.scheduleJob(weeklySundaySchedule, function () {
    let companies = CompanyModel.find({ schedule: 'weekly' }).exec();
    companies.forEach(async ({ companyName }) => {
      await EmployeeModel.updateMany({ companyName }, { surveyOwed: false }).exec();
    });
  });

  return {
    startMonthSchedule,
    endMonthSchedule,
    startWeekSchedule,
    endWeekSchedule
  };
};
//# sourceMappingURL=index.js.map