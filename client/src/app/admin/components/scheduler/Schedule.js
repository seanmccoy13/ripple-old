import React, { Component } from 'react';
import { Form, Radio } from 'semantic-ui-react';

export default class Schedule extends Component {
  state = {
    value: 'monthly',
  };
  handleChange = async (e, { value }) => {
    await setTimeout(() => this.setState({ value }), 0);
    await this.props.update({
      variables: { companyName: this.props.companyName, schedule: value },
    });
  };

  render() {
    const { value } = this.state;
    return (
      <Form>
        <Form.Group inline>
          <Form.Field>
            <h3>
              Frequency: <b>{value}</b>
            </h3>
          </Form.Field>
          <Form.Field>
            <Radio
              label="Monthly"
              name="radioGroup"
              value={'monthly'}
              checked={value === 'monthly'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Weekly"
              name="radioGroup"
              value={'weekly'}
              checked={value === 'weekly'}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form.Group>
      </Form>
    );
  }
}
