import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

const StyledLink = styled(Link)`
  color: black;
  width: 100%;
  &:hover {
    color: darkred;
  }
`
const ButtonWithDisable = ({ disabled, text, pathname }) => {
  return (
    <StyledLink to={pathname} >
      <Button
        type='submit'
        disabled={disabled}
        onClick={this.accept}
        fluid
        inverted
        size="massive"
      >{text}</Button></StyledLink>
  )
}

export default ButtonWithDisable
