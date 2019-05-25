import React from 'react'
import { Message } from 'semantic-ui-react'
import { Query, Mutation } from 'react-apollo'
import { ASSIGN_SURVEYS } from '../../../../graphql/mutations'
import { GET_EMPLOYEES } from '../../../../graphql/queries'
import Selection from './Selection'
import { StyledLoading, StyledError, StyledSurveyDiv } from '../style'


const AssignSurveysPage = ({ company: { companyName }, location: { pathname } }) => {
  return (
    <Query query={GET_EMPLOYEES} variables={{ companyName }}>
      {
        ({ loading, error, data: { getEmployees }, networkStatus }) => {
          if (loading) { return (<StyledLoading><h2>...loading</h2></StyledLoading>) }
          if (networkStatus === 4) { return <StyledLoading><h2>Refetching!</h2></StyledLoading> }
          if (error) { return <StyledError><h2>{`Error!: ${error}`}</h2></StyledError> }


          if (getEmployees) {
            if (!getEmployees.employees) {
              return (
                <StyledSurveyDiv>
                  <Message
                    error
                    header={'no staff available'}
                    content='check that you have created employees before trying to assign surveys'
                  />
                </StyledSurveyDiv>
              )
            }
            return (
              <Mutation mutation={ASSIGN_SURVEYS}>
                {
                  assignSurvey => {
                    if (pathname === '/admin-dashboard/assign/ps') {
                      return (
                        <Selection users={getEmployees.employees} update={assignSurvey} survey='participant' />
                      )
                    }
                    return (
                      <Selection users={getEmployees.employees} update={assignSurvey} survey='management' />
                    )
                  }
                }
              </Mutation>
            )
          }

        }
      }
    </Query>
  )
}

export default AssignSurveysPage