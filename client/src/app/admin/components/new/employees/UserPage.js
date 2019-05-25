import React from "react";
import { Query } from "react-apollo";
import { GET_USER_LOCAL } from "../../../../../graphql/local/queries";
import UserInput from "./UserInput";
export default ({ company: { companyName } }) => (
  <Query query={GET_USER_LOCAL}>
    {({ data: { user } }) => (
      <UserInput data={user} companyName={companyName} />
    )}
  </Query>
);
