import styled from 'styled-components'
export const NEWCOMPANY = {
  color: 'black',
  minHeight: '70vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}

export const NEWCOMPANYNAV = {
  color: 'black',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center'
}

export const StyledNewCompanyStage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  min-height: 80vh;
  padding: 40px;
  background-color: white;
  border-radius 10px;
  color: #50a3a2;
  `

export const StyledInlineInput = styled.div`
  display: inline-flex;
  flex-wrap: no-wrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 5px;
  `