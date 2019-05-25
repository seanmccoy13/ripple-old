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
    color: red;
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