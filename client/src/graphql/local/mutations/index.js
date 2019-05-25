import gql from 'graphql-tag'


export const UPDATE_SURVEY = gql`
  mutation updateSurvey($survey: Survey) {
    updateSurvey(survey: $survey) @client
  }
`
export const UPDATE_SURVEY_VALUE = gql`
  mutation updateSurveyValue($key: String, $value: Survey) {
    updateSurveyValue(key: $key, value: $value) @client
  }
`

export const UPDATE_USER = gql`
  mutation updateUser($user: Employee) {
    updateUser(user: $user)  @client
  }
`


export const ADD_USER = gql`
  mutation addUser($user: Employee) {
    addUser(user: $user)  @client
  }
`
export const RESET_USER = gql`
  mutation resetUser($reset: Boolean) {
    resetUser(reset: $reset)  @client
  }
`

export const ADD_USERS = gql`
  mutation addUsers($users: Users) {
    addUsers(users: $users)  @client
  }
`

export const REMOVE_USER = gql`
  mutation removeUser($email: String!) {
    removeUser(email: $email)  @client
  }
`

export const UPDATE_USER_VALUE = gql`
  mutation updateUserValue($key: String, $value: User) {
    updateUserValue(key: $key, value: $value) @client
  }
`

export const UPDATE_COMPANY = gql`
  mutation updateCompany($key: String, $value: Company) {
    updateCompany(key: $key, value: $value) @client
  }
`

export const ADD_COMPANIES_LOCAL = gql`
  mutation addCompanies($companies: [Company]) {
    addCompanies(companies: $companies) @client
  }
`


export const REMOVE_GROUP = gql`
  mutation removeGroup($group: String) {
    removeGroup(group: $group)  @client
  }
`

export const RESET_CACHE_ACCEPT_LOGGEDIN = gql`
  mutation resetCacheAcceptLoggedIn($reset: Boolean){
    resetCache(reset: $reset) @client
  }
`


export const RESET_CACHE_LOCAL = gql`
  mutation resetCache($id: ID){
    resetCache(id: $id) @client
  }
`

export const TAKE_SURVEY = gql`
  mutation takeSurvey($key: String, $value: Result) {
    takeSurvey(key: $key, value: $value) @client
  }
`

export const START_SURVEY = gql`
  mutation startSurvey(
    $companyName: String,
    $surveyName: String,
    $email: String,
    $participant: String,
    $participantName: String,
    $manager: String
  ) {
    startSurvey(
      companyName: $companyName,
      surveyName: $surveyName,
      email: $email,
      participant: $participant,
      participantName: $participantName,
      manager: $manager
    ) @client
  }
`

export const CACHE_RESULTS = gql`
  mutation cacheResults($results: [Result!]) {
      cacheResults(results: $results) @client
    }
`

export const SET_DATE = gql`
  mutation setDate($start:Int!, $end:Int!){
    setDate(start: $start, end: $end)@client
  }
`

export const FILTER_RESULTS = gql`
  mutation filterResults($manager: String, $participant: String, $username: String){
    filterResults(manager: $manager, participant: $participant, username: $username)@client
  }
`
export const ADMIN_LOCAL = gql`
  mutation adminLogin($email: String!, $dashboardAccess: Boolean!, $companyName: String!){
    adminLogin(email: $email, dashboardAccess: $dashboardAccess, companyName: $companyName)@client
  }
`

export const SHOW_ERRORS = gql`
  mutation showError($key: String!, $value: Boolean!){
    showError(key: $key, value: $value)@client
  }
`
