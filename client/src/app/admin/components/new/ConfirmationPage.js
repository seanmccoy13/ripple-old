import React, { Fragment } from 'react'
import { Message, Icon } from 'semantic-ui-react'

const ConfirmationPage = ({ company: { companyName } }) => {

  return (
    <Fragment>
      <Message icon info>
        <Icon name='star' />
        <Message.Content>
          <Message.Header>{companyName} Created</Message.Header>
          Company is ready to use
        </Message.Content>
      </Message>
    </Fragment>
  )
}


export default ConfirmationPage
