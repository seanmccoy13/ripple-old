import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Input, Message, Button } from 'semantic-ui-react'
import { StyledInlineInput } from '../style'

const mutation = gql`
  mutation signupWithoutConfirmation($email: String!,$password: String!){
    signupWithoutConfirmation(email: $email, password: $password){
      path
      message
    }
  }
`
const query = gql`
  query getUser($id: String!){
	getUser(id: $id){
    resetId
    confirmed
    forgotPasswordLocked
    email
  }
}
`

class SetPassword extends Component {
  state = {
    password: '',
    error: '',
    done: false
  }
  handleChange = (e, { value }) => this.setState({ password: value })
  onClick = async (e) => {
    e.preventDefault()
    const { email } = this.props
    const { password } = this.state
    const user = await this.props.mutate({ variables: { email, password } })
    if (user.signupWithoutConfirmation) { this.setState({ password: '', error: user.signupWithoutConfirmation[0].message }) }
    this.setState({ password: '', done: true })
  }

  render() {
    const { error, password } = this.state
    if (!this.props.data || this.state.done) {
      return <div />
    }
    if (this.state.error) {
      return (
        <StyledInlineInput>
          <Input
            label={{ icon: 'asterisk', color: 'teal' }}
            labelPosition='left corner'
            placeholder='Enter Password'
            type="password"
            value={password}
            onChange={this.handleChange}
          />
          <Button content='Set Password' color='teal' onClick={this.onClick} />
          <Message negative>
            <Message.Header>Error creating account</Message.Header>
            <p>{error}</p>
          </Message>
        </StyledInlineInput>
      )
    }
    return (
      <StyledInlineInput>
        <Input
          label={{ icon: 'asterisk', color: 'teal' }}
          labelPosition='left corner'
          placeholder='Enter Password'
          type="password"
          value={password}
          onChange={this.handleChange}
        />
        <Button content='Set Password' color='teal' onClick={this.onClick} />
      </StyledInlineInput>
    )
  }
}


export default compose(
  graphql(query, {
    options: ({ id }) => ({ variables: { id }, pollInterval: 500 })
  }),
  graphql(mutation))(SetPassword)
