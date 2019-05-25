import styled from 'styled-components';

export const StyledDiv = styled.div`
  height: 80vh;
  width: 100%;
  padding: 0 5% 0 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
export const StyledResultsDiv = styled.div`
  color: white;
  height: 100%;
  width: 100%;
  padding: 0 5%;
  border-radius: 10px;
`;
export const ResultsContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  border-radius: 10px;
  width: 1200px;
`;

export const StyledInline = styled.div`
  @media print {
    display: none;
  }
  display: inline-flex;
  justify-content: space-evenly;
  flex-direction: row;
  width: 100%;
`;

export const StyledResults = styled.div`
  color: white;
  height: 100%;
  width: 100%;
  padding: 0 5%;
  border-radius: 10px;
`;

export const HiddenH2 = styled.h2`
  display: none;
  @media print {
    display: flex;
    font-size: 50px;
    font-weight: 800;
    font-family: ${props => props.theme.fontFamily};
    color: grey;
  }
`;

export const HiddenImg = styled.img`
  display: none;
  @media print {
    height: 50px;
    width: auto;
    display: inline-block;
    position: absolute;
    top: 10px;
    right: 50px;
    border-radius: 5px;
    border: 2px solid grey;
    -webkit-print-color-adjust: exact;
  }
`;

export const HiddenH3 = styled.h3`
  display: none;
  @media print {
    display: flex;
    font-size: 30px;
    font-weight: 700;
    font-family: ${props => props.theme.fontFamily};
    color: black;
  }
`;

export const NoPrint = styled.div`
  display: flex;
  @media print {
    display: none;
  }
`;
