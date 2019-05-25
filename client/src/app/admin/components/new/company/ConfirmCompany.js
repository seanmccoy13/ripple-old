import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { Message, Icon } from 'semantic-ui-react'
import { CREATE_COMPANY } from '../../../../../graphql/mutations'

const mutation = CREATE_COMPANY

class ConfirmCompany extends Component {
  state = {
    loading: true,
    redirect: false,
    home: false,
    errors: []
  }
  componentDidMount = async () => {
    const { companyName, groups } = this.props.company
    await this.props.mutate({ variables: { companyName, groups } })
      .then(res => {
        if (res.data.createCompany) {
          const error = res.data.createCompany[0]
          this.setState({ errors: [error.message], loading: false })
          setTimeout(() => { this.setState({ home: true }) }, 5000)
        }
        else {
          this.setState({ redirect: true })
        }
      })
      .catch(() => this.setState({ home: true, loading: false }))
  }
  render() {
    const { errors, loading, redirect, home } = this.state
    if (redirect) {
      return (
        <Redirect to="/admin-dashboard/users/add" />
      )
    }
    if (home) {
      return (
        <Redirect to="/admin-dashboard/newcompany" />
      )
    }

    if (loading) {
      return (
        <Message icon>
          <Icon name='circle notched' loading />
          <Message.Content>
            <Message.Header>Just one second</Message.Header>
            While we create the new company.
          </Message.Content>
        </Message>
      )
    }
    if (errors.length > 0) {
      return (
        <Message
          error
          header='There were some errors with your submission'
          list={errors}
        />
      )
    }
    return (
      <Message
        error
        header='Try again'
      />
    )
  }
}

export default graphql(mutation)(ConfirmCompany)