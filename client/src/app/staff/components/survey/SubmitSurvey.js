import React from 'react'
import { Mutation } from 'react-apollo'
import { CREATE_RESULT } from '../../../../graphql/mutations'
import { Header, Icon, Divider, Menu } from 'semantic-ui-react/dist/commonjs'
import { MSG_STYLE, Loading, Error } from '../common/style'
import {
  StyledMenu,
  StyledMenuInner,
  StyledSurveyLink,
  StyledSubmitSurvey,
  StyledSubmitSurveyAction,
  StyledSurveyButton
} from './style'
import SurveyNotAvailable from '../common/SurveyNotAvailable'

const SubmitSurvey = ({ result, user, history }) => {
  const {
    email,
    participant,
    participantName,
    manager,
    group,
    companyName,
    surveyName,
    p1,
    p2,
    p3,
    p4,
    p5,
    p6
  } = result
  return (
    <Mutation mutation={CREATE_RESULT}>
      {
        (createResult, { loading, error, data }) => {
          if (data) {
            return user.surveyName === 'participant' ? (<SurveyNotAvailable />) : history.push(`/id/${user.mobileId}`)
          }
          return (
            <StyledSubmitSurvey>
              <Header as="h1" icon textAlign="center" size="large" color="teal">
                <Icon name="edit" />
                Submit Survey
                <Divider />
                <Header.Subheader style={MSG_STYLE} >
                  {loading && <Loading>Loading...</Loading>}
                  {error && <Error>Error :( Please try again {`${error}`}</Error>}
                </Header.Subheader>
              </Header>
              <StyledSubmitSurveyAction>
                Click "Submit"
              </StyledSubmitSurveyAction>
              <StyledSubmitSurveyAction>
                or
              </StyledSubmitSurveyAction>
              <StyledSubmitSurveyAction>
                "Back" to make changes
              </StyledSubmitSurveyAction>

              <StyledMenu>
                <StyledMenuInner>
                  <Menu fluid widths={2}>
                    <Menu.Item color="black">
                      <StyledSurveyLink to='/survey/page/6'>Back</StyledSurveyLink>
                    </Menu.Item>
                    <Menu.Item color="black">
                      <StyledSurveyButton
                        to={`/id/${user.mobileId}`}
                        onClick={() =>
                          createResult({
                            variables: {
                              email,
                              participant,
                              participantName,
                              manager,
                              group,
                              companyName,
                              surveyName,
                              p1,
                              p2,
                              p3,
                              p4,
                              p5,
                              p6,
                            }
                          })
                        } >Submit</StyledSurveyButton>
                    </Menu.Item>
                  </Menu>
                </StyledMenuInner>
              </StyledMenu>
            </StyledSubmitSurvey>
          )
        }
      }
    </Mutation>
  )
}

export default SubmitSurvey
