import React from "react";
import PropTypes from "prop-types";
import { List } from "semantic-ui-react";

import ListUser from "./ListUser";
import Search from "../../../../common/search";
import {
  ManageUsersContainer,
  ManageUsersTitle,
  ManageUsersSearch,
  ManageUsersSearchResults
} from "../style";

class ManageUsers extends React.Component {
  state = {
    employees: {},
    names: [],
    filterTerm: ""
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.employees &&
      nextProps.employees.length !== prevState.employees.length
    ) {
      const names = [];
      const employees = nextProps.employees.reduce((obj, user, i) => {
        names.push(`${user.firstName} ${user.lastName}`.toLowerCase());
        obj[`${user.firstName} ${user.lastName}`.toLowerCase()] = (
          <ListUser user={user} key={i + user.email} />
        );
        return obj;
      }, {});

      return { employees, names };
    }
    return null;
  }
  onSearch = e => {
    this.setState({ filterTerm: e.target.value });
  };
  render() {
    const { employees, names, filterTerm } = this.state;
    const users = names.filter(name => name.includes(filterTerm.toLowerCase()));
    return names.length > 0 ? (
      <ManageUsersContainer>
        <ManageUsersTitle>Manage User</ManageUsersTitle>
        <ManageUsersSearch>
          <Search search={this.onSearch} placeholder="Search users..." />
        </ManageUsersSearch>
        <ManageUsersSearchResults>
          <List animated verticalAlign="top" size="medium" horizontal>
            {users.map(user => employees[user])}
          </List>
        </ManageUsersSearchResults>
      </ManageUsersContainer>
    ) : (
      <h3>No Employees Available</h3>
    );
  }
}

ManageUsers.propTypes = {
  employees: PropTypes.array
};

export default ManageUsers;
