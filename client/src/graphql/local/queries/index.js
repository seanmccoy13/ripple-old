import gql from 'graphql-tag'

export const GET_GROUPS_LOCAL = gql`
  query{
    company @client{
      companyName
      groups
      group
    }
  }
`

export const GET_COMPANIES_LOCAL = gql`
  query{
    companies @client{
      companies
    }
  }
`

export const GET_ERRORS_LOCAL = gql`
 query {
  errors @client {
    errors
  }
}
`

export const GET_SURVEYS_LOCAL = gql`
  query {
		survey @client {
			color
			directionStandard
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
			end{
				p1
				p2
				p3
				p4
				p5
				p6
			}
			errors
    }
		managementSurvey @client {
			color
			directionStandard
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
			end{
				p1
				p2
				p3
				p4
				p5
				p6
			}
			errors
    }
		participantSurvey @client {
			color
			directionStandard
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
			end{
				p1
				p2
				p3
				p4
				p5
				p6
			}
			errors
    }
	}
`


export const GET_MS_LOCAL = gql`
  query {
    managementSurvey @client {
			color
			directionStandard
			surveyName
			companyName
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
			end{
				p1
				p2
				p3
				p4
				p5
				p6
			}
			errors
    }
  }
`
export const GET_PS_LOCAL = gql`
  query {
    participantSurvey @client {
			color
			directionStandard
			surveyName
			companyName
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
			end{
				p1
				p2
				p3
				p4
				p5
				p6
			}
			errors
    }
  }
`

export const GET_SURVEY_LOCAL = gql`
  query {
    survey @client {
			companyName
			color
			directionStandard
			surveyName
			companyName
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
			end{
				p1
				p2
				p3
				p4
				p5
				p6
			}
			errors
    }
  }
`

export const GET_USERS_LOCAL = gql`
  query {
    users @client{
			users
			managers
			participants
			dashboard
    }
  }
`
export const GET_USER_LOCAL = gql`
  query{
    user @client {
			id
			mobileId
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
			errors
    }
  }
`

export const GET_LOGGEDIN_LOCAL = gql`
  query{
    admin @client {
			email
			dashboardAccess
			companyName
    }
  }
`

export const GET_SUMMARY = gql`
 query{
    users @client{
      employees{
				id
				mobileId
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
				errors
			}
			errors
    }
    company @client {
      companyName
      groups
    }
 }
`

export const GET_RESULT_LOCAL = gql`
query {
	result @client {
		email
    participant
		participantName
    manager
    group
    companyName
    surveyName
    p1
    p2
    p3
    p4
    p5
    p6
	}
}
`

export const GET_RESULTS_LOCAL = gql`
	query{
		results @client {
			results
		}
	}
`
export const GET_FILTERED_RESULTS = gql`
	query{
		filtered @client{
			username
			results
		}
	}
`

export const GET_DATE_RANGE_LOCAL = gql`
	query{
		date @client{
			start
			end
		}
	}
`

export const ERROR_CHECK = gql`
	query{
		errorChecking @client{
			showErrorFname
			showErrorLname
			showErrorEmail
			showErrorMobile
			showErrorManagerEmail
		}
	}
`