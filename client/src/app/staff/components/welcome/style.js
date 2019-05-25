import styled from 'styled-components'
export const StyledWelcome = styled.div.attrs({
  bg: props => props.url
})`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-position: bottom;
  background-image: url(${props => props.bg});
  background-origin: border-box;
  background-repeat: no-repeat;
  background-size: auto;
  background-attachment: fixed;
`

export const StyledHeader = styled.div`
  padding-bottom: 60px;
`
export const StyledH1 = styled.h1`
  color: white;
  font-size: 28px;
`

export const StyledWelcomeButtonDiv = styled.div`
  width: 400px;
  margin-bottom: 90px;
`
export const StyledWelcomeFooter = styled.div`
  width: 100%;
  bottom: 0;
  z-index:0;
`

export const StyledWelcomeModel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  z-index: 5000;
`

export const StyledInlineDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 5px;
`
