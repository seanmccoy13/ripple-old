const current = Date.now()
const defaults = {
  admin: {
    __typename: 'Loggedin',
    email: '',
    companyName: '',
    dashboardAccess: false,
  },
  errorChecking: {
    __typename: 'ErrorCheck',
    showErrorFname: false,
    showErrorLname: false,
    showErrorEmail: false,
    showErrorMobile: false,
    showErrorManagerEmail: false,
  },
  error: {
    __typename: 'errors',
    errors: []
  },
  date: {
    __typename: 'Date',
    start: current,
    end: current
  },
  filtered: {
    __typename: 'Filtered',
    results: [],
    username: ''
  },
  result: {
    __typename: 'Result',
    email: '',
    participant: '',
    participantName: '',
    manager: '',
    group: '',
    companyName: '',
    surveyName: '',
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
    p5: 0,
    p6: 0
  },
  results: {
    __typename: 'Results',
    results: []
  },
  company: {
    __typename: 'CompanyLocal',
    companyName: '',
    schedule: '',
    group: '',
    groups: [],
  },
  companies: {
    __typename: 'CompaniesLocal',
    companies: [],
  },
  user: {
    __typename: 'User',
    mobileId: '',
    id: '',
    companyName: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    manager: '',
    groupMembership: [],
    dashboardAccess: false,
    surveyName: '',
    surveyOwed: true,
    firstTime: true,
    errors: [],
  },
  users: {
    __typename: 'Users',
    users: [{
      __typename: 'User',
      mobileId: '',
      id: '',
      companyName: '',
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      manager: '',
      groupMembership: [],
      dashboardAccess: false,
      surveyName: '',
      surveyOwed: true,
      firstTime: true,
      errors: []
    }],
    managers: [],
    participants: [],
    dashboard: []

  },
  managementSurvey: {
    __typename: 'Survey',
    color: true,
    directionStandard: true,
    surveyName: 'management',
    companyName: '',
    introPage1: 'The following questionnaire has been provided by {company} to assist {name} develop management skills, and should take you approximately  5 minutes to complete.',
    introPage2: 'Please respond to the following scales by providing a rating from 0 to 5 of what you observe and gives the best indication of {name}\'s behaviour. There are no right or wrong answers, please answer as honestly as you can, and answer all scales. \nThere are six response options for each scale.',
    subHeading: {
      __typename: 'Pages',
      p1: '\u2018Click\u2019 on one of the six response options that best describes \u2018{name}\u2019s\u2019 behaviour.',
      p2: '\u2018Click\u2019 on one of the six response options that best describes \u2018{name}\u2019s\u2019 behaviour.',
      p3: '\u2018Click\u2019 on one of the six response options that best describes \u2018{name}\u2019s\u2019 behaviour.',
      p4: '\u2018Click\u2019 on one of the six response options that best describes \u2018{name}\u2019s\u2019 behaviour.',
      p5: '\u2018Click\u2019 on one of the six response options that best describes \u2018{name}\u2019s\u2019 behaviour.',
      p6: '\u2018Click\u2019 on one of the six response options that best describes \u2018{name}\u2019s\u2019 behaviour.'
    },
    start: {
      __typename: 'Pages',
      p1: 'Asks for assistance on basic matters which he/she should have the ability and responsibility to handle alone',
      p2: 'Discusses ideas in a manner that is confusing or hard to understand.',
      p3: 'Exhibits nonverbal behaviour that discourages input from others (e.g., not looking at others when speaking, closed posture, frowning)',
      p4: 'Loses composure or confidence when faced with tense or stressful situations, becoming ineffective or letting frustrations show in ways that are not constructive',
      p5: 'Never achieves the goals that have been set by management for the store',
      p6: 'Treats people differently in ways that reduce trust; shows a bias towards favouring certain people.'
    },
    end: {
      __typename: 'Pages',
      p1: 'Acts independently and takes the initiative to address tough matters when they arise',
      p2: 'Discusses ideas in ways that are logical, organised, and easy to understand',
      p3: 'Exhibits nonverbal behaviour that consistently shows receptivity to others (e.g., maintains regular eye contact, smiles, nods, has open posture).',
      p4: 'Exhibits excellent emotional control and a strong sense of self-confidence, even when faced with highly tense or stressful situations (e.g., stays energized even when things go wrong).',
      p5: 'Always achieves the goals that have been set by management for the store',
      p6: 'Consistently treats people fairly and respectfully (e.g., is open-minded and nonjudgmental). Treats people with respect and encourages others to do the same'
    },
    errors: []
  },
  participantSurvey: {
    __typename: 'Survey',
    color: false,
    directionStandard: true,
    surveyName: 'participant',
    companyName: '',
    introPage1: 'The following questionnaire has been provided by {company} to assist you to develop your management skills, and should take you approximately 5 minutes to complete.',
    introPage2: 'Please read and answer the following statements by providing a rating from 0 to 5 that best describes you. Respond by giving the best indication of how you think, feel, or act. There are no right or wrong answers, please answer as honestly as you can and answer all scales. There are six response options for each statement.',
    subHeading: {
      __typename: 'Pages',
      p1: 'I back my position or view and that of others even though it may be considered unpopular.',
      p2: 'I provide accurate and clear ideas to management and team mates when I have something to say.',
      p3: 'I clearly understand exactly what others explain to me (e.g., management, suppliers, team mates)',
      p4: 'I adjust or change my plans to respond to a difficult or unexpected situation',
      p5: 'I achieve the goals that have been set by management',
      p6: 'I relate to owners, managers, suppliers, and team mates across the store'
    },
    start: {
      __typename: 'Pages',
      p1: 'No Never',
      p2: 'No Never',
      p3: 'No Never',
      p4: 'No Never',
      p5: 'No Never',
      p6: 'No Never'
    },
    end: {
      __typename: 'Pages',
      p1: 'Always',
      p2: 'Always',
      p3: 'Always',
      p4: 'Always',
      p5: 'Always',
      p6: 'Always'
    },
    errors: []
  },
  survey: {
    __typename: 'Survey',
    color: true,
    directionStandard: true,
    surveyName: 'participant',
    companyName: '',
    introPage1: 'The following questionnaire has been provided by {company} to assist you to develop your management skills, and should take you approximately 5 minutes to complete.',
    introPage2: 'Please read and answer the following statements by providing a rating from 0 to 5 that best describes you. Respond by giving the best indication of how you think, feel, or act. There are no right or wrong answers, please answer as honestly as you can and answer all scales. There are six response options for each statement.',
    subHeading: {
      __typename: 'Pages',
      p1: 'I back my position or view and that of others even though it may be considered unpopular.',
      p2: 'I provide accurate and clear ideas to management and team mates when I have something to say.',
      p3: 'I clearly understand exactly what others explain to me (e.g., management, suppliers, team mates)',
      p4: 'I adjust or change my plans to respond to a difficult or unexpected situation',
      p5: 'I achieve the goals that have been set by management',
      p6: 'I relate to owners, managers, suppliers, and team mates across the store'
    },
    start: {
      __typename: 'Pages',
      p1: 'No Never',
      p2: 'No Never',
      p3: 'No Never',
      p4: 'No Never',
      p5: 'No Never',
      p6: 'No Never'
    },
    end: {
      __typename: 'Pages',
      p1: 'Always',
      p2: 'Always',
      p3: 'Always',
      p4: 'Always',
      p5: 'Always',
      p6: 'Always'
    },
    errors: []
  }
}

export default defaults