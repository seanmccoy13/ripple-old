import React, { Component, Fragment } from "react";
import { graphql } from "react-apollo";
import ListOwed from "./ListOwed";
import Search from "../../../common/search";
import { GET_EMPLOYEES } from "../../../../graphql/queries";

const query = GET_EMPLOYEES;

class OverDuePage extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { loading, data, error } = nextProps;
    if (loading || error || data.loading || data.error) {
      return null;
    }
    if (
      data.hasOwnProperty("getEmployees") &&
      !prevState.hasOwnProperty("getEmployees")
    ) {
      return { users: data.getEmployees.employees };
    }
    return null;
  }
  state = {
    searchTerm: "",
    users: []
  };

  handleSearch = (e, { value }) => {
    e.preventDefault();
    const searchTerm = value.toLowerCase();
    this.setState({ searchTerm });
  };

  render() {
    const { loading, error } = this.props.data;

    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>Error! {error.message}</p>;
    }
    const { searchTerm, users } = this.state;
    const filtered = users.filter(user =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm)
    );

    return (
      <Fragment>
        <h3>Filter Users by Name</h3>
        <Search placeholder="Filter by name" search={this.handleSearch} />
        <ListOwed list={filtered} />
      </Fragment>
    );
  }
}

export default graphql(query, {
  options: props => ({
    variables: {
      companyName: props.company.companyName
    }
  })
})(OverDuePage);
