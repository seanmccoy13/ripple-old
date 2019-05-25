import React from 'react'
import { Message } from 'semantic-ui-react'
import { SURVEY_BTN_STYLE } from '../common/style'
import SurveyButtonGroup from './SurveyButtonGroup'
import Logo from '../common/Logo'
import { StyledSurvey, StyledSurveyButtonDiv } from './style'
import RestartSurveyLink from './RestartSurveyLink'

const Survey = ({ match, result, survey: { subHeading, start, end, color, surveyName } }) => {
  const { id } = match.params
  const page = `p${id}`
  return (
    <StyledSurvey>
      <StyledSurveyButtonDiv>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', padding: '0 10px' }}>
          <RestartSurveyLink />
          <Logo avatar />
        </div>
        {
          surveyName === 'participant'
          && (
            <Message>
              <p>
                ‘Click’ on one of the six response options that best describes you where ‘0 is Never and 5 is Always’.
              </p>
            </Message>
          )

        }
        <Message>
          {
            surveyName === 'participant'
              ? <Message.Header>{subHeading[page]}</Message.Header>
              : <Message.Header>{subHeading[page].replace('{name}', result.participantName)}</Message.Header>
          }
        </Message>


        <Message info header={start[page]} style={SURVEY_BTN_STYLE} />
        <SurveyButtonGroup color={color} page={page} result={result} />
        <Message info header={end[page]} />
      </StyledSurveyButtonDiv>
    </StyledSurvey>
  )
}

export default Survey
