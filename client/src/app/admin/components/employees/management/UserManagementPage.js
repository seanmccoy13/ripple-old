import React from "react";
import { Query } from "react-apollo";
import { GET_EMPLOYEES } from "../../../../../graphql/queries";
import ManageUsers from "./ManageUsers";

export default ({ company: { companyName } }) => {
  return (
    <Query
      query={GET_EMPLOYEES}
      variables={{ companyName }}
      pollInterval={1000}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <p>Loading...</p>;
        }
        if (error) {
          return <p>Error! {error.message}</p>;
        }
        const { employees } = data.getEmployees;
        if (employees) {
          return <ManageUsers employees={employees} />;
        } else {
          return <h3>No Employees Available</h3>;
        }
      }}
    </Query>
  );
};
