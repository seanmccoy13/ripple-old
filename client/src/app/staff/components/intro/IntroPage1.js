import React from 'react'
import Participant, { Manager } from './Setup'

const IntroPage1 = ({ user, survey }) => user.surveyName !== 'management'
  ? (<Participant user={user} survey={survey} />)
  : (<Manager user={user} />)




export default IntroPage1