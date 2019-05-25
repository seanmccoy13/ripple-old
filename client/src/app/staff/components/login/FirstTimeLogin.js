import React, { Component } from 'react'
import { Checkbox, Divider, List } from 'semantic-ui-react'
import ButtonWithDisable from '../button/ButtonWithDisable'
import Logo from '../common/Logo'
import { StyledParticipantRelease, StyledParticipantReleaseText } from './style'

class FirstTimeLogin extends Component {
  constructor(props) {
    super(props)
    this.state = { disabled: true }
    this.onChange = () => this.setState(prevProps => ({ disabled: !prevProps.disabled }))
  }
  render() {
    const { companyName } = this.props.user
    const { disabled } = this.state
    return (
      <StyledParticipantRelease>
        <Logo size="small" />
        <h2>PARTICIPANT RELEASE OF INFORMATION</h2>
        <h3>{companyName}</h3>
        <StyledParticipantReleaseText>
          <List bulleted>
            <List.Item>
              Along with other sources of data your results are to assist {companyName} to identify development areas for you and others in similar roles. {companyName} will provide you with opportunities to discuss your results and consider development actions to build your skills further in your role.</List.Item>
            <List.Item>Completing Ripple – Contagious Attitudes also provides understanding for Capabilities – e.g. leadership and management development.  The information gathered contributes to this and will be referred to as required for development purposes.</List.Item>
            <List.Item>
              I agree that by completing Ripple – Contagious Attitudes each time, the results will be released to {companyName}.
            </List.Item>
            <List.Item>
              I understand that results will not be released to any other party without my consent.
            </List.Item>
            <List.Item>
              I understand that my responses to questions, along with hundreds of other responses, may be statistically analysed to improve the questions or provide comparative data for Ripple-Contagious Attitudes.
            </List.Item>
            <List.Item>
              I understand that once 5 years has passed, my results will be destroyed.
            </List.Item>
            <List.Item>
              I understand and accept the above procedures.
            </List.Item>
          </List>
        </StyledParticipantReleaseText>
        <p>The service provider’s privacy policy complies with the Privacy amendment (Private Sector) Act 2000.</p>

        <Divider />
        <div style={{ bottom: 0 }}>
          <Checkbox
            onChange={this.onChange}
            label={'I confirm that I\'ve read and agree to the Participant Release of Information Acknowledgment'}
          />
          <Divider />
          <ButtonWithDisable disabled={disabled} text="Accept" pathname="/survey" />
        </div>
      </StyledParticipantRelease>
    )
  }
}

export default FirstTimeLogin
