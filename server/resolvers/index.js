'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _validation = require('../auth/validation');

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _createError = require('../utils/createError');

var _createError2 = _interopRequireDefault(_createError);

var _sendEmail = require('../auth/sendEmail');

var _imageUpload = require('../utils/imageUpload');

var _GraphQLUpload = require('../schema/GraphQLUpload');

var _csvUpload = require('../utils/csvUpload');

var _csvUpload2 = _interopRequireDefault(_csvUpload);

var _sendSMS = require('../utils/sendSMS');

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Upload: _GraphQLUpload.GraphQLUpload,
  Query: {
    getImages: async (_, { companyName }, { models: { File } }) => {
      const images = await File.find({ companyName }).exec();
      if (images) {
        return images.map(image => ({ pathname: image.path }));
      }
      return { errors: (0, _createError2.default)('image', 'images not found') };
    },
    getCompanies: async (_, __, { models: { Company } }) => {
      const companies = await Company.find().exec();
      return companies[0] !== null ? companies : { errors: (0, _createError2.default)('company', 'no companies found') };
    },
    getCompany: async (_, { companyName }, { models: { Company } }) => {
      const company = await Company.findOne({ companyName }).exec();
      if (company === null) {
        return { errors: (0, _createError2.default)('company', 'company not found') };
      }
      return company;
    },
    getParticipants: async (_, { manager, companyName }, { models: { Employee, Result } }) => {
      const employees = await Employee.find({ manager, companyName }).exec();
      const twoWeeksAgo = new Date().getTime() - 1000 * 60 * 60 * 24 * 14;
      const unfilteredResults = await Result.find({ email: manager });
      const results = unfilteredResults.filter(r => Number(r.date) > twoWeeksAgo);

      const notTaken = employees.filter(employee => !results.find(x => x.participant === employee.email));
      if (notTaken.length > 0) {
        return { employees: notTaken };
      }
      return { errors: (0, _createError2.default)('participants', `no participants found`) };
    },
    getEmployeeById: async (_, { id }, { models: { Employee } }) => {
      const employee = await Employee.findById(id).exec();
      return employee ? employee : { errors: (0, _createError2.default)('id', `employee doesn't exist`) };
    },
    getEmployeeByMobileId: async (_, { mobileId }, { models: { Employee } }) => {
      const employee = await Employee.findOne({ mobileId }).exec();
      return employee ? employee : {
        errors: (0, _createError2.default)('id', `session id expired, login or contact admin`)
      };
    },
    getEmployees: async (_, { companyName }, { models: { Employee } }) => {
      const employees = await Employee.find({ companyName }).exec();
      return employees.length > 0 ? { employees } : { errors: (0, _createError2.default)('employees', 'no employees found') };
    },
    getSurveys: async (_, { companyName }, { models: { Survey } }) => {
      const surveys = await Survey.find({ companyName }).exec();
      return surveys.surveys ? surveys : { errors: (0, _createError2.default)('surveys', 'no surveys found') };
    },
    getSurvey: async (_, { companyName, surveyName }, { models: { Survey } }) => {
      const survey = await Survey.findOne({ companyName, surveyName }).exec();
      return survey ? survey : { errors: (0, _createError2.default)('surveys', 'survey not found') };
    },
    getResults: async (_, { companyName, email, manager, participant }, { models: { Result } }) => {
      if (email) {
        const results = await Result.find({ companyName, email }).exec();
        return results.length > 0 ? { results } : { errors: (0, _createError2.default)('results', 'no results found') };
      }
      if (manager) {
        const results = await Result.find({ companyName, manager }).exec();
        return results.length > 0 ? { results } : { errors: (0, _createError2.default)('results', 'no results found') };
      }
      if (participant) {
        const results = await Result.find({ companyName, participant }).exec();
        return results.length > 0 ? { results } : { errors: (0, _createError2.default)('results', 'no results found') };
      } else {
        const results = await Result.find({ companyName }).exec();
        return results.length > 0 ? { results } : { errors: (0, _createError2.default)('results', 'no results found') };
      }
    },
    getUser: async (_, { id }, { models: { User } }) => {
      const exists = await User.findById(id);
      if (exists) {
        return {
          confirmed: exists.confirmed,
          forgotPasswordLocked: exists.forgotPasswordLocked,
          email: exists.email
        };
      }
      return null;
    },
    getLoggedIn: async (_, __, { req, models: { Employee } }) => {
      // checks session for logged in user
      if (req.session.userId) {
        const loggedInUser = await Employee.findById(req.session.userId).exec();
        if (loggedInUser) {
          return { loggedInUser };
        }
        delete req.session.userId;
        const error = await req.session.destroy();
        if (error) {
          return {
            errors: (0, _createError2.default)('login status', 'contact administrator')
          };
        }
        return { errors: (0, _createError2.default)('login status', 'refresh browser') };
      }
      return { errors: (0, _createError2.default)('login status', 'login required') };
    }
  },
  Mutation: {
    imageUpload: async (_, { companyName, logo, file }, { models: { File } }) => {
      const { stream, filename } = await file;
      const { path } = await (0, _imageUpload.storeFS)({ stream, filename });
      const exists = await File.findOne({ companyName });
      if (exists) {
        const updated = await File.findOneAndUpdate({ companyName, logo }, { filename, path }).exec();
        if (!updated) {
          return (0, _createError2.default)('image', 'upload failed');
        }
        return null;
      }
      const newImage = await new File({
        companyName,
        logo,
        filename,
        path
      }).save();
      if (!newImage) {
        return (0, _createError2.default)('image', 'upload failed');
      }
      return null;
    },
    uploadEmployeesFromCsv: async (_, { companyName, file }, { models: { Employee } }) => {
      const { stream } = await file;
      try {
        const { filePath } = await (0, _csvUpload2.default)({ stream, companyName });
        const data = require(filePath);
        const success = await Employee.insertMany(data, err => _assert2.default.equal(null, err)).exec();
        if (!success) {
          return (0, _createError2.default)('csv', 'upload failed');
        }
        return null;
      } catch (error) {
        return (0, _createError2.default)('csv', 'upload failed');
      }
    },
    logout: async (_, __, { req }) => {
      await req.session.destroy();
      return null;
    },
    // signup users without sending confirmation email and assosciated confirmation login
    // administrator only
    signupWithoutConfirmation: async (_, { email, password }, { models: { User, Employee } }) => {
      try {
        await _validation.userValidation.validate({ email, password }, { abortEarly: false });
      } catch (error) {
        return (0, _validation.formatYupError)(error);
      }
      const exists = await User.findOne({ email }).exec();
      if (exists) {
        return (0, _createError2.default)('email', 'user already exists');
      }
      try {
        const employee = await Employee.findOne({ email }).exec();
        await new User({
          _id: employee._id,
          resetId: '',
          confirmed: true,
          forgotPasswordLocked: false,
          email,
          password
        }).save();
      } catch (error) {
        return (0, _createError2.default)('employee', 'contact your administrator to arrange access');
      }
      return null;
    },
    signup: async (_, { email, password }, { models: { User, Employee }, url }) => {
      const resetId = _uuid2.default.v4();
      try {
        await _validation.userValidation.validate({ email, password }, { abortEarly: false });
      } catch (error) {
        return { errors: (0, _validation.formatYupError)(error) };
      }
      try {
        await User.findOne({ email }).exec();
        return { errors: (0, _createError2.default)('email', 'invalid credentials') };
      } catch (error) {
        try {
          const employee = await Employee.findOne({ email }).exec();
          await new User({
            _id: employee._id,
            resetId,
            confirmed: false,
            forgotPasswordLocked: false,
            email,
            password
          }).save();
        } catch (error) {
          return {
            errors: (0, _createError2.default)('employee', 'contact your administrator to arrange access')
          };
        }
        try {
          await (0, _sendEmail.sendEmail)({ email, url, resetId });
        } catch (error) {
          return {
            errors: (0, _createError2.default)('email', 'could not send, new user email')
          };
        }
      }
      try {
        const employee = await Employee.findOne({ email }).exec();
        return employee;
      } catch (error) {
        return { errors: (0, _createError2.default)('email', 'signup failed, try again') };
      }
    },
    login: async (_, { email, password }, { models: { User, Employee }, req }) => {
      let forgotPassword;
      try {
        // check user exists
        const user = await User.findOne({ email }).exec();
        if (!user) {
          return { errors: (0, _createError2.default)('authentication', 'invalid login') };
        }
        // check user account has been confirmed
        if (!user.confirmed) {
          return { errors: (0, _createError2.default)('email', 'confirm email first') };
        }
        // check for user forgetting password
        if (user.forgotPasswordLocked) {
          forgotPassword = (0, _createError2.default)('email', 'check email for reset code or try again');
        }
        // compare passwords
        const valid = await _bcryptjs2.default.compare(password, user.password);
        if (!valid) {
          return { errors: (0, _createError2.default)('authentication', 'invalid login') };
        }
        // login successful
        // add user id to session
        req.session.userId = user._id;
        await req.session.save();
        // find employee details
        try {
          const employee = await Employee.findOne({ email }).exec();
          if (forgotPassword) {
            employee.errors = forgotPassword;
            return employee;
          }
          return employee;
        } catch (error) {
          return {
            errors: (0, _createError2.default)('authorization', 'authenticated but not authorized, contact administrator')
          };
        }
      } catch (error) {
        return { errors: (0, _createError2.default)('authentication', 'invalid login') };
      }
    },
    createCompany: async (_, { companyName, schedule, groups }, { models: { Company, Employee } }) => {
      const exists = await Company.findOne({ companyName }).exec();
      if (exists) {
        return (0, _createError2.default)('company', 'company exists');
      }
      try {
        await new Company({
          companyName,
          schedule: schedule === 'weekly' ? 'weekly' : 'monthly',
          groups: [...groups, 'manager', 'participant']
        }).save();
      } catch (error) {
        return (0, _createError2.default)('company', 'invalid or missing options');
      }
      return null;
    },
    editCompany: async (_, { companyName, groups, schedule }, { models: { Company } }) => {
      const exists = await Company.findOne({ companyName }).exec();
      if (!exists) {
        return (0, _createError2.default)('company', `company doesn't exist`);
      }
      try {
        await Company.findOneAndUpdate({ companyName }, { schedule, groups }).exec();
        return null;
      } catch (error) {
        return (0, _createError2.default)('company', 'invalid or missing options');
      }
    },
    removeCompany: async (_, { companyName }, { models: { Company } }) => {
      const exists = await Company.findOneAndRemove({ companyName }).exec();
      return exists ? null : (0, _createError2.default)('company', 'company not found');
    },
    createEmployee: async (_, args, { models: { Employee } }) => {
      const exists = await Employee.findOne({ email: args.email }).exec();
      if (exists) {
        return (0, _createError2.default)('employee', 'employee already exists');
      }
      try {
        const firstTime = true;
        const _id = _uuid2.default.v4();
        const mobileId = _uuid2.default.v4();
        const surveyOwed = true;
        await new Employee(_extends({}, args, {
          firstTime,
          _id,
          mobileId,
          surveyOwed
        })).save();
        return null;
      } catch (error) {
        return (0, _createError2.default)('employee', `Cannot save user to database due to ${error}`);
      }
    },
    editEmployee: async (_, args, { models: { Employee } }) => {
      const exists = await Employee.findByIdAndUpdate(args.id, _extends({}, args)).exec();
      if (exists) {
        return null;
      }
      return (0, _createError2.default)('employee', `Employee not found`);
    },
    removeEmployee: async (_, { id }, { models: { Employee, User } }) => {
      const employeeExists = await Employee.findByIdAndRemove(id).exec();
      if (!employeeExists) {
        return (0, _createError2.default)('employee', `employee not found`);
      }
      const userExists = await User.findByIdAndRemove(id).exec();
      if (!userExists) {
        return (0, _createError2.default)('employee', `employee removed, wasn't registered user`);
      }
      return null;
    },
    createSurvey: async (_, args, { models: { Survey } }) => {
      const exists = await Survey.findOneAndUpdate({
        surveyName: args.surveyName,
        companyName: args.companyName
      }, _extends({}, args)).exec();
      if (exists) {
        return (0, _createError2.default)('survey', 'survey saved successfully');
      }
      const added = await new Survey(_extends({}, args)).save();
      if (added) {
        return (0, _createError2.default)('survey', 'survey saved successfully');
      }
      return (0, _createError2.default)('survey', 'check survey fields');
    },
    editSurvey: async (_, args, { models: { Survey } }) => {
      const query = {
        surveyName: args.surveyName,
        companyName: args.companyName
      };
      const exists = await Survey.findOneAndUpdate(query, _extends({}, args)).exec();
      if (exists) {
        return null;
      }
      return (0, _createError2.default)('survey', `Survey not found`);
    },
    removeSurvey: async (_, { surveyName, companyName }, { models: { Survey } }) => {
      const existed = await Survey.findOneAndRemove({
        surveyName,
        companyName
      }).exec();
      if (existed) {
        return null;
      }
      return (0, _createError2.default)('survey', `Survey not found`);
    },
    assignSurvey: async (_, { surveyName, employees }, { models: { Employee } }) => {
      const surveyOwed = true;
      const errors = [];
      employees.forEach(async ({ _id, mobile, companyName, firstTime }) => {
        const mobileId = _uuid2.default.v4();
        const linkUrl = `${_constants.LINK_URL}/id/${mobileId}`;
        const employeeError = await Employee.findByIdAndUpdate(_id, {
          surveyName,
          surveyOwed,
          mobileId
        }).exec();
        if (employeeError) {
          errors.push({
            path: 'survey-assignment',
            message: `${employeeError}`
          });
        }

        await (0, _sendSMS.sendSMS)(mobile, linkUrl, companyName, firstTime).catch(err => errors.push({ path: 'survey-assignment', message: `${err}` })).then(() => null);
      });
      return errors.length > 0 ? errors : null;
    },
    sendTestMessage: async (_, { mobile, firstTime }) => {
      const companyName = 'testco';

      return (0, _sendSMS.sendSMS)(mobile, _constants.LINK_URL, companyName, firstTime).then(res => JSON.stringify(res)).catch(err => JSON.stringify(err));
    },
    sendReminder: async (_, { mobile, firstTime, companyName }, { models: { Employee } }) => {
      const employee = await Employee.findOne({ mobile, companyName });
      if (!employee) {
        return (0, _createError2.default)('sms', `sending failed, no mobile number available`);
      }
      const linkUrl = `${_constants.LINK_URL}/id/${employee.mobileId}`;

      (0, _sendSMS.sendSMS)(mobile, linkUrl, companyName, firstTime).then(res => {
        JSON.stringify(res);
        const lastReminder = String(new Date().getTime());
        Employee.findOneAndUpdate({ mobile }, { lastReminder });
      }).catch(err => (0, _createError2.default)('sms', `sending failed, reciever ${err}`));
    },
    sendReminders: async (_, { companyName, limit }, { models: { Employee } }) => {
      const employees = await Employee.find({
        companyName,
        surveyOwed: true
      }).exec();
      const responses = employees.reduce(async (arr, u) => {
        if (Number(u.lastReminder) < Number(limit)) {
          const lastReminder = String(new Date().getTime());
          await Employee.findOneAndUpdate({ mobile: u.mobile }, { lastReminder });
          const linkUrl = `${_constants.LINK_URL}/id/${u.mobileId}`;
          const response = await (0, _sendSMS.sendSMS)(u.mobile, linkUrl, u.companyName, u.firstTime);
          return [...arr, JSON.stringify(response)];
        }
        return arr;
      }, []);
      return responses;
    },
    createResult: async (_, args, { models: { Result, Employee } }) => {
      const date = String(new Date().getTime());
      const submitted = await new Result(_extends({ date }, args)).save();
      if (submitted) {
        const mobileId = _uuid2.default.v4();
        if (args.surveyName === 'participant') {
          await Employee.findOneAndUpdate({ email: args.email }, { mobileId, surveyOwed: false, firstTime: false }).exec();
        }
        // const participants = await Employee.find({manager: args.email}).exec()
        if (args.surveyName === 'management') {
          await Employee.findOneAndUpdate({ email: args.email }, { surveyOwed: true, firstTime: false }).exec();
        }
        return null;
      }
      return (0, _createError2.default)('result', `Cannot submit survey, check answers and try again`);
    },
    passwordReset: async (_, { resetId, password }, { models: { User } }) => {
      const saltRounds = 10;
      const hashedPassword = await _bcryptjs2.default.hashSync(password, saltRounds);
      const updated = await User.findOneAndUpdate({ resetId }, {
        password: hashedPassword,
        forgotPasswordLocked: false,
        confirmed: true,
        resetId: ''
      }).exec();
      if (updated) {
        return null;
      }
      return (0, _createError2.default)('password', 'email does not exist');
    },
    forgotPassword: async (_, { email }, { models: { User }, url }) => {
      const resetId = _uuid2.default.v4();
      const updated = await User.findOneAndUpdate({ email }, {
        resetId,
        forgotPasswordLocked: true
      }).exec();
      if (!updated) {
        return (0, _createError2.default)('email', 'email not found');
      }
      // const sentEmail = await sendEmail({ email, url, resetId });
      // if (!sentEmail) {
      //   return createError('email', 'forgot password send email failed');
      // }
      return null;
    }
  }
};
//# sourceMappingURL=index.js.map