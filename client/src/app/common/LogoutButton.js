import React from 'react'
import { Button } from 'semantic-ui-react'
import { Mutation, Query } from 'react-apollo'


// get id from logged in user
import { GET_USER_LOCAL } from '../../graphql/local/queries'
// destory session on server and in DB
import { LOGOUT } from '../../graphql/mutations'
// Remove user from local cache
import { RESET_CACHE_LOCAL } from '../../graphql/local/mutations'

// all secure routes are wrapped so they will return to their respective login

const LogoutButton = () => (
  <Query query={GET_USER_LOCAL}>
    {
      ({ data: { user: { id } } }) => {
        return (
          <Mutation mutation={RESET_CACHE_LOCAL} >
            {
              resetCache => (
                <Mutation mutation={LOGOUT} variables={{ id }}>
                  {
                    logout => {
                      const destroy = () => {
                        logout().then(() => resetCache())

                      }
                      return (
                        <Button animated='fade' onClick={destroy}>
                          <Button.Content visible>
                            logout
                          </Button.Content>
                          <Button.Content hidden>
                            end session
                          </Button.Content>
                        </Button>
                      )
                    }
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

export default LogoutButton
