import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

const SearchResults = ({ select, users }) => (
  <List relaxed size="mini" key="search-results-list">
    {users.map(user => (
      <List.Item
        onClick={select}
        key={`search-results-list-${user.email}`}
        text={`${user.firstName} ${user.lastName}`}
        value={user.email}
      >
        <List.Icon
          name="user"
          size="large"
          verticalAlign="middle"
          color="teal"
        />
        <List.Content>
          <List.Header as="a" color="teal">
            {user.firstName} {user.lastName}
          </List.Header>
          <List.Description as="a">{user.email}</List.Description>
        </List.Content>
      </List.Item>
    ))}
  </List>
);

SearchResults.propTypes = {
  select: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
};

export default SearchResults;
