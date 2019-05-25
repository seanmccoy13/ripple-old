import assert from "assert";
import bcrypt from "bcryptjs";
import { userValidation, formatYupError } from "../auth/validation";
import uuid from "uuid";
import createError from "../utils/createError";
import { sendEmail } from "../auth/sendEmail";
import { storeFS } from "../utils/imageUpload";
import { GraphQLUpload } from "../schema/GraphQLUpload";
import csvUpload from "../utils/csvUpload";
import { sendSMS } from "../utils/sendSMS";
import { LINK_URL } from "../constants";
import {
  addSchedule,
  startSchedule,
  stopSchedule,
  destorySchedule,
  testSchedule
} from "../../scheduler";

export default {
  Upload: GraphQLUpload,
  Query: {
    scheduleTest: async () => await testSchedule(),
    getImages: async (_, { companyName }, { models: { File } }) => {
      const images = await File.find({ companyName }).exec();
      if (images) {
        return images.map(image => ({ pathname: image.path }));
      }
      return { errors: createError("image", "images not found") };
    },
    getCompanies: async (_, __, { models: { Company } }) => {
      const companies = await Company.find().exec();
      return companies[0] !== null
        ? companies
        : { errors: createError("company", "no companies found") };
    },
    getCompany: async (_, { companyName }, { models: { Company } }) => {
      const company = await Company.findOne({ companyName }).exec();
      if (company === null) {
        return { errors: createError("company", "company not found") };
      }
      return company;
    },
    getParticipants: async (
      _,
      { manager, companyName },
      { models: { Employee, Result } }
    ) => {
      const employees = await Employee.find({ manager, companyName }).exec();
      const twoWeeksAgo = new Date().getTime() - 1000 * 60 * 60 * 24 * 14;
      const unfilteredResults = await Result.find({ email: manager });
      const results = unfilteredResults.filter(
        r => Number(r.date) > twoWeeksAgo
      );

      const notTaken = employees.filter(
        employee => !results.find(x => x.participant === employee.email)
      );
      if (notTaken.length > 0) {
        return { employees: notTaken };
      }
      return { errors: createError("participants", `no participants found`) };
    },
    getEmployeeById: async (_, { id }, { models: { Employee } }) => {
      const employee = await Employee.findById(id).exec();
      return employee
        ? employee
        : { errors: createError("id", `employee doesn't exist`) };
    },
    getEmployeeByMobileId: async (
      _,
      { mobileId },
      { models: { Employee } }
    ) => {
      const employee = await Employee.findOne({ mobileId }).exec();
      return employee
        ? employee
        : {
          errors: createError(
            "id",
            `session id expired, login or contact admin`
          )
        };
    },
    getEmployees: async (_, { companyName }, { models: { Employee } }) => {
      const employees = await Employee.find({ companyName }).exec();
      return employees.length > 0
        ? { employees }
        : { errors: createError("employees", "no employees found") };
    },
    getSurveys: async (_, { companyName }, { models: { Survey } }) => {
      const surveys = await Survey.find({ companyName }).exec();
      return surveys.surveys
        ? surveys
        : { errors: createError("surveys", "no surveys found") };
    },
    getSurvey: async (
      _,
      { companyName, surveyName },
      { models: { Survey } }
    ) => {
      const survey = await Survey.findOne({ companyName, surveyName }).exec();
      return survey
        ? survey
        : { errors: createError("surveys", "survey not found") };
    },
    getResults: async (
      _,
      { companyName, email, manager, participant },
      { models: { Result } }
    ) => {
      if (email) {
        const results = await Result.find({ companyName, email }).exec();
        return results.length > 0
          ? { results }
          : { errors: createError("results", "no results found") };
      }
      if (manager) {
        const results = await Result.find({ companyName, manager }).exec();
        return results.length > 0
          ? { results }
          : { errors: createError("results", "no results found") };
      }
      if (participant) {
        const results = await Result.find({ companyName, participant }).exec();
        return results.length > 0
          ? { results }
          : { errors: createError("results", "no results found") };
      } else {
        const results = await Result.find({ companyName }).exec();
        return results.length > 0
          ? { results }
          : { errors: createError("results", "no results found") };
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
            errors: createError("login status", "contact administrator")
          };
        }
        return { errors: createError("login status", "refresh browser") };
      }
      return { errors: createError("login status", "login required") };
    }
  },
  Mutation: {
    imageUpload: async (
      _,
      { companyName, logo, file },
      { models: { File } }
    ) => {
      const { stream, filename } = await file;
      const { path } = await storeFS({ stream, filename });
      const exists = await File.findOne({ companyName });
      if (exists) {
        const updated = await File.findOneAndUpdate(
          { companyName, logo },
          { filename, path }
        ).exec();
        if (!updated) {
          return createError("image", "upload failed");
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
        return createError("image", "upload failed");
      }
      return null;
    },
    uploadEmployeesFromCsv: async (
      _,
      { companyName, file },
      { models: { Employee } }
    ) => {
      const { stream } = await file;
      try {
        const { filePath } = await csvUpload({ stream, companyName });
        const data = require(filePath);
        const success = await Employee.insertMany(data, err =>
          assert.equal(null, err)
        ).exec();
        if (!success) {
          return createError("csv", "upload failed");
        }
        return null;
      } catch (error) {
        return createError("csv", "upload failed");
      }
    },
    logout: async (_, __, { req }) => {
      await req.session.destroy();
      return null;
    },
    // signup users without sending confirmation email and assosciated confirmation login
    // administrator only
    signupWithoutConfirmation: async (
      _,
      { email, password },
      { models: { User, Employee } }
    ) => {
      try {
        await userValidation.validate(
          { email, password },
          { abortEarly: false }
        );
      } catch (error) {
        return formatYupError(error);
      }
      const exists = await User.findOne({ email }).exec();
      if (exists) {
        return createError("email", "user already exists");
      }
      try {
        const employee = await Employee.findOne({ email }).exec();
        await new User({
          _id: employee._id,
          resetId: "",
          confirmed: true,
          forgotPasswordLocked: false,
          email,
          password
        }).save();
      } catch (error) {
        return createError(
          "employee",
          "contact your administrator to arrange access"
        );
      }
      return null;
    },
    signup: async (
      _,
      { email, password },
      { models: { User, Employee }, url }
    ) => {
      const resetId = uuid.v4();
      try {
        await userValidation.validate(
          { email, password },
          { abortEarly: false }
        );
      } catch (error) {
        return { errors: formatYupError(error) };
      }
      try {
        await User.findOne({ email }).exec();
        return { errors: createError("email", "invalid credentials") };
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
            errors: createError(
              "employee",
              "contact your administrator to arrange access"
            )
          };
        }
        try {
          await sendEmail({ email, url, resetId });
        } catch (error) {
          return {
            errors: createError("email", "could not send, new user email")
          };
        }
      }
      try {
        const employee = await Employee.findOne({ email }).exec();
        return employee;
      } catch (error) {
        return { errors: createError("email", "signup failed, try again") };
      }
    },
    login: async (
      _,
      { email, password },
      { models: { User, Employee }, req }
    ) => {
      let forgotPassword;
      try {
        // check user exists
        const user = await User.findOne({ email }).exec();
        if (!user) {
          return { errors: createError("authentication", "invalid login") };
        }
        // check user account has been confirmed
        if (!user.confirmed) {
          return { errors: createError("email", "confirm email first") };
        }
        // check for user forgetting password
        if (user.forgotPasswordLocked) {
          forgotPassword = createError(
            "email",
            "check email for reset code or try again"
          );
        }
        // compare passwords
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          return { errors: createError("authentication", "invalid login") };
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
            errors: createError(
              "authorization",
              "authenticated but not authorized, contact administrator"
            )
          };
        }
      } catch (error) {
        return { errors: createError("authentication", "invalid login") };
      }
    },
    createCompany: async (
      _,
      { companyName, schedule, groups },
      { models: { Company, Employee } }
    ) => {
      const exists = await Company.findOne({ companyName }).exec();
      if (exists) {
        return createError("company", "company exists");
      }
      try {
        await new Company({
          companyName,
          schedule: "30 8 * * Fri",
          groups: [...groups, "manager", "participant"]
        }).save();
        if (schedule) {
          addSchedule({ companyName, Employee, schedule });
          startSchedule({ companyName });
        } else {
          addSchedule({ companyName, Employee, schedule: "30 8 * * Fri" });
          startSchedule({ companyName });
        }
      } catch (error) {
        return createError("company", "invalid or missing options");
      }
      return null;
    },
    editCompany: async (
      _,
      { companyName, groups, schedule },
      { models: { Company, Employee } }
    ) => {
      const exists = await Company.findOne({ companyName }).exec();
      if (!exists) {
        return createError("company", `company doesn't exist`);
      }
      try {
        await Company.findOneAndUpdate(
          { companyName },
          { schedule, groups }
        ).exec();
        if (schedule) {
          stopSchedule({ companyName });
          destorySchedule({ companyName });
          addSchedule({ companyName, Employee, schedule });
          startSchedule({ companyName });
        }
        return null;
      } catch (error) {
        return createError("company", "invalid or missing options");
      }
    },
    removeCompany: async (_, { companyName }, { models: { Company } }) => {
      const exists = await Company.findOneAndRemove({ companyName }).exec();
      return exists ? null : createError("company", "company not found");
    },
    createEmployee: async (_, args, { models: { Employee } }) => {
      const exists = await Employee.findOne({ email: args.email }).exec();
      if (exists) {
        return createError("employee", "employee already exists");
      }
      try {
        const firstTime = true;
        const _id = uuid.v4();
        const mobileId = uuid.v4();
        const surveyOwed = true;
        await new Employee({
          ...args,
          firstTime,
          _id,
          mobileId,
          surveyOwed
        }).save();
        return null;
      } catch (error) {
        return createError(
          "employee",
          `Cannot save user to database due to ${error}`
        );
      }
    },
    editEmployee: async (_, args, { models: { Employee } }) => {
      const exists = await Employee.findByIdAndUpdate(args.id, {
        ...args
      }).exec();
      if (exists) {
        return null;
      }
      return createError("employee", `Employee not found`);
    },
    removeEmployee: async (_, { id }, { models: { Employee, User } }) => {
      const employeeExists = await Employee.findByIdAndRemove(id).exec();
      if (!employeeExists) {
        return createError("employee", `employee not found`);
      }
      const userExists = await User.findByIdAndRemove(id).exec();
      if (!userExists) {
        return createError(
          "employee",
          `employee removed, wasn't registered user`
        );
      }
      return null;
    },
    createSurvey: async (_, args, { models: { Survey } }) => {
      const exists = await Survey.findOneAndUpdate(
        {
          surveyName: args.surveyName,
          companyName: args.companyName
        },
        { ...args }
      ).exec();
      if (exists) {
        return createError("survey", "survey saved successfully");
      }
      const added = await new Survey({ ...args }).save();
      if (added) {
        return createError("survey", "survey saved successfully");
      }
      return createError("survey", "check survey fields");
    },
    editSurvey: async (_, args, { models: { Survey } }) => {
      const query = {
        surveyName: args.surveyName,
        companyName: args.companyName
      };
      const exists = await Survey.findOneAndUpdate(query, { ...args }).exec();
      if (exists) {
        return null;
      }
      return createError("survey", `Survey not found`);
    },
    removeSurvey: async (
      _,
      { surveyName, companyName },
      { models: { Survey } }
    ) => {
      const existed = await Survey.findOneAndRemove({
        surveyName,
        companyName
      }).exec();
      if (existed) {
        return null;
      }
      return createError("survey", `Survey not found`);
    },
    assignSurvey: async (
      _,
      { surveyName, employees },
      { models: { Employee } }
    ) => {
      const surveyOwed = true;
      const errors = [];
      employees.forEach(async ({ _id, mobile, companyName, firstTime }) => {
        const mobileId = uuid.v4();
        const linkUrl = `${LINK_URL}/id/${mobileId}`;
        const employeeError = await Employee.findByIdAndUpdate(_id, {
          surveyName,
          surveyOwed,
          mobileId
        }).exec();
        if (employeeError) {
          errors.push({
            path: "survey-assignment",
            message: `${employeeError}`
          });
        }

        await sendSMS(mobile, linkUrl, companyName, firstTime)
          .catch(err =>
            errors.push({ path: "survey-assignment", message: `${err}` })
          )
          .then(() => null);
      });
      return errors.length > 0 ? errors : null;
    },
    sendTestMessage: async (_, { mobile, firstTime }) => {
      const companyName = "testco";

      return sendSMS(mobile, LINK_URL, companyName, firstTime)
        .then(res => JSON.stringify(res))
        .catch(err => JSON.stringify(err));
    },
    sendReminder: async (
      _,
      { mobile, firstTime, companyName },
      { models: { Employee } }
    ) => {
      const employee = await Employee.findOne({ mobile, companyName })
      if (!employee) { return createError("sms", `sending failed, no mobile number available`) }
      const linkUrl = `${LINK_URL}/id/${employee.mobileId}`;

      sendSMS(mobile, linkUrl, companyName, firstTime)
        .then(res => {
          JSON.stringify(res);
          const lastReminder = String(new Date().getTime());
          Employee.findOneAndUpdate({ mobile }, { lastReminder });
        })
        .catch(err => createError("sms", `sending failed, reciever ${err}`));
    },
    sendReminders: async (
      _,
      { companyName, limit },
      { models: { Employee } }
    ) => {
      const employees = await Employee.find({
        companyName,
        surveyOwed: true
      }).exec();
      const responses = employees.reduce(async (arr, u) => {
        if (Number(u.lastReminder) < Number(limit)) {
          const lastReminder = String(new Date().getTime());
          await Employee.findOneAndUpdate(
            { mobile: u.mobile },
            { lastReminder }
          );
          const linkUrl = `${LINK_URL}/id/${u.mobileId}`;
          const response = await sendSMS(
            u.mobile,
            linkUrl,
            u.companyName,
            u.firstTime
          );
          return [...arr, JSON.stringify(response)];
        }
        return arr;
      }, []);
      return responses;
    },
    createResult: async (_, args, { models: { Result, Employee } }) => {
      const date = String(new Date().getTime());
      const submitted = await new Result({ date, ...args }).save();
      if (submitted) {
        const mobileId = uuid.v4();
        if (args.surveyName === "participant") {
          await Employee.findOneAndUpdate(
            { email: args.email },
            { mobileId, surveyOwed: false, firstTime: false }
          ).exec();
        }
        // const participants = await Employee.find({manager: args.email}).exec()
        if (args.surveyName === "management") {
          await Employee.findOneAndUpdate(
            { email: args.email },
            { surveyOwed: true, firstTime: false }
          ).exec();
        }
        return null;
      }
      return createError(
        "result",
        `Cannot submit survey, check answers and try again`
      );
    },
    passwordReset: async (_, { resetId, password }, { models: { User } }) => {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hashSync(password, saltRounds);
      const updated = await User.findOneAndUpdate(
        { resetId },
        {
          password: hashedPassword,
          forgotPasswordLocked: false,
          confirmed: true,
          resetId: ""
        }
      ).exec();
      if (updated) {
        return null;
      }
      return createError("password", "email does not exist");
    },
    forgotPassword: async (_, { email }, { models: { User }, url }) => {
      const resetId = uuid.v4();
      const updated = await User.findOneAndUpdate(
        { email },
        {
          resetId,
          forgotPasswordLocked: true
        }
      ).exec();
      if (!updated) {
        return createError("email", "email not found");
      }
      const sentEmail = await sendEmail({ email, url, resetId });
      if (!sentEmail) {
        return createError("email", "forgot password send email failed");
      }
      return null;
    }
  }
};
