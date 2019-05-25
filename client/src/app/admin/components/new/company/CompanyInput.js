import React from 'react'
import { Mutation } from 'react-apollo'
import { Form } from 'semantic-ui-react'
import { UPDATE_COMPANY } from '../../../../../graphql/local/mutations'

export default ({ companyName }) => (
  <Mutation mutation={UPDATE_COMPANY}>
    {
      updateCompany =>
        (
          <Form>
            <Form.Group>
              <Form.Field>
                <label>Company Name</label>
                <input
                  placeholder='company name'
                  autoFocus
                  value={companyName}
                  onChange={
                    e => {
                      e.preventDefault()
                      updateCompany({ variables: { key: 'companyName', value: e.target.value } })
                    }
                  }
                />
              </Form.Field>
            </Form.Group>
          </Form>
        )
    }
  </Mutation>
)