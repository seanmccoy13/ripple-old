import React, { Component } from "react";
import validator from "validator";
import { graphql } from "react-apollo";
import {
  Button,
  Input,
  Segment,
  Label,
  Radio,
  Message
} from "semantic-ui-react";
import GroupSelectionInput from "./GroupSelectionInput";
import UserList from "./UserList";
import { CREATE_EMPLOYEE } from "../../../../../graphql/mutations";

const mutation = CREATE_EMPLOYEE;

class UserInput extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    manager: "",
    groupMembership: "participant",
    dashboardAccess: false,
    surveyName: "",
    showError: {
      firstName: false,
      lastName: false,
      email: false,
      mobile: false,
      manager: false
    }
  };

  onChange = (e, { name }) => {
    this.setState({
      showError: { [name]: true },
      [name]: e.target.value
    });
  };
  onRadioChange = ({ key, value }) => {
    if (key === "surveyName" && value !== "participant") {
      this.setState({ [key]: value, manager: "" });
      return;
    }
    this.setState({ [key]: value });
    if (!this.state.showError[key]) {
      this.setState({ showError: { [key]: true } });
    }
  };

  onGroupChange = e => {
    const { value } = e.target;
    this.setState({ groupMembership: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      mobile,
      surveyName,
      manager,
      dashboardAccess,
      groupMembership
    } = this.state;

    this.props
      .mutate({
        variables: {
          companyName: this.props.companyName,
          surveyName,
          firstName,
          lastName,
          email,
          mobile,
          manager,
          groupMembership,
          dashboardAccess
        }
      })
      .then(() =>
        this.setState({
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          manager: "",
          groupMembership: "participant",
          dashboardAccess: false,
          surveyName: "",
          showError: {
            firstName: false,
            lastName: false,
            email: false,
            mobile: false,
            manager: false
          }
        })
      );
  };

  render() {
    const {
      lastName,
      email,
      mobile,
      surveyName,
      manager,
      dashboardAccess,
      showError,
      firstName
    } = this.state;
    return (
      <Segment raised>
        <form onSubmit={this.handleSubmit}>
          <Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="first name"
            name="firstName"
            required
            value={firstName}
            error={showError.firstName && !validator.isAlpha(firstName)}
            onChange={this.onChange}
          />

          <Input
            fluid
            required
            icon="user"
            iconPosition="left"
            placeholder="last name"
            value={lastName}
            error={showError.lastName && !validator.isAlpha(lastName)}
            name="lastName"
            onChange={this.onChange}
          />

          <Input
            fluid
            required
            icon="mail outline"
            iconPosition="left"
            placeholder="E-mail address"
            value={email}
            error={showError.email && !validator.isEmail(email)}
            name="email"
            onChange={this.onChange}
          />

          <Input
            fluid
            required
            icon="mobile"
            iconPosition="left"
            placeholder="mobile number inc country code"
            value={mobile}
            error={
              showError.mobile &&
              !validator.isMobilePhone(mobile, "any", { strictMode: true })
            }
            name="mobile"
            onChange={this.onChange}
          />
          <Message
            error={
              showError.mobile &&
              !validator.isMobilePhone(mobile, "any", { strictMode: true })
            }
            header="Mobile Format"
            content="Mobile number should be in the E.164 format (+61491570156)"
          />
          <Label>Group</Label>
          <GroupSelectionInput handleChange={this.onGroupChange} />
          <Segment raised>
            <Label>Survey Type</Label>
            <Radio
              label="Participant Survey"
              checked={surveyName === "participant"}
              onChange={() =>
                this.onRadioChange({ key: "surveyName", value: "participant" })
              }
            />
            <Radio
              label="Manager Review"
              checked={surveyName === "management"}
              onChange={() =>
                this.onRadioChange({ key: "surveyName", value: "management" })
              }
            />
            <Radio
              label="None"
              checked={surveyName === ""}
              onChange={() =>
                this.onRadioChange({ key: "surveyName", value: "" })
              }
            />
          </Segment>

          {surveyName === "participant" && (
            <Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="Manager's Email"
              type="email"
              error={showError.manager && !validator.isEmail(manager)}
              value={manager}
              name="manager"
              onChange={this.onChange}
              required
            />
          )}
          <Segment raised>
            <Label>Dashboard Access</Label>

            <Radio
              toggle
              checked={dashboardAccess}
              label={dashboardAccess ? "has access" : "no access"}
              onChange={() =>
                this.onRadioChange({
                  key: "dashboardAccess",
                  value: !dashboardAccess
                })
              }
            />
          </Segment>
          <Button content="Add User" type="submit" />
        </form>
        <UserList companyName={this.props.companyName} user={this.props.data} />
      </Segment>
    );
  }
}

export default graphql(mutation)(UserInput);
