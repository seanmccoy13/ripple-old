import React from 'react'
import { Button } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'


// Remove user from local cache
import { RESET_CACHE_LOCAL } from '../../graphql/local/mutations'


const LogoutButton = () => (
  <Mutation mutation={RESET_CACHE_LOCAL} >
    {
      resetCache => (
        <Button animated='fade' onClick={resetCache}>
          <Button.Content visible>
            logout
          </Button.Content>
          <Button.Content hidden>
            end session
          </Button.Content>
        </Button>

      )
    }
  </Mutation>
)

export default LogoutButton
