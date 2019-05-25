import React from 'react'
import { Icon } from 'semantic-ui-react'
import { StyledRestartSurveyLink } from './style'

const RestartSurveyLink = () => (
  <StyledRestartSurveyLink to="/survey">
    <Icon color="teal" name='redo' />
  </StyledRestartSurveyLink>
)


export default RestartSurveyLink