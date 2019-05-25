'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apolloServerExpress = require('apollo-server-express');

exports.default = _apolloServerExpress.gql`

  type MessageResponse {
    messages: [String]
  }
  type Error {
    path: String!
    message: String!
  }
  
  type File {
    pathname: String
  }

  type Images {
    images: [File]
    errors: [Error!]
  }

  type Pages {
    p1: String!
    p2: String!
    p3: String!
    p4: String!
    p5: String!
    p6: String!
  }

  type LoggedInUser {
    loggedInUser: User
    errors: [Error]
  }

  type User {
    _id: ID
    resetId: String
    confirmed: Boolean
    forgotPasswordLocked: Boolean
    email: String
    password: String
  }

  type LimitedUser {
    resetId: String
    confirmed: Boolean
    forgotPasswordLocked: Boolean
    email: String
  }

  type Employee {
    _id: ID
    lastReminder: String
    mobileId: String
    companyName: String
    firstName: String
    lastName: String
    email: String
    mobile: String
    manager: String
    groupMembership: [String]
    dashboardAccess: Boolean
    surveyName: String
    surveyOwed: Boolean
    firstTime: Boolean
    errors: [Error]
  }

  type Employees {
    employees: [Employee!]
    errors: [Error]
  }

  type Survey {
    color: Boolean
    directionStandard: Boolean
    surveyName: String
    companyName: String
    introPage1: String
    introPage2: String
    subHeading: Pages
    start: Pages
    end: Pages
    errors: [Error]
    }

  type Surveys {
    surveys: [Survey!]
    errors: [String]
  }


  type Company {
    companyName: String
    schedule: String
    groups: [String!]
    errors: [Error]
  }


  type Result {
    email: String
    participant: String
    participantName: String
    manager: String
    group: String
    companyName: String
    surveyName: String
    date: String
    p1: Int
    p2: Int
    p3: Int
    p4: Int
    p5: Int
    p6: Int
  }

  type Results {
    results: [Result!]
    errors: [Error]
  }

  input PagesInput {
    p1: String!
    p2: String!
    p3: String!
    p4: String!
    p5: String!
    p6: String!
  }

  input AssignSurvey {
    _id: String!
    companyName: String!
    mobile: String!
    firstTime: Boolean
  }

  type Query {
    scheduleTest: Boolean
    
    getUser(id: String!): LimitedUser

    getParticipants(manager: String!, companyName: String!) : Employees
    
    getImages(companyName: String!): Images!

    getEmployees(companyName: String!): Employees

    getEmployeeById(id: String!):  Employee

    getEmployeeByMobileId(mobileId: String!):  Employee

    getCompanies: [Company]

    getCompany(companyName: String!): Company

    getSurveys(companyName: String!): Surveys

    getSurvey(companyName: String!, surveyName: String!): Survey

    getResults(
      companyName: String!
      email: String
      surveyName: String
      manager: String
      participant: String
    ): Results

    getLoggedIn: LoggedInUser!
  }


  type Mutation {

    uploadEmployeesFromCsv(
      companyName: String!
      file: Upload!
    ) : [Error!]

    imageUpload(
      companyName: String!
      logo: Boolean
      file: Upload!
      ): [Error!]

    createCompany(companyName: String! groups: [String], schedule: String) : [Error!]

    editCompany(companyName: String! groups: [String], schedule: String) : [Error!]

    removeCompany(companyName: String!) : [Error!]

    signup(email: String!, password: String!) : Employee

    signupWithoutConfirmation(email: String!, password: String!) : [Error!]

    login(email: String!, password: String!) : Employee

    logout(id: ID!) : [Error!]

    passwordReset(resetId: String! password: String!) : [Error!]

    forgotPassword(email: String!) : [Error!]

    createEmployee(
      lastReminder: String
      companyName: String!
      firstName: String!
      lastName: String!
      email: String!
      mobile: String!
      manager: String
      groupMembership: [String]
      dashboardAccess: Boolean!
      surveyName: String
      surveyOwed: Boolean
      firstTime: Boolean
    ): [Error!]

    removeEmployee(id: String!): [Error!]

    editEmployee(
      id: String!
      firstName: String
      lastName: String
      email: String
      mobile: String
      manager: String
      groupMembership: [String]
      dashboardAccess: Boolean
      surveyName: String
      surveyOwed: Boolean
      firstTime: Boolean
    ): [Error!]

    createSurvey(
      color: Boolean
      directionStandard: Boolean
      surveyName: String!
      companyName: String!
      introPage1: String!
      introPage2: String!
      subHeading: PagesInput
      start: PagesInput
      end: PagesInput
    ) : [Error!]

    editSurvey(
      surveyName: String!
      companyName: String!
      color: Boolean
      directionStandard: Boolean
      introPage1: String
      introPage2: String
      subHeading: PagesInput
      start: PagesInput
      end: PagesInput
    ) : [Error!]

    removeSurvey(surveyName: String! companyName: String!) : [Error!]

    createResult(
      email: String
      mobile: String
      participant: String
      participantName: String
      manager: String
      group: String
      companyName: String
      surveyName: String
      p1: Int
      p2: Int
      p3: Int
      p4: Int
      p5: Int
      p6: Int
    ) : [Error!]

    assignSurvey(surveyName: String! employees: [AssignSurvey]) : [Error!]
    sendTestMessage(mobile: String! firstTime: Boolean!) : String!
    sendReminder(mobile: String! firstTime: Boolean! companyName: String! ) : [Error!]
    sendReminders( companyName: String! limit: String! ) : [MessageResponse]
  }
`;
//# sourceMappingURL=index.js.map