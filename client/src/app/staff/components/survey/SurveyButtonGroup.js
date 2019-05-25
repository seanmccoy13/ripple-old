import React from 'react'
import { Mutation } from 'react-apollo'
import { TAKE_SURVEY } from '../../../../graphql/local/mutations'
import { Button } from 'semantic-ui-react'
import SurveyColorButton from './SurveyColorButton'
import SurveyMonoButton from './SurveyMonoButton'


const SurveyButtonGroup = ({ color, page, result }) => {
  let buttons = []

  const active = result[page]
  return (
    <Mutation mutation={TAKE_SURVEY}>
      {
        takeSurvey => {
          if (color) {
            buttons = [1, 2, 3, 4, 5, 6].map(n => (
              <SurveyColorButton
                takeSurvey={() => takeSurvey({ variables: { key: page, value: n } })}
                number={n}
                active={active}
                key={n} />))
          }
          if (!color) {
            buttons = [1, 2, 3, 4, 5, 6].map(n => (
              <SurveyMonoButton
                takeSurvey={() => takeSurvey({ variables: { key: page, value: n } })}
                number={n}
                active={active}
                key={n} />))
          }
          return (
            <Button.Group fluid vertical>
              {buttons}
            </Button.Group>
          )
        }
      }
    </Mutation>
  )
}


export default SurveyButtonGroup