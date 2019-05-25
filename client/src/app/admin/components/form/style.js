import styled, { keyframes } from 'styled-components'

export const StyledInputFeedback = styled.div`
  color: #999;
  margin-top: .25rem;
`

export const StyledLabel = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: .5rem;
`

const shake = keyframes`
  from, to {
    transform: translate3d(0, 0, 0);
  }

  10%, 30%, 50%, 70%, 90% {
    transform: translate3d(-10px, 0, 0);
  }

  20%, 40%, 60%, 80% {
    transform: translate3d(10px, 0, 0);
  }
`

export const StyledInputGroup = styled.div`
  margin-bottom: 1rem;
`

export const StyledInputGroupError = StyledInputGroup.extend`
  animation-duration: .3s;
  animation-fill-mode: both;
  animation-name: ${shake};
  color: red !important;
  label{
    color: red !important;
  }
`

export const StyledInputText = styled.input`
  padding: .5rem;
  font-size: 16px;
  width: 100%;
  display: block;
  border-radius: 4px;
  border: ${props => props.error ? '1px solid red' : '1px solid #ccc'};

  &:focus {
    border-color: #007eff;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 3px rgba(0, 126, 255, 0.1);
    outline: none;
  }
`