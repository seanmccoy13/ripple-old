import React from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Search = ({ placeholder, search }) => (
  <Input
    icon="users"
    color="teal"
    iconPosition="left"
    placeholder={placeholder}
    onChange={search}
  />
);

Search.propTypes = {
  placeholder: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
};

export default Search;
