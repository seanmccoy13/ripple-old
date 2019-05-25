import React from 'react'
import { ACTIVE_NON_COLOR, NON_ACTIVE_NON_COLOR } from '../common/style'
import { Button } from 'semantic-ui-react'

const SurveyMonoButton = ({ active, number, takeSurvey }) => {
  return (
    <Button
      style={
        active !== number
          ? NON_ACTIVE_NON_COLOR(number + 1)
          : ACTIVE_NON_COLOR
      }
      size="big"
      onClick={takeSurvey}
    >
      {number - 1}
    </Button>
  )
}


export default SurveyMonoButton