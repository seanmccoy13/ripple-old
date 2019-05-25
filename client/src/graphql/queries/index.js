import gql from 'graphql-tag'

export const GET_IMAGES = gql`
  query getImages($companyName: String!){
    getImages(companyName:$companyName){
      images{
        pathname
      }
      errors{
        path
        message
      }
    }
  }
`

export const GET_PARTICIPANTS = gql`
  query getParticipants($companyName: String!, $manager: String!){
    getParticipants(companyName: $companyName, manager:$manager){
      employees{
        email
        firstName
        lastName
      }
      errors{
        path
        message
      }
    }
  }
`

export const GET_EMPLOYEE_BY_ID = gql`
  query getEmployeeById($id: String!) {
    getEmployeeById(id: $id){
      companyName
      firstName
      lastName
      email
      mobile
      manager
      groupMembership
      dashboardAccess
      surveyName
      surveyOwed
      firstTime
      lastReminder
      errors{
        path
        message
      }
    }
  }
`

export const GET_EMPLOYEE_BY_MOBILEID = gql`
  query getEmployeeByMobileId($mobileId: String!){
    getEmployeeByMobileId(mobileId:$mobileId){
      companyName
      firstName
      lastName
      email
      manager
      groupMembership
      surveyName
      surveyOwed
      firstTime
      lastReminder
      errors{
        path
        message
      }
    }
  }
`

export const GET_EMPLOYEES = gql`
  query getEmployees($companyName: String!){
  getEmployees(companyName: $companyName){
    employees{
      _id
      companyName
      firstName
      lastName
      email
      mobile
      manager
      groupMembership
      dashboardAccess
      surveyName
      surveyOwed
      firstTime
      lastReminder
    }
    errors{
      path
      message
    }
  }
}
`

export const GET_COMPANY = gql`
  query getCompany($companyName: String!){
  getCompany(companyName: $companyName){
    companyName
    groups
    errors{
      path
      message
    }
  }
}
`

export const GET_COMPANIES = gql`
  query {
    getCompanies{
      companyName
      groups
    }
  }
`

export const GET_SURVEY = gql`
query getSurvey($surveyName:String!, $companyName: String!){
  getSurvey(surveyName: $surveyName, companyName: $companyName){
      color
      directionStandard
      companyName
      surveyName
      introPage1
      introPage2
      subHeading{
        p1
        p2
        p3
        p4
        p5
        p6
      }
      start{
        p1
        p2
        p3
        p4
        p5
        p6
      }
      end {
        p1
        p2
        p3
        p4
        p5
        p6
      }
      errors{
        path
        message
      }    
    }
  }
`

export const GET_SURVEYS = gql`
  query getSurveys($companyName: String!){
  getSurveys(companyName: $companyName){
    surveys {
      companyName
      surveyName
      color
      directionStandard
      introPage1
      introPage2
      subHeading{
        p1
        p2
        p3
        p4
        p5
        p6
      }
      start{
        p1
        p2
        p3
        p4
        p5
        p6
      }
      end {
        p1
        p2
        p3
        p4
        p5
        p6
      }
    }
    errors{
      path
      message
    }
  }
}
`
export const GET_LOGGED_IN = gql`
  query {
    getLoggedIn{
      errors{
        path
        message
      }
      loggedInUser{
        _id
        email
      }
    }
  }
`

export const GET_RESULTS = gql`
  query getResults(
  $companyName: String!,
  $email: String,
  $surveyName: String, 
  $manager:String,
  $participant:String){
    getResults(
      companyName:$companyName,
      email:$email,
      surveyName: $surveyName,
      manager: $manager,
      participant: $participant
    ){
            results{
        email
        participant
        manager
        group
        companyName
        surveyName
        date
        p1
        p2
        p3
        p4
        p5
        p6
      }
      errors{
        path
        message
      }
    }
  }
`

export const GET_USER_ACCOUNT = gql`
  query getUser($id: String!){
    getUser(id: $id){
      resetId
      confirmed
      forgotPasswordLocked
      email
    }
  }
`