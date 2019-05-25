import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import { Dropdown } from 'semantic-ui-react'
import SurveyInput from './SurveyInput'
import { GET_SURVEYS_LOCAL } from '../../../../graphql/local/queries'
import { UPDATE_SURVEY } from '../../../../graphql/local/mutations'
import { CREATE_SURVEY } from '../../../../graphql/mutations'

import { StyledSurveyDiv } from '../style'
const query = GET_SURVEYS_LOCAL
const mutation = UPDATE_SURVEY

class SurveyPage extends Component {
  state = {
    show: false,
    options: [
      {
        key: 'ps',
        text: 'Participant Survey',
        value: 'participantSurvey',
      },
      {
        key: 'ms',
        text: 'Management Survey',
        value: 'managementSurvey',
      }
    ],
    surveys: {}
  }
  componentDidMount = () => {
    const { createSurvey, company: { companyName }, data: { participantSurvey, managementSurvey, survey } } = this.props
    createSurvey({ variables: { survey: { ...participantSurvey, companyName } } }).then(() => {
      createSurvey({ variables: { survey: { ...managementSurvey, companyName } } }).then(() => {
        this.setState({
          surveys: { participantSurvey, managementSurvey, survey },
          show: true
        })
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))


  }
  show = () => {
    this.setState({ show: true })
  }
  onChange = (e, { value }) => {
    e.preventDefault()
    this.show()
    const { mutate, company: { companyName } } = this.props
    mutate({ variables: { survey: { ...this.state.surveys[value], companyName } } })
  }

  render() {
    const { options, show } = this.state
    const { survey } = this.props.data
    return (
      <StyledSurveyDiv>
        <Dropdown
          placeholder='Select a Survey'
          fluid
          selection
          options={options}
          onChange={this.onChange}
        />
        {show ? <SurveyInput data={survey} /> : <StyledSurveyDiv><h3>Select a survey to proceed</h3></StyledSurveyDiv>}
      </StyledSurveyDiv>

    )
  }
}

export default compose(
  graphql(query),
  graphql(mutation),
  graphql(CREATE_SURVEY, { name: 'createSurvey' }),
)(SurveyPage)
