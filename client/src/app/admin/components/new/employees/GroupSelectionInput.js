import React from "react";
import { Query } from "react-apollo";
import { Dropdown } from "semantic-ui-react";

import { GET_GROUPS_LOCAL } from "../../../../../graphql/local/queries";

const makeOptions = groupArray => {
  return groupArray.map((group, index) => ({
    key: index + group,
    text: group,
    value: group
  }));
};

const GroupSelectionInput = ({ handleChange }) => (
  <Query query={GET_GROUPS_LOCAL}>
    {({
      data: {
        company: { groups }
      }
    }) => {
      const options = groups
        ? makeOptions(groups)
        : [{ key: 0, text: "none available", value: "nothing to show" }];
      return (
        <Dropdown
          selection
          fluid
          options={options}
          placeholder="Select Group"
          onChange={handleChange}
        />
      );
    }}
  </Query>
);

export default GroupSelectionInput;
