import React from 'react'
import { graphql } from 'react-apollo'
import { Header, Divider, Button } from 'semantic-ui-react/dist/commonjs'
import { MsgStyle, StyledLink, StyledIntro } from './style'
import { START_SURVEY } from '../../../../graphql/local/mutations'
import Logo from '../common/Logo'
import { SelectParticipant } from '../common/SelectParticipant'
const mutation = START_SURVEY

export class Participant extends React.Component {
  async componentDidMount() {
    const { companyName, manager, surveyName, email } = this.props.user
    await this.props.mutate({
      variables: {
        participant: '',
        participantName: '',
        companyName,
        surveyName,
        email,
        manager
      }
    })
  }
  render() {
    const { companyName } = this.props.user
    const { introPage1 } = this.props.survey
    return (
      <StyledIntro>
        <Logo size="medium" />
        <Header as="h1" textAlign="center" size="large" color="teal">
          Participant Survey
          <Divider />
          <Header.Subheader>
            <MsgStyle>
              {introPage1.replace('{company}', companyName)}
            </MsgStyle>
          </Header.Subheader>
        </Header>
        <MsgStyle>
          <h4>This must be completed in a single session.</h4>
        </MsgStyle>
        <StyledLink to="/survey/intro2" >
          <Button
            type='submit'
            fluid
            size="large"
            color="teal"
          >Next</Button></StyledLink>
      </StyledIntro>
    )
  }
}
export default graphql(mutation)(Participant)


export const Manager = ({ user }) => (
  <StyledIntro>
    <Logo size="medium" />
    <Header as="h1" textAlign="center" size="large" color="teal">
      Management Review Survey
      <Divider />
      <Header.Subheader>
        <MsgStyle>
          <SelectParticipant user={user} />
        </MsgStyle>
      </Header.Subheader>
    </Header>
  </StyledIntro>
)
