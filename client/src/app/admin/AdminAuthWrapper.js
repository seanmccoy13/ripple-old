import React from 'react'
import { Redirect } from 'react-router-dom'
import { Query } from 'react-apollo'
import { Route } from 'react-router-dom'
import { Transition } from 'semantic-ui-react'
import { GET_LOGGEDIN_LOCAL, GET_GROUPS_LOCAL, GET_USER_LOCAL } from '../../graphql/local/queries'

const transitions = [
  'browse',
  'browse right',
  'drop',
  'fade',
  'fade up',
  'fade down',
  'fade left',
  'fade right',
  'fly up',
  'fly down',
  'fly left',
  'fly right',
  'horizontal flip',
  'vertical flip',
  'scale',
  'slide up',
  'slide down',
  'slide left',
  'slide right',
  'swing up',
  'swing down',
  'swing left',
  'swing right',
  'zoom'
]
const duration = 5000
const animation = transitions[10]

export const AdminAuthWrapper = ({ component: Component, ...rest }) => (
  <Query query={GET_LOGGEDIN_LOCAL}>
    {
      ({ data: { admin: { email, companyName } } }) => {

        if (!email || companyName !== 'Ripple') { return <Redirect to="/" /> }

        return (
          <Query query={GET_GROUPS_LOCAL}>
            {
              ({ data: { company } }) => {
                return (
                  <Query query={GET_USER_LOCAL}>
                    {
                      ({ data: { user } }) => {
                        const newProps = { email, company, user }
                        return (
                          <Route {...rest} render={props => {
                            return (
                              <Transition.Group animation={animation} duration={duration}>
                                <Component {...props} {...newProps} />
                              </Transition.Group>
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
