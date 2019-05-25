import React from 'react'
import { Redirect } from 'react-router-dom'
import { Query } from 'react-apollo'
import { Route } from 'react-router-dom'
import { GET_USER_LOCAL, GET_RESULTS_LOCAL, GET_USERS_LOCAL, GET_DATE_RANGE_LOCAL } from '../../graphql/local/queries'


export const WrappedAuthRoute = ({ component: Component, ...rest }) => (
  <Query query={GET_DATE_RANGE_LOCAL}>
    {
      ({ data: { date } }) => (
        <Query query={GET_USERS_LOCAL}>
          {
            ({ data: { users } }) => {
              return (
                <Query query={GET_RESULTS_LOCAL}>
                  {
                    ({ data: { results } }) => {
                      return (
                        <Query query={GET_USER_LOCAL}>
                          {
                            ({ data: { user } }) => {
                              const { companyName, email, dashboardAccess } = user
                              if (!companyName || !email || !dashboardAccess) { return <Redirect to="/" /> }
                              const newProps = { user, users, results, date }
                              return (
                                <Route {...rest} render={props => (<Component {...props} {...newProps} />)} />
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
    }
  </Query>
)
