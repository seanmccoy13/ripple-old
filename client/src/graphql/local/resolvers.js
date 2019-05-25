import { GET_GROUPS_LOCAL, GET_SURVEY_LOCAL, GET_USER_LOCAL, GET_USERS_LOCAL, GET_RESULT_LOCAL, GET_RESULTS_LOCAL, GET_DATE_RANGE_LOCAL, GET_COMPANIES_LOCAL, GET_LOGGEDIN_LOCAL, ERROR_CHECK, GET_FILTERED_RESULTS } from './queries'
import defaults from './defaults'

const resolvers = {
  Query: {},
  Mutation: {
    showError: (_, { key, value }, { cache }) => {
      const query = ERROR_CHECK
      const previous = cache.readQuery({ query })
      const data = {
        errorChecking: {
          __typename: 'ErrorCheck',
          ...previous.errorChecking,
          [key]: value
        }
      }
      cache.writeQuery({ query, data })
      return null
    },
    setDate: (_, { start, end }, { cache }) => {
      const query = GET_DATE_RANGE_LOCAL
      const data = {
        date: {
          __typename: 'Date',
          start,
          end
        }
      }
      cache.writeQuery({ query, data })
      return null
    },
    resetCache: (_, { email }, { cache }) => {
      const query = GET_USER_LOCAL
      const user = cache.readQuery({ query })
      if (user.email === email) {
        cache.writeData({ data: defaults })
        return null
      }
      return null
    },
    updateUser: (_, { user }, { cache }) => {
      const query = GET_USER_LOCAL
      const previous = cache.readQuery({ query })
      const data = {
        user: {
          __typename: 'User',
          ...previous.user,
          ...user
        }
      }
      cache.writeQuery({ query, data })
      return null
    },
    adminLogin: (_, { email, dashboardAccess, companyName }, { cache }) => {
      const query = GET_LOGGEDIN_LOCAL
      const data = {
        admin: {
          __typename: 'Loggedin',
          email,
          dashboardAccess,
          companyName
        }
      }
      cache.writeQuery({ query, data })
      return null
    },
    updateUserValue: (_, { key, value }, { cache }) => {
      const query = GET_USER_LOCAL
      const previous = cache.readQuery({ query })
      const data = {
        user: {
          __typename: 'User',
          ...previous.user,
          [key]: value
        }
      }
      cache.writeQuery({ query, data })
      return null
    },
    resetUser: (_, { reset }, { cache }) => {
      if (reset) {
        const query = GET_USER_LOCAL
        const data = {
          user: {
            ...defaults.user
          }
        }
        cache.writeQuery({ query, data })
        return null
      }
      return null
    },
    resetCacheAcceptLoggedIn: (_, { reset }, { cache }) => {
      const query = GET_LOGGEDIN_LOCAL
      const previous = cache.readQuery({ query })
      if (reset) {
        const data = {
          ...defaults,
          admin: {
            __typename: 'Loggedin',
            ...previous.admin
          }
        }
        cache.writeQuery({ query, data })
        return null
      }
      return null
    },
    addUser: (_, { user }, { cache }) => {
      const query = GET_USERS_LOCAL
      const previous = cache.readQuery({ query })
      const data = {
        users: {
          __typename: 'Users',
          users: [
            ...previous.users.users,
            {
              __typename: 'User',
              ...user
            }
          ]
        }
      }
      cache.writeQuery({ query, data })
      const reset = {
        user: defaults.user
      }
      cache.writeData({ query: GET_USER_LOCAL, data: reset })
      return null
    },
    addUsers: (_, { users }, { cache }) => {
      const managers = users.filter(x => x.groupMembership.includes('management'))
      const participants = users.filter(x => x.groupMembership.includes('participant'))
      const dashboard = users.filter(x => x.dashboardAccess)
      const data = {
        users: {
          __typename: 'Users',
          users: [...users],
          managers,
          participants,
          dashboard
        }
      }
      cache.writeData({ data })
      return null
    },
    removeUser: (_, { email }, { cache }) => {
      const query = GET_USERS_LOCAL
      const previous = cache.readQuery({ query })
      const data = {
        users: {
          __typename: 'Users',
          users: previous.users.users.filter(u => u.email !== email)
        }
      }
      cache.writeQuery({ query, data })
      return null
    },
    updateCompany: (_, { key, value }, { cache }) => {
      const query = GET_GROUPS_LOCAL
      const previous = cache.readQuery({ query })
      if (typeof value === 'object') {
        const data = {
          company: {
            __typename: 'CompanyLocal',
            ...previous.company,
            group: '',
            [key]: [...new Set([...previous.company.groups, ...value])]
          }
        }
        cache.writeQuery({ query, data })
        return null
      }
      const data = {
        company: {
          __typename: 'CompanyLocal',
          ...previous.company,
          [key]: value
        }
      }
      cache.writeQuery({ query, data })
      return null
    },
    addCompanies: (_, { companies }, { cache }) => {
      const query = GET_COMPANIES_LOCAL
      const data = {
        companies: {
          __typename: 'CompaniesLocal',
          companies,
        }
      }
      cache.writeQuery({ query, data })
      return null
    },
    removeGroup: (_, { group }, { cache }) => {
      const query = GET_GROUPS_LOCAL
      const previous = cache.readQuery({ query })

      const data = {
        company: {
          __typename: 'CompanyLocal',
          ...previous.company,
          groups: previous.company.groups.filter(g => g !== group)
        }
      }
      cache.writeQuery({ query, data })
      return null
    },
    updateSurvey: (_, { survey }, { cache }) => {
      const query = GET_SURVEY_LOCAL
      const previous = cache.readQuery({ query })
      const {
        companyName,
        color,
        directionStandard,
        surveyName,
        introPage1,
        introPage2,
        subHeading,
        start,
        end
      } = survey
      const data = {
        survey: {
          __typename: 'Survey',
          ...previous.survey,
          companyName,
          color,
          directionStandard,
          surveyName,
          introPage1,
          introPage2,
          subHeading: {
            __typename: 'Pages',
            ...subHeading
          },
          start: {
            __typename: 'Pages',
            ...start
          },
          end: {
            __typename: 'Pages',
            ...end
          }
        }
      }
      cache.writeQuery({ query, data })
      return null
    },
    updateSurveyValue: (_, { key, value }, { cache }) => {
      const query = GET_SURVEY_LOCAL
      const previous = cache.readQuery({ query })
      const data = {
        survey: {
          __typename: 'Survey',
          ...previous.survey,
          [key]: value
        }
      }
      cache.writeQuery({ query, data })
      return null
    },
    takeSurvey: (_, { key, value }, { cache }) => {
      const query = GET_RESULT_LOCAL
      const previous = cache.readQuery({ query })
      const data = {
        result: {
          __typename: 'Result',
          ...previous.result,
          [key]: value
        }
      }
      cache.writeQuery({ query, data })
      return null
    },
    startSurvey: (_, { companyName, surveyName, email, participant, participantName, manager }, { cache }) => {
      const query = GET_RESULT_LOCAL
      const previous = cache.readQuery({ query })
      const data = {
        result: {
          __typename: 'Result',
          ...previous.result,
          companyName,
          surveyName,
          email,
          participant,
          participantName,
          manager,
          p1: 0,
          p2: 0,
          p3: 0,
          p4: 0,
          p5: 0,
          p6: 0
        }
      }
      cache.writeQuery({ query, data })
      return null
    },
    cacheResults: (_, { results }, { cache }) => {
      const query = GET_RESULTS_LOCAL
      const data = {
        results: {
          __typename: 'Results',
          ...results,
        }
      }
      cache.writeQuery({ query, data })
      return null
    },
    filterResults: (_, { manager, participant, username }, { cache }) => {
      const query = GET_FILTERED_RESULTS
      const resultsQuery = GET_RESULTS_LOCAL
      const localResults = cache.readQuery({ query: resultsQuery })
      const management = localResults.results.results.filter(r => r.email === manager && r.participant === participant)
      const participantS = localResults.results.results
        .filter(r => r.email === participant && r.surveyName === 'participant' && r.manager === manager)
      const x = [...management, ...participantS]
      const results = x.map(result => ({ __typename: 'Result', ...result }))
      const data = {
        filtered: {
          __typename: 'Filtered',
          username,
          results,
        }
      }
      cache.writeQuery({ query, data })
      return null
    }
  }
}


export default resolvers