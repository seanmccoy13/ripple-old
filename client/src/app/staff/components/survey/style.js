import styled from 'styled-components'
import { NavLink } from 'react-router-dom'


export const StyledSurvey = styled.div`
  width: 100%;
  height: 100%;
  min-height: 80vh;
  color: #50a3a2;
  display: flex;
  text-align: left;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
`

export const StyledSurveyLink = styled(NavLink)`
  border: 2px solid #50a3a2;
  border-radius: 5px;
  color: #50a3a2;
  background-color: transparent;
  transition: color ease-in-out 0.5s;
  padding: 5px 10px 5px 10px;
  width: 160px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  &:hover {
    border: 2px solid darkgrey;
    color: darkgrey;
  };
`

export const StyledMenu = styled.div`
  width: 100%;
  padding: 2px;
  display: inline-flex;
  justify-content: center;
`
export const StyledMenuInner = styled.div`
  width: 400px;
`

export const StyledBreadcrumb = styled.div`
  width: 100%;
  display: inline-flex;
  padding: 5%;
  justify-content: center;
`

export const StyledSurveyLogo = styled.div`
  width: 100%;
  display: inline-flex;
  padding 2px;
  justify-content: flex-end;
`

export const StyledMT = styled.div`
  margin-top: 10px;
`

export const StyledMsg = styled.div`
color: teal;
font-size: 16px;
font-weight: 500;
width: 100%;
max-width: 400px;
padding-right: 2%;
padding-left: 2%;
margin-bottom: 20px;
justify-content: center;
align-items: center;
text-align: left;
`

export const StyledSurveyButtonDiv = styled.div`
  min-width: 320px;
  max-width: 400px;
  justify-content: center;
  align-items: center;
  text-align: center;
`

export const StyledSubmitSurvey = styled.div`
  width: 100%;
  padding: 5px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

export const StyledSubmitSurveyAction = styled.div`
  width: 100%;
  color: teal;
  text-align: center;
  font-weight: 700;
  font-size: 20px;
`
export const StyledSurveyButton = styled(NavLink)`
  border: 2px solid #50a3a2;
  border-radius: 5px;
  color: #50a3a2;
  background-color: transparent;
  transition: color ease-in-out 0.5s;
  padding: 5px 10px 5px 10px;
  width: 190px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  &:hover {
    border: 2px solid darkgrey;
    color: darkgrey;
  };
`

export const StyledRestartSurveyLink = styled(NavLink)`
  color: teal;
`