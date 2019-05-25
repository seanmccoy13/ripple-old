import React from 'react'
import { graphql, compose } from 'react-apollo'
import { Form, Message, Button } from 'semantic-ui-react'
import Modal from 'react-responsive-modal'
import { GET_USER_ACCOUNT } from '../../../../../graphql/queries'
import { CREATE_USER } from '../../../../../graphql/mutations'

const query = GET_USER_ACCOUNT
const mutation = CREATE_USER

class UserAuth extends React.Component {
  state = {
    open: false,
    user: {},
    required: false,
    fresh: true,
    password: '',
    email: this.props.email
  }

  onOpenModal = () => {
    this.setState({ open: true })
  }

  onCloseModal = () => {
    if (this.state.required) { return null }
    this.setState({
      open: false,
      user: {},
      required: false,
      fresh: true,
      password: '',
    })
  }

  onSignup = async () => {
    const { email, password } = this.state
    await this.props.mutate({ email, password })
    this.setState({ required: false, fresh: true, password: '' })
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { open, password, required, fresh } = this.state
    return (
      <div>
        <Button onClick={this.onSignup} primary>User Password</Button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <h2>{
            required && <Message
              warning
              header='password is required'
              content='Enter a password'
            />
          }</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Input
                error={!fresh && password.length < 3}
                placeholder='Password'
                name='password'
                type='password'
                required
                value={password}
                onChange={this.handleChange}
              />
              <Form.Button content='Submit' />
            </Form.Group>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default compose(
  graphql(query, {
    options: (props) => ({ variables: { id: props.id } })
  }),
  graphql(mutation)
)(UserAuth)
