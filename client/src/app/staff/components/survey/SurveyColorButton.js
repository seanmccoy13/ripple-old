import React from 'react'
import { NON_ACTIVE_COLOR, ACTIVE_RED, ACTIVE_GREEN } from '../common/style'
import { Button } from 'semantic-ui-react'

const SurveyColorButton = ({ active, number, takeSurvey }) => {
  return (
    <Button
      style={
        active !== number
          ? NON_ACTIVE_COLOR(number)
          : number < 3 ? ACTIVE_RED : ACTIVE_GREEN
      }
      size="big"
      onClick={takeSurvey}
    >
      {number - 1}
    </Button>
  )
}


export default SurveyColorButton