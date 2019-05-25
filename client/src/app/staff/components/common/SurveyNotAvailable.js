import React from 'react'
import { StyledError } from './style'
import logo from '../../../../images/ripple'

const SurveyNotAvailable = () => {

  return (
    <StyledError url={logo}>
      <h2>Survey up to date</h2>
      <p>sms notifications will be sent when the next survey becomes available</p>
      <p>You can now close this browser window.</p>
    </StyledError>
  )
}


export default SurveyNotAvailable