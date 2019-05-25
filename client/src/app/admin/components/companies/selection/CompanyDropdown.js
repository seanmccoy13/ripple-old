import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

export default class CompanyDropdown extends Component {
  state = { companies: [], companyName: 'Select Company' };
  componentDidMount() {
    const companies = this.props.data.map(x => ({
      key: x.companyName,
      value: x.companyName,
      text: x.companyName,
    }));
    this.setState({ companies });
  }
  handleChange = (e, { value }) => {
    this.setState({ companyName: value });
    setTimeout(() => this.props.update({ companyName: value }), 200);
  };
  render() {
    return (
      <Dropdown
        closeOnChange
        value={this.state.companyName}
        placeholder={this.state.companyName}
        size="large"
        selection
        openOnFocus
        options={this.state.companies}
        onChange={this.handleChange}
      />
    );
  }
}
