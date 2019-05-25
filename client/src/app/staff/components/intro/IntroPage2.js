import React from 'react'
import { Query } from 'react-apollo'
import { Header, Divider } from 'semantic-ui-react'
import { StyledWelcome, MsgStyle, StyledCapital } from './style'
import { Loading, Error } from '../common/style'
import { GET_RESULT_LOCAL, GET_SURVEYS_LOCAL } from '../../../../graphql/local/queries'
import Logo from '../common/Logo'


const IntroPage2 = ({ user: { surveyName, companyName } }) => {
  return (
    <Query query={GET_SURVEYS_LOCAL}>
      {
        ({ loading, error, data: { participantSurvey, managementSurvey }, networkStatus }) => {
          if (error) { return <Error><h2>{`Error!: ${error}`}</h2></Error> }
          if (loading) { return (<Loading><h2>...loading</h2></Loading>) }
          if (networkStatus === 4) { return <Loading><h2>Refetching!</h2></Loading> }

          return (
            <Query query={GET_RESULT_LOCAL}>
              {
                ({ loading, error, data: { result: { participantName } }, networkStatus }) => {
                  if (loading) { return (<Loading><h2>...loading</h2></Loading>) }
                  if (networkStatus === 4) { return <Loading><h2>Refetching!</h2></Loading> }
                  if (error) { return <Error><h2>{`Error!: ${error}`}</h2></Error> }
                  return (
                    <StyledWelcome>
                      <Logo size="medium" />
                      <Header as="h1" textAlign="center" size="large" color="teal">
                        <StyledCapital>
                          {surveyName} Survey
                        </StyledCapital>
                        <Divider />
                        <Header.Subheader>
                          <MsgStyle>
                            {
                              surveyName === 'management' &&
                              managementSurvey.introPage1.replace('{name}', participantName).replace('{company}', companyName)
                            }
                          </MsgStyle>
                          <MsgStyle>
                            {
                              surveyName === 'participant'
                                ? participantSurvey.introPage2.replace('{company}', companyName)
                                : managementSurvey.introPage2.replace('{name}', participantName).replace('{company}', companyName)
                            }
                          </MsgStyle>
                        </Header.Subheader>
                        <br />
                        <Header.Content>
                          <h4>Click "Next" to commence</h4>
                        </Header.Content>
                      </Header>
                    </StyledWelcome>
                  )
                }
              }
            </Query>
          )
        }
      }
    </Query>
  )
}


export default IntroPage2