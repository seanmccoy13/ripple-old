import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'

export const StyledLink = styled(NavLink)`
  border: 1px solid #50a3a2;
  color: #50a3a2;
  background-color: white;
  transition: background-color 0.25s;
  padding: 10px;
  max-width: 100%;
  min-width: 300px;
  margin: 10%;
  border-radius: 5px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  &:hover {
    transition: background-color 0.25s;
    border: 1px solid white;
    color: white;
    background-color: #50a3a2;
  };
`
export const StyledListLink = styled(NavLink)`
  border: 1px solid #50a3a2;
  color: #50a3a2;
  background-color: white;
  width: 100%;
  padding: 5px 10px;
  margin: 10px;
  border-radius: 5px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`

export const MsgStyle = styled.div`
  color: teal;
  max-width: 400px;
  padding-top: 50px;
  padding-right: 2%;
  padding-left: 2%;
  text-align: left;
`

export const StyledDropdown = styled.div`
  width: 100%;
  text-align: center;
  textAlign: center;
  padding: 10px 0 10px 0;
`

export const StyledSurveyNavButton = css`
  margin-top: 10px;
  min-width: 320px;
  max-width: 400px;
  justify-content: center;
  align-items: center;
  text-align: center;
`

export const StyledWelcome = styled.div`
text-align: left;
width: 100%;
min-height: 80vh;
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
`
export const StyledIntro = styled.div`
text-align: left;
width: 100%;
height: 100%;
min-height: 80vh;
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
`
export const StyledCapital = styled.div`
  text-transform: capitalize;
`