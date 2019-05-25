import React from "react";
import { List } from "semantic-ui-react";

const DisplayErrors = ({ errors }) => (
  <List key="display-errors">
    {errors.map(err => (
      <List.Item key={err.message}>{err.message}</List.Item>
    ))}
  </List>
);

export default DisplayErrors;
