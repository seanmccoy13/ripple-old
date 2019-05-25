import styled from 'styled-components';
import icon from '../../../images/ripple';

export const StyledHome = styled.div.attrs({
  url: props => props.url || icon,
})`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: white;
  min-height: 100vh;
  width: 100%;
  background-image: ${props => `url(${props.url})`};
  background-repeat: no-repeat;
  background-size: cover;
`;

export const StyledAdminStage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100%;
  min-height: 50vh;
  padding: 40px;
  margin: 40px;
  background-color: white;
  border-radius 10px;
  color: #50a3a2;
`;

export const StyledSurveyStage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  width: 80%;
  min-height: 80vh;
  margin: 40px;
  background-color: white;
  border-radius 10px;
  color: #50a3a2;
`;

export const StyledSurveyDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  min-height: 70vh;
  width: 100%;
  padding-top: 40px;
`;

export const StyledPagesInputDiv = styled.div`
  padding-top: 20px;
`;

export const StyledPagesNav = styled.div`
  @media print {
    display: none;
  }
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  width: 100%;
  height: 45px;
`;
export const StyledLoading = styled.div`
  color: white;
  background: #50a3a2;
  min-height: 100vh;
  width: 100%;
  display: flex;
  padding: 5%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledError = styled.div`
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
  align-items: center;
`;

export const StyledInputMultiple = styled.div`
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  width: 360px;
`;

export const StyledPadTop = styled.div.attrs({
  pt: props => props.pt || 40,
})`
  padding-top: ${props => props.pt}px;
`;
