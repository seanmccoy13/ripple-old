import React from 'react'
import { Mutation } from 'react-apollo'
import { Popup, Button, Icon } from 'semantic-ui-react'
import { REMOVE_EMPLOYEE } from '../../../../../graphql/mutations'

const RemoveEmployee = ({ id }) => (
  <Mutation mutation={REMOVE_EMPLOYEE}>
    {
      removeEmployee => (
        <Popup
          trigger={<Icon color='red' name='close' aria-label="delete user" />}
          content={
            <Button
              onClick={() => removeEmployee({ variables: { id } })}
              color='green'
              content='Confirm User Deletion' />
          }
          on='click'
          position='top right'
        />
      )
    }
  </Mutation>
)




export default RemoveEmployee