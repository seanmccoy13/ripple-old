import React, { Component, Fragment } from "react";
import { graphql } from "react-apollo";
import { Form, Button, Icon, Message } from "semantic-ui-react";
import { StyledSurveyDiv } from "../style";
import { EDIT_SURVEY } from "../../../../graphql/mutations";
const mutation = EDIT_SURVEY;

class SurveyInput extends Component {
  state = {
    message: "",
    directionStandard: true,
    color: "",
    surveyName: "",
    companyName: this.props.companyName,
    subHeadingP1: "",
    subHeadingP2: "",
    subHeadingP3: "",
    subHeadingP4: "",
    subHeadingP5: "",
    subHeadingP6: "",
    introPage1: "",
    introPage2: "",
    startP1: "",
    startP2: "",
    startP3: "",
    startP4: "",
    startP5: "",
    startP6: "",
    endP1: "",
    endP2: "",
    endP3: "",
    endP4: "",
    endP5: "",
    endP6: "",
    loading: false
  };
  componentDidMount = () => {
    this.setState({
      directionStandard: true,
      color: this.props.data.color,
      surveyName: this.props.data.surveyName,
      companyName: this.props.companyName,
      subHeadingP1: this.props.data.subHeading.p1,
      subHeadingP2: this.props.data.subHeading.p2,
      subHeadingP3: this.props.data.subHeading.p3,
      subHeadingP4: this.props.data.subHeading.p4,
      subHeadingP5: this.props.data.subHeading.p5,
      subHeadingP6: this.props.data.subHeading.p6,
      introPage1: this.props.data.introPage1,
      introPage2: this.props.data.introPage2,
      startP1: this.props.data.start.p1,
      startP2: this.props.data.start.p2,
      startP3: this.props.data.start.p3,
      startP4: this.props.data.start.p4,
      startP5: this.props.data.start.p5,
      startP6: this.props.data.start.p6,
      endP1: this.props.data.end.p1,
      endP2: this.props.data.end.p2,
      endP3: this.props.data.end.p3,
      endP4: this.props.data.end.p4,
      endP5: this.props.data.end.p5,
      endP6: this.props.data.end.p5
    });
  };

  handleChange = e => {
    e.preventDefault();
    if (e.target.id) {
      const { id, value } = e.target;
      this.setState({ [id]: value });
    }
  };
  handleRadio = e => {
    this.setState({ color: e.target.id === "color" });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    try {
      const { message } = await this.props.mutate({
        variables: {
          color: this.state.color,
          surveyName: this.state.surveyName,
          companyName: this.props.companyName,
          introPage1: this.state.introPage1,
          introPage2: this.state.introPage2,
          subHeading: {
            p1: this.state.subHeadingP1,
            p2: this.state.subHeadingP2,
            p3: this.state.subHeadingP3,
            p4: this.state.subHeadingP4,
            p5: this.state.subHeadingP5,
            p6: this.state.subHeadingP6
          },
          start: {
            p1: this.state.startP1,
            p2: this.state.startP2,
            p3: this.state.startP3,
            p4: this.state.startP4,
            p5: this.state.startP5,
            p6: this.state.startP6
          },
          end: {
            p1: this.state.endP1,
            p2: this.state.endP2,
            p3: this.state.endP3,
            p4: this.state.endP4,
            p5: this.state.endP5,
            p6: this.state.endP6
          }
        }
      });
      this.setState({ message, loading: false });
    } catch (error) {
      this.setState({ message: error, loading: false });
    }

    try {
      await this.props.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      message,
      surveyName,
      introPage1,
      introPage2,
      color,
      loading
    } = this.state;
    const { handleChange, handleRadio, handleSubmit } = this;
    return (
      <StyledSurveyDiv>
        <Form size="big" onSubmit={handleSubmit}>
          <Form.Group widths="equal">
            <Form.Field
              id="title"
              label="Title"
              value={surveyName}
              type="text"
              control="input"
              disabled
            />
            <Form.Field
              id="introPage1"
              label="Text intro page 1"
              type="textarea"
              control="textarea"
              value={introPage1}
              required
              onChange={handleChange}
            />
            <Form.Field
              id="introPage2"
              label="Text intro page 2"
              type="textarea"
              control="textarea"
              value={introPage2}
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <label>Color</label>
            <Form.Radio
              id="color"
              control="input"
              type="radio"
              label="Color"
              checked={color}
              onChange={handleRadio}
            />
            <Form.Radio
              id="grey"
              control="input"
              type="radio"
              label="Greyscale"
              checked={!color}
              onChange={handleRadio}
            />
          </Form.Group>
          {[1, 2, 3, 4, 5, 6].map(n => (
            <Fragment key={n}>
              <Form.TextArea
                id={`subHeadingP${n}`}
                label={`Heading Page ${n}`}
                type="textarea"
                control="textarea"
                value={this.state[`subHeadingP${n}`]}
                required
                onChange={handleChange}
              />
              <Form.Group inline>
                <Form.Input
                  id={`startP${n}`}
                  label={`Start of options page ${n}`}
                  type="text"
                  value={this.state[`startP${n}`]}
                  required
                  onChange={handleChange}
                />
                <Form.Input
                  id={`endP${n}`}
                  label={`End of options page ${n}`}
                  type="text"
                  value={this.state[`endP${n}`]}
                  required
                  onChange={handleChange}
                />
              </Form.Group>
            </Fragment>
          ))}
        </Form>
        {message && (
          <Message>
            <Message.List>
              <Message.Item key={message}>{message}</Message.Item>
            </Message.List>
          </Message>
        )}
        <Button
          primary
          type="submit"
          floated="right"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading && <Icon loading name="spinner" />}Commit Changes
        </Button>
      </StyledSurveyDiv>
    );
  }
}

export default graphql(mutation)(SurveyInput);
