import React from 'react'
import { Mutation } from 'react-apollo'
import { Header, Icon } from 'semantic-ui-react'
import Schedule from './Schedule'
import { EDIT_COMPANY } from '../../../../graphql/mutations'



const SchedulePage = ({ company: { companyName } }) => (
  <Mutation mutation={EDIT_COMPANY}>
    {
      editCompany => {
        return (
          <div>
            <Header as='h2' icon>
              <Icon name='settings' />
              Schedule Settings for {companyName}
            </Header>
            <Schedule companyName={companyName} update={editCompany} />
          </div>
        )
      }
    }
  </Mutation>
)

export default SchedulePage
