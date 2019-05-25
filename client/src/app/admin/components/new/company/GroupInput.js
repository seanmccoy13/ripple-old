import React from 'react'
import { Mutation } from 'react-apollo'
import { Form } from 'semantic-ui-react'
import { UPDATE_COMPANY } from '../../../../../graphql/local/mutations'

const GroupInput = ({ data: { group, groups } }) => (
  <Mutation mutation={UPDATE_COMPANY}>
    {
      updateCompany =>
        (
          <Form onSubmit={e => {
            e.preventDefault()
            updateCompany({ variables: { key: 'groups', value: [...groups, group] } })
          }}>
            <Form.Group>
              <Form.Field>
                <label>Groups</label>
                <input
                  placeholder='new group'
                  value={group}
                  onChange={
                    e => {
                      e.preventDefault()
                      updateCompany({ variables: { key: 'group', value: e.target.value } })
                    }
                  }
                />
                <Form.Button disabled={!group} color='black' content='Add' type="submit" floated="right" />
              </Form.Field>

            </Form.Group>
          </Form>
        )
    }
  </Mutation>
)


export default GroupInput