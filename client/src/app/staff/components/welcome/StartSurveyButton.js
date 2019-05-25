import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { GET_USER_LOCAL } from '../../../../graphql/local/queries'
import { UPDATE_USER, UPDATE_SURVEY } from '../../../../graphql/local/mutations'
import { StyledWelcomeButtonDiv } from './style'

const StartSurveyButton = ({ firstTime, email, survey, userDetails, mobileId }) => (
  <Query query={GET_USER_LOCAL}>
    {
      ({ data: { user } }) => {
        if (firstTime && user.email === email) {
          return <Redirect to="/firstTime" />
        }
        if (!firstTime && user.email === email) { return <Redirect to="/survey" /> }
        return (
          <Mutation mutation={UPDATE_SURVEY} variables={{ survey: { ...survey } }} >
            {
              updateSurvey => (
                <Mutation mutation={UPDATE_USER} variables={{ user: { ...userDetails, mobileId } }} >
                  {
                    updateUser => (
                      <StyledWelcomeButtonDiv>
                        <Button size="massive" fluid inverted onClick={(e) => {
                          e.preventDefault()
                          updateUser()
                          updateSurvey()
                        }}>
                          Start Survey
                        </Button>
                      </StyledWelcomeButtonDiv>
                    )
                  }
                </Mutation>
              )
            }
          </Mutation>
        )
      }
    }
  </Query>
)

export default StartSurveyButton
