import React from 'react'

import { Dropdown } from 'semantic-ui-react'

const makeOptions = groupArray => {
  return groupArray.map((group, index) => ({ key: index + group, text: group, value: group }))
}

const GroupSelection = ({ groups, chooseGroup, placeholder, disabled }) => {
  const options = groups ? makeOptions(groups) : [{ key: 0, text: 'none available', value: 'mothing to show' }]
  return (
    <Dropdown
      selection
      fluid
      options={options}
      placeholder={placeholder}
      disabled={disabled}
      onChange={chooseGroup}
    />
  )
}

export default GroupSelection
