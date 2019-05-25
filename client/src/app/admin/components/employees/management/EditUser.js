import React, { Component } from 'react';
import validator from 'validator';
import { Mutation } from 'react-apollo';
import {
  Input,
  Segment,
  Label,
  Radio,
  Message,
  Button,
  Popup,
} from 'semantic-ui-react';
import { EDIT_EMPLOYEE } from '../../../../../graphql/mutations';
import SetPassword from '../../new/employees/SetPassword';

export default class EditUser extends Component {
  state = {
    sent: false,
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    manager: '',
    dashboardAccess: false,
    surveyName: 'participant',
    surveyOwed: true,
    firstTime: true,
    lastReminder: '',
    showError: {
      firstName: false,
      lastName: false,
      email: false,
      mobile: false,
      manager: false,
    },
  };
  componentDidMount = () => {
    if (this.props.user) {
      this.setState({
        id: this.props.user._id,
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        email: this.props.user.email,
        mobile: this.props.user.mobile,
        manager:
          this.props.user.surveyName === 'participant'
            ? this.props.user.manager
            : '',
        dashboardAccess: this.props.user.dashboardAccess,
        surveyName: this.props.user.surveyName,
        surveyOwed: this.props.user.surveyOwed,
        firstTime: this.props.user.firstTime,
        lastReminder: this.props.user.lastReminder,
      });
    }
  };
  onNameChange = (e, { name, value }) => {
    this.setState({
      [name]: value,
      showError: {
        [name]: !validator.isAlpha(value),
      },
    });
  };

  onMobileChange = (e, { value }) => {
    this.setState({
      mobile: value,
      showError: {
        mobile: !validator.isMobilePhone(value, 'any', { strictMode: true }),
      },
    });
  };

  onEmailChange = (e, { value, name }) => {
    this.setState({
      [name]: value,
      showError: {
        [name]: !validator.isEmail(value),
      },
    });
  };
  onMs = () => this.setState({ surveyName: 'management', manager: '' });
  onPs = () => this.setState({ surveyName: 'participant' });
  onNone = () => this.setState({ surveyName: '', manager: '' });
  toggle = () =>
    this.setState(prevProps => ({
      dashboardAccess: !prevProps.dashboardAccess,
    }));
  render() {
    const {
      showError,
      id,
      firstName,
      lastName,
      email,
      mobile,
      surveyName,
      manager,
      dashboardAccess,
    } = this.state;
    return (
      <Mutation mutation={EDIT_EMPLOYEE}>
        {editEmployee => {
          return (
            <Segment raised>
              <Popup
                trigger={
                  <Button
                    color="red"
                    icon="close"
                    content="Caution - Remove Permanently"
                  />
                }
                content={
                  <Button
                    onClick={() => this.props.delete()}
                    color="green"
                    content="Confirm User Deletion"
                  />
                }
                on="click"
                position="top right"
              />
              <Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="first name"
                name="firstName"
                required
                value={firstName}
                error={showError.firstName}
                onChange={this.onNameChange}
              />

              <Input
                fluid
                required
                icon="user"
                iconPosition="left"
                placeholder="last name"
                value={lastName}
                error={showError.lastName}
                name="lastName"
                onChange={this.onNameChange}
              />

              <Input
                fluid
                required
                icon="mail outline"
                iconPosition="left"
                placeholder="E-mail address"
                value={email}
                error={showError.email}
                name="email"
                onChange={this.onEmailChange}
              />

              <Input
                fluid
                required
                icon="mobile"
                iconPosition="left"
                placeholder="mobile number inc country code"
                value={mobile}
                error={showError.mobile}
                name="mobile"
                onChange={this.onMobileChange}
              />
              <Message
                error={showError.mobile}
                header="Mobile Format"
                content="Mobile number should be in the E.164 format (+61491570156)"
              />
              <Label>Survey Type</Label>
              <Radio
                label="Participant Survey"
                checked={surveyName === 'participant'}
                onChange={this.onPs}
              />
              <Radio
                label="Manager Review"
                checked={surveyName === 'management'}
                onChange={this.onMs}
              />
              <Radio
                label="None"
                checked={!surveyName}
                onChange={this.onNone}
              />

              {surveyName === 'participant' && (
                <Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="Manager's Email"
                  type="email"
                  error={!validator.isEmail(manager)}
                  value={manager}
                  name="manager"
                  onChange={this.onEmailChange}
                  required
                />
              )}
              <Segment raised>
                <Label>Dashboard Access</Label>
                <Radio
                  checked={dashboardAccess}
                  toggle
                  label={dashboardAccess ? 'has access' : 'no access'}
                  onChange={this.toggle}
                />
                {dashboardAccess && <SetPassword email={email} id={id} />}
              </Segment>
              <Button
                fluid
                primary
                icon="close"
                content="commit changes"
                onClick={() =>
                  editEmployee({
                    variables: {
                      id,
                      firstName,
                      lastName,
                      email,
                      mobile,
                      surveyName,
                      manager,
                      dashboardAccess,
                    },
                  })
                }
              />
            </Segment>
          );
        }}
      </Mutation>
    );
  }
}
