// @flow strict

import * as React from 'react';
import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button';
import styled from 'styled-components';
import '@reach/menu-button/styles.css';

const Dropdownbutton = styled(MenuButton)`
  align-items: center;
  background-attachment: scroll;
  background: ${props => props.bgcolor};
  border: none;
  box-sizing: border-box;
  color: ${props => props.color};
  cursor: pointer;
  display: inline-flex;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 11px;
  font-stretch: 100%;
  font-style: normal;
  font-variant-caps: normal;
  font-variant-east-asian: normal;
  font-variant-ligatures: normal;
  font-variant-numeric: normal;
  font-weight: 600;
  height: 38px;
  justify-content: center;
  letter-spacing: 1px;
  line-height: 38px;
  text-align: center;
  text-decoration-color: ${props => props.color};
  text-decoration-line: none;
  text-decoration-style: solid;
  text-indent: 0px;
  text-rendering: auto;
  text-shadow: none;
  text-size-adjust: 100%;
  text-transform: uppercase;
  top: -1px;
  white-space: nowrap;
  width: 90px;
  word-spacing: 0px;
  writing-mode: horizontal-tb;
  -webkit-appearance: none;
  -webkit-border-image: none;
  :hover {
    background-color: ${props => props.color};
    color: ${props => props.bgcolor};
  }
`;

let DropdownList = styled(MenuList)`
  border: solid 2px black;
  background: ${props => props.color};
  color: ${props => props.bgcolor};
  > [data-reach-menu-item][data-selected] {
    background: ${props => props.bgcolor};
    color: ${props => props.color};
  }
`;

type DropdownType = {
  bgcolor?: string,
  color?: string,
  initialValue: number,
  options: Array<{ value: number, label: string }>,
  defaultDisplayText?: string,
  handleSelect: number => void,
};

const Dropdown = ({
  bgcolor,
  color,
  initialValue,
  options,
  defaultDisplayText,
  handleSelect,
}: DropdownType): React.Node => {
  const [state, setState] = React.useState({
    value: initialValue,
    label: defaultDisplayText,
  });
  React.useEffect(() => {
    handleSelect(state.value);
  }, [state.value]);
  return (
    <Menu>
      <Dropdownbutton color={color} bgcolor={bgcolor}>
        {state.label}
      </Dropdownbutton>
      <DropdownList className="slide-down" color={color} bgcolor={bgcolor}>
        {options.map(({ value, label }) => (
          <MenuItem key={value} onSelect={() => setState({ value, label })}>
            {label}
          </MenuItem>
        ))}
      </DropdownList>
    </Menu>
  );
};

Dropdown.defaultProps = {
  bgcolor: '#50a3a2',
  color: 'rgb(51, 51, 51)',
  defaultDisplayText: 'Select',
};

export default Dropdown;
