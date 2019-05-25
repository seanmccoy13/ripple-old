import cron from 'node-cron';
import { sendSMS } from '../src/utils/sendSMS';
import { LINK_URL } from '../src/constants';

const schedules = [];
// creates schedule
// see http://merencia.com/node-cron/ for sheduling options
export const addSchedule = ({ companyName, Employee, schedule }) => {
  const fn = async () => {
    const employees = await Employee.find({
      companyName,
      surveyOwed: true,
    }).exec();
    const lastReminder = String(new Date().getTime());
    for (let i = 0; i < employees.length; i++) {
      const reminderDiff = Math.floor(
        (new Date().getTime() - Number(employees[i].lastReminder)) /
          1000 /
          60 /
          60 /
          24
      );
      if (reminderDiff > 5 && employees[i].surveyOwed) {
        await sendSMS(
          employees[i].mobile,
          LINK_URL,
          employees[i].companyName,
          employees[i].firstTime
        );
        await Employee.findOneAndUpdate(
          { mobile: employees[i].mobile },
          { lastReminder }
        );
      }
    }
  };

  const valid = cron.validate(schedule);
  if (valid) {
    schedules.push({ name: companyName, task: cron.schedule(schedule, fn) });
  } else {
    const newSchedule = '0 0 11 */14 * Mon';
    schedules.push({ name: companyName, task: cron.schedule(newSchedule, fn) });
  }
};

export const startSchedule = ({ companyName }) => {
  const schedule = schedules.find(task => task.name === companyName);
  if (schedule) {
    schedule.task.start();
  }
};

export const stopSchedule = ({ companyName }) => {
  const schedule = schedules.find(task => task.name === companyName);
  if (schedule) {
    schedule.task.stop();
  }
};

export const destorySchedule = ({ companyName }) => {
  const schedule = schedules.find(task => task.name === companyName);
  if (schedule) {
    schedule.task.destroy();
  }
};
export const testSchedule = async () => {
  console.log('valid: ', cron.validate('*/2 * * * * *'));
  const test = cron.schedule('*/2 * * * * *', function() {
    console.log('tick');
  });
  test.start();
  await setTimeout(() => {
    test.stop();
    test.destroy();
    console.log('end');
    return true;
  }, 6000);
};
