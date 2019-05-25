import React from 'react'
import { Button, Popup } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import { SEND_REMINDER } from '../../../../graphql/mutations'

const ReminderButton = ({ mobile, firstTime, companyName }) => (
  <Mutation mutation={SEND_REMINDER} variables={{ mobile, firstTime, companyName }} >
    {
      (sendReminder, { error, data, loading }) => {
        if (loading) { return <Button primary content="...loading" /> }
        if (error) { return <Button color="red" content="error" /> }
        if (data) {
          if (data.sendReminder) {
            return (
              <Popup trigger={<Button color="purple" content="sms receipt" />} content={data.sendReminder[0].message} />
            )
          }
          return (
            <Popup trigger={<Button color="purple" content="sms receipt" />} content={'success'} />
          )
        }
        return (
          <Button primary onClick={sendReminder}>Send SMS</Button>
        )
      }
    }
  </Mutation>
)


export default ReminderButton
