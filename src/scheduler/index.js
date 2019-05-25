import schedule from 'node-schedule';
import { sendSMS } from '../server/utils/sendSMS';
import { LINK_URL } from '../server/constants';

export default ({ CompanyModel, EmployeeModel }) => {
  let monthlyMondaySchedule = new schedule.RecurrenceRule();
  monthlyMondaySchedule.dayOfWeek = 1;
  monthlyMondaySchedule.hour = 8;
  monthlyMondaySchedule.minute = 0;
  monthlyMondaySchedule.dayOfMonth = [1, 2, 3, 4, 5, 6, 7];

  let monthlySundaySchedule = new schedule.RecurrenceRule();
  monthlySundaySchedule.hour = 11;
  monthlySundaySchedule.minute = 59;
  monthlySundaySchedule.dayOfMonth = 28;

  let startMonthSchedule = schedule.scheduleJob(
    monthlyMondaySchedule,
    function() {
      let companies = CompanyModel.find({ schedule: 'monthly' }).exec();
      companies.forEach(async ({ companyName }) => {
        const employees = await EmployeeModel.find({
          companyName,
        }).exec();
        employees.forEach(async ({ mobile, companyName, firstTime }) => {
          await EmployeeModel.findOneAndUpdate(
            { mobile },
            { surveyOwed: true }
          );
          await sendSMS(mobile, LINK_URL, companyName, firstTime);
        });
      });
    }
  );

  let endMonthSchedule = schedule.scheduleJob(
    monthlySundaySchedule,
    function() {
      let companies = CompanyModel.find({ schedule: 'monthly' }).exec();
      companies.forEach(async ({ companyName }) => {
        await EmployeeModel.updateMany(
          { companyName },
          { surveyOwed: false }
        ).exec();
      });
    }
  );

  /**----------------------------------------------------------------**/

  let weeklyMondaySchedule = new schedule.RecurrenceRule();
  weeklyMondaySchedule.dayOfWeek = 1;
  weeklyMondaySchedule.hour = 8;
  weeklyMondaySchedule.minute = 0;

  let weeklySundaySchedule = new schedule.RecurrenceRule();
  weeklySundaySchedule.dayOfWeek = 0;
  weeklySundaySchedule.hour = 11;
  weeklySundaySchedule.minute = 59;

  let startWeekSchedule = schedule.scheduleJob(
    weeklyMondaySchedule,
    function() {
      let companies = CompanyModel.find({ schedule: 'weekly' }).exec();
      companies.forEach(async ({ companyName }) => {
        const employees = await EmployeeModel.find({
          companyName,
        }).exec();
        employees.forEach(async ({ mobile, companyName, firstTime }) => {
          await EmployeeModel.findOneAndUpdate(
            { mobile },
            { surveyOwed: true }
          );
          await sendSMS(mobile, LINK_URL, companyName, firstTime);
        });
      });
    }
  );

  let endWeekSchedule = schedule.scheduleJob(weeklySundaySchedule, function() {
    let companies = CompanyModel.find({ schedule: 'weekly' }).exec();
    companies.forEach(async ({ companyName }) => {
      await EmployeeModel.updateMany(
        { companyName },
        { surveyOwed: false }
      ).exec();
    });
  });

  return {
    startMonthSchedule,
    endMonthSchedule,
    startWeekSchedule,
    endWeekSchedule,
  };
};
