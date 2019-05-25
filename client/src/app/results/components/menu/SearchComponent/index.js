import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Search from '../../../../common/search';
import SearchResults from './SearchResults';

export default class SearchComponent extends Component {
  static propTypes = {
    select: PropTypes.func.isRequired,
    users: PropTypes.array,
  };
  static defaultProps = {
    users: [],
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.users.length !== prevState.users.length) {
      const users = nextProps.users
        ? nextProps.users.filter(user => user.surveyName === 'participant')
        : [];
      return { users };
    }
  }
  state = {
    searchResults: [],
    users: [],
  };

  onSearch = (e, { value }) => {
    if (!value) {
      return this.setState({
        searchResults: [],
      });
    }
    if (value.length < 2) {
      return;
    }
    const searchResults = this.state.users.filter(user =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(value)
    );
    this.setState({ searchResults });
  };

  render() {
    return (
      <React.Fragment>
        <Search search={this.onSearch} placeholder="Search for User" />
        {this.state.searchResults.length > 0 && (
          <SearchResults
            key="search-results"
            select={this.props.select}
            users={this.state.searchResults}
          />
        )}
      </React.Fragment>
    );
  }
}
