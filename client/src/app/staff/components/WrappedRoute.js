import React from 'react'
import { Redirect } from 'react-router-dom'
import { Query } from 'react-apollo'
import { Route } from 'react-router-dom'
import { GET_USER_LOCAL, GET_RESULT_LOCAL, GET_SURVEY_LOCAL } from '../../../graphql/local/queries'
import SurveyNotAvailable from './common/SurveyNotAvailable'



export const WrappedRoute = ({ component: Component, ...rest }) => (
  <Query query={GET_SURVEY_LOCAL}>
    {
      ({ data: { survey } }) => {
        return (
          <Query query={GET_RESULT_LOCAL}>
            {
              ({ data: { result } }) => {
                return (
                  <Query query={GET_USER_LOCAL}>
                    {
                      ({ loading, data: { user } }) => {
                        if (loading) { return (<div><p>...loading</p></div>) }
                        const { companyName, email, surveyName } = user
                        if (!companyName || !email) { return <Redirect to="/" /> }
                        if (!surveyName) { return <SurveyNotAvailable /> }
                        const newProps = { result, user, survey }
                        return (
                          <Route {...rest} render={props => {
                            return (
                              <Component {...props} {...newProps} />
                            )
                          }} />
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
    }
  </Query>
)
