import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { List } from 'semantic-ui-react/dist/commonjs'
import { StyledDropdown, StyledListLink } from '../intro/style'
import { Loading, Error } from './style'
import { GET_PARTICIPANTS } from '../../../../graphql/queries'
import { START_SURVEY } from '../../../../graphql/local/mutations'


export const SelectParticipant = ({ user: { companyName, surveyName, email } }) => (
  <Query
    query={GET_PARTICIPANTS}
    variables={{ companyName, manager: email }}
    fetchPolicy={'network-only'}
    notifyOnNetworkStatusChange={true}
  >
    {
      ({ loading, error, data, networkStatus }) => {
        if (loading) { return (<Loading><h2>...loading</h2></Loading>) }
        if (networkStatus === 4) { return <Loading><h2>Refetching!</h2></Loading> }
        if (error) { return <Error><h2>{`${error}`}</h2></Error> }
        if (data.errors) { return <Error><h2>{data.errors[0].message}</h2></Error> }
        const { employees } = data.getParticipants
        return (
          <Mutation
            mutation={START_SURVEY}
          >
            {
              startSurvey =>
                (
                  <StyledDropdown>
                    {employees && <h4>Select a participant.</h4>}
                    <List verticalAlign='middle'>
                      {
                        employees ?
                          employees.map(e => {
                            return (
                              <List.Item key={e.email} style={{ marginBottom: 20 }}>
                                <List.Content>
                                  <StyledListLink
                                    to="/survey/intro2"
                                    onClick={async () => {
                                      await startSurvey(
                                        {
                                          variables: {
                                            participant: e.email,
                                            participantName: `${e.firstName} ${e.lastName}`,
                                            companyName,
                                            surveyName,
                                            email,
                                            manager: ''
                                          }
                                        }
                                      )
                                    }
                                    }
                                  >
                                    {`${e.firstName} ${e.lastName}`}
                                  </StyledListLink>
                                </List.Content>

                              </List.Item>
                            )
                          }
                          )
                          :
                          (
                            <List.Item key="none">
                              <List.Header>
                                All reviews are complete!
                              </List.Header>
                              <List.Content>
                                You can now close this browser window.
                              </List.Content>
                            </List.Item>
                          )
                      }
                    </List>
                    {employees && <h4>This must be completed in a single session.</h4>}
                  </StyledDropdown>
                )
            }
          </Mutation>
        )
      }
    }
  </Query>
)
