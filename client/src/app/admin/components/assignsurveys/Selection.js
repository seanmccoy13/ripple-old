import React, { Component } from "react";
import { Button, Message, Header, List } from "semantic-ui-react/dist/commonjs";
import { StyledSurveyDiv } from "../style";
import Search from "../../../common/search";

const getOptions = options =>
  options.map(option => {
    return {
      key: `${option._id}`,
      text: `${option.firstName} ${option.lastName}, ${option.email}`,
      value: {
        _id: option._id,
        companyName: option.companyName,
        mobile: option.mobile,
        firstTime: option.firstTime
      }
    };
  });

class Selection extends Component {
  state = {
    done: false,
    errors: [],
    selected: [],
    notSelected: [],
    survey: "",
    filterTerm: ""
  };
  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.survey !== prevState.survey) {
      const { users, survey } = nextProps;
      return {
        done: false,
        errors: [],
        selected: getOptions(users.filter(user => user.surveyName === survey)),
        notSelected: getOptions(
          users.filter(user => user.surveyName !== survey)
        ),
        survey: survey
      };
    }
    return null;
  };

  componentDidMount = () => {
    const { users, survey } = this.props;
    this.setState({
      selected: getOptions(users.filter(user => user.surveyName === survey)),
      notSelected: getOptions(users.filter(user => user.surveyName !== survey)),
      survey: survey
    });
  };

  handleAdd = id => {
    this.setState(prevProps => {
      const details = prevProps.notSelected.filter(
        user => user.value._id === id
      )[0];
      return {
        notSelected: prevProps.notSelected.filter(
          user => user.value._id !== id
        ),
        selected: [...prevProps.selected, details]
      };
    });
  };

  handleRemove = id => {
    this.setState(prevProps => {
      const details = prevProps.selected.filter(
        user => user.value._id === id
      )[0];
      return {
        selected: prevProps.selected.filter(user => user.value._id !== id),
        notSelected: [...prevProps.notSelected, details]
      };
    });
  };
  submit = async () => {
    const errors = await this.props.update({
      variables: {
        surveyName: this.state.survey,
        employees: this.state.selected.map(x => ({ ...x.value }))
      }
    });
    if (errors.assignSurvey) {
      return this.setState({
        errors: errors.assignSurvey.map(err => err.message)
      });
    }
    this.setState({ done: true });
  };

  handleSearch = (e, { value }) => {
    e.preventDefault();
    const filterTerm = value.toLowerCase();
    this.setState({ filterTerm });
  };

  handleFilter = user => {
    if (user && user.hasOwnProperty("text")) {
      return user.text.toLowerCase().includes(this.state.filterTerm);
    }
    return false;
  };

  render() {
    const {
      selected,
      survey,
      done,
      errors,
      notSelected,
      filterTerm
    } = this.state;
    const selectedFiltered =
      filterTerm.length > 0 ? selected.filter(this.handleFilter) : selected;
    const notSelectedFiltered =
      filterTerm.length > 0
        ? notSelected.filter(this.handleFilter)
        : notSelected;

    if (done) {
      return (
        <StyledSurveyDiv>
          <Message
            info
            icon="inbox"
            header={`${survey.toUpperCase()} Survey assigned and SMS messages Sent`}
            content="All messages have been sent and reminders scheduled"
          />
        </StyledSurveyDiv>
      );
    }
    if (errors.length > 1) {
      return (
        <StyledSurveyDiv>
          <Message
            error
            header="There were some errors with your submission"
            list={errors}
          />
        </StyledSurveyDiv>
      );
    }

    return (
      <StyledSurveyDiv>
        <Header size="medium">{`ADD USERS TO ${survey.toUpperCase()} SURVEY`}</Header>
        <Search search={this.handleSearch} placeholder="find user" />
        <List animated divided verticalAlign="middle">
          {notSelectedFiltered.map(x => (
            <List.Item key={x.key + "add"}>
              <List.Content floated="right">
                <Button positive onClick={() => this.handleAdd(x.key)}>
                  Add
                </Button>
              </List.Content>
              <List.Icon name="plus" />
              <List.Content>
                <List.Header>{x.text}</List.Header>
              </List.Content>
            </List.Item>
          ))}
        </List>
        <Button onClick={this.submit} fluid primary>
          Save & Send SMS
        </Button>
        <Header size="medium">{`REMOVE USERS FROM ${survey.toUpperCase()} SURVEY`}</Header>
        <List animated verticalAlign="top" size="medium">
          {selectedFiltered.map(x => (
            <List.Item key={x.key}>
              <List.Content floated="right">
                <Button negative onClick={() => this.handleRemove(x.key)}>
                  Remove
                </Button>
              </List.Content>
              <List.Icon name="close" />
              <List.Content>
                <List.Header>{x.text}</List.Header>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </StyledSurveyDiv>
    );
  }
}

export default Selection;
