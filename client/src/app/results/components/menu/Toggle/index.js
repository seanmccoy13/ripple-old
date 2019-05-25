import React from "react";
import { Radio } from "semantic-ui-react";

export default ({ children, handleToggle, id }) => (
  <Radio
    style={{ padding: 10 }}
    id={id}
    toggle
    onChange={handleToggle}
    label={{ children }}
  />
);
