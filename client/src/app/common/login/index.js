import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import { Image, Icon, Form, Button } from 'semantic-ui-react';
import logo from '../../../images/ripple/ripple-logo-full.png';
import { StyledLoginDiv, StyledLoginFormDiv } from './style';
import { LOGIN_USER } from '../../../graphql/mutations';
import { UPDATE_USER, ADMIN_LOCAL } from '../../../graphql/local/mutations';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
    redirect: false,
    loading: false,
  };
  onChange = (e, { name, value }) => this.setState({ [name]: value });
  onSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    this.props
      .loginUser({ variables: { email, password } })
      .then(data => {
        const { login } = data.data;
        if (login.errors) {
          const errors = login.errors.map(e => (
            <div key={`${e.path}`}>{e.message}</div>
          ));
          return this.setState({ errors });
        }
        const {
          _id,
          companyName,
          firstName,
          lastName,
          email,
          mobile,
          manager,
          groupMembership,
          dashboardAccess,
          surveyName,
          surveyOwed,
        } = login;

        if (companyName === 'Ripple') {
          this.props
            .adminLogin({ variables: { email, dashboardAccess, companyName } })
            .then(() => this.setState({ redirect: true }));
        } else {
          this.props
            .updateUser({
              variables: {
                user: {
                  id: _id,
                  companyName,
                  firstName,
                  lastName,
                  email,
                  mobile,
                  manager,
                  groupMembership,
                  dashboardAccess,
                  surveyName,
                  surveyOwed,
                },
              },
            })
            .then(() =>
              this.props
                .adminLogin({
                  variables: { email, dashboardAccess, companyName },
                })
                .then(() => this.setState({ redirect: true }))
            )
            .catch(err => console.error(err)); // eslint-disable-line no-console
        }
      })
      .catch(error => this.setState({ errors: [`${error}`] }));
  };
  render() {
    if (this.props.location.pathname === '/ripple' && this.state.redirect) {
      return <Redirect to="/admin-dashboard" />;
    }
    if (this.state.redirect) {
      return <Redirect to="/results" />;
    }
    return (
      <StyledLoginDiv>
        <Image
          name="users"
          src={logo}
          style={{ width: 360, paddingTop: 100 }}
        />
        <StyledLoginFormDiv>
          <Form
            size="large"
            onSubmit={this.onSubmit}
            style={{
              width: 240,
              height: 300,
              borderRadius: 10,
              paddingTop: 30,
            }}
          >
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              name="email"
              onChange={this.onChange}
              required
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              onChange={this.onChange}
              required
            />

            <div style={{ color: 'red' }}>{this.state.errors}</div>
            <Button
              inverted
              fluid
              size="large"
              disabled={this.state.loading && !this.state.errors}
            >
              {this.state.loading && !this.state.errors && (
                <Icon loading name="spinner" />
              )}
              Submit
            </Button>
          </Form>
        </StyledLoginFormDiv>
      </StyledLoginDiv>
    );
  }
}

export default compose(
  graphql(LOGIN_USER, { name: 'loginUser' }),
  graphql(UPDATE_USER, { name: 'updateUser' }),
  graphql(ADMIN_LOCAL, { name: 'adminLogin' })
)(Login);
