import React, { Fragment } from 'react'
import { Mutation } from 'react-apollo'
import { Button, Message } from 'semantic-ui-react'
import { CREATE_EMPLOYEE } from '../../../../../graphql/mutations'
import { RESET_USER } from '../../../../../graphql/local/mutations'

const UserAddToList = ({ user, companyName }) => (
  <Mutation mutation={RESET_USER} >
    {
      resetUser => {
        return (
          <Mutation mutation={CREATE_EMPLOYEE} >
            {
              (createEmployee, { data, loading }) => {
                if (data) {
                  if (data.createEmployee) {
                    return (
                      <Fragment>
                        <Button
                          onClick={async e => {
                            e.preventDefault()
                            const emp = await createEmployee({ variables: { ...user, companyName } })
                            if (!emp) { resetUser(true) }

                          }}
                          fluid
                          icon="user"
                          content="add user"
                        />
                        <Message negative>
                          <Message.Content>
                            <Message.Header>Error</Message.Header>
                            {data.createEmployee[0].message}
                          </Message.Content>
                        </Message>

                      </Fragment>
                    )
                  }
                }
                if (loading) {
                  return (
                    <Button loading primary>
                      Loading
                    </Button>
                  )
                }
                return (
                  <Button
                    onClick={async e => {
                      e.preventDefault()
                      const emp = await createEmployee({ variables: { ...user, companyName } })
                      if (!emp) { resetUser(true) }

                    }}
                    fluid
                    icon="user"
                    content="add user"
                  />
                )
              }
            }
          </Mutation>
        )
      }
    }
  </Mutation>
)


export default UserAddToList
