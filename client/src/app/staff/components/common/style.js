import styled from 'styled-components'
import icon from '../../../../images/ripple'

export const StyledError = styled.div.attrs({
  url: props => props.url || icon
})`
  background: #50a3a2;
  height: 100vh;
  width: 100%;
  display: flex;
  padding: 20% 5% 5% 5%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center
  background-position: center;
  background-image: ${props => `url(${props.url})`};
  background-origin: border-box;
  background-repeat: no-repeat;
  background-size: auto;
  h2{
    font-size: 34px;
    font-weight: 800;
    color: white;
  }
  h3{
    font-size: 24px;
    font-weight: 500;
    color: white;
  }
  p{
    text-align: center;
    font-size: 18px;
    color: white;
  }
`

export const Loading = styled.div`
  color: white;
  background: #50a3a2;
  min-height: 100vh;
  width: 100%;
  display: flex;
  padding: 5%;
  flex-direction: column;
  justify-content: center;
  align-items: center
`

export const Error = styled.div`
color: white;
font-size: 40px;
font-weight: 700;
background: #50a3a2;
min-height: 100vh;
width: 100%;
display: flex;
padding: 5%;
flex-direction: column;
justify-content: center;
align-items: center
`





export const START_DIV = {
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}

export const MSG_STYLE = {
  width: '100%',
  maxWidth: 400,
  paddingRight: '2%',
  paddingLeft: '2%',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'left'

}
export const WELCOME_STYLE = {
  textAlign: 'left',
  width: '100%',
  padding: '10% 15% 10% 15%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
}

export const DROPDOWN_STYLE = {
  width: '100%',
  textAlign: 'center',
  padding: '10px 0 10px 0'
}

export const SURVEY_NAV_BUTTON_STYLE = {
  marginTop: 10,
  minWidth: 320,
  maxWidth: 400,
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center'
}

export const SURVEY_BTN_STYLE = {
  minWidth: 320,
  maxWidth: 400,
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center'
}


const ACTIVE_COMMON = { background: 'white', justifyContent: 'center' }
export const ACTIVE_RED = { color: 'hsla(0, 100%, 49%, 1)', ...ACTIVE_COMMON }
export const ACTIVE_GREEN = { color: 'hsla(120, 100%, 49%, 1)', ...ACTIVE_COMMON }
export const ACTIVE_NON_COLOR = { color: 'black', ...ACTIVE_COMMON }

const NON_ACTIVE_COMMON = { justifyContent: 'center', color: 'white' }
export const NON_ACTIVE_NON_COLOR = (id) => ({ ...NON_ACTIVE_COMMON, background: `hsla(0, 0%, 0%, 0.${10 - id})` })

export const NON_ACTIVE_COLOR = (id) => {
  const background = {
    1: 'hsla(0, 100%, 49%, 1)',
    2: 'hsla(0, 100%, 49%, 0.7)',
    3: 'hsla(0, 100%, 49%, 0.5)',
    4: 'hsla(120, 100%, 49%, 0.5)',
    5: 'hsla(120, 100%, 49%, 0.7)',
    6: 'hsla(120, 100%, 49%, 1)'
  }
  return ({ ...NON_ACTIVE_COMMON, background: background[id] })
}

export const FOOTER = {
  position: 'fixed',
  zIndex: 0,
  bottom: 0,
  width: '100%',
  marginTop: 1
}

export const LINK = {
  color: 'darkgray',
}