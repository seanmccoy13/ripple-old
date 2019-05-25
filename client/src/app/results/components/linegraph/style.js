import styled from 'styled-components';

export const StyledLinegraphDiv = styled.div`
  width: 100%;
  height: 100vh;
`;

export const StyledLineInnerDiv = styled.div`
  height: 600px;
  width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  color: #50a3a2;
  filter: drop-shadow(0 0 0.3rem darkgrey);
  @media print {
    filter: none;
    -webkit-print-color-adjust: exact;
  }
  -webkit-print-color-adjust: exact;
`;
export const StyledLineOuterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 80vh;
  color: #50a3a2;
`;

export const StyledLineDiv = styled.div`
  width: 100px;
`;

export const StyledLabelsDiv = styled.div`
  padding-left: 40px;
  display: flex;
  flex-wrap: no-wrap;
  min-width: 640px;
  @media print {
    filter: none;
    -webkit-print-color-adjust: exact;
  }
`;

export const LabelStandard = {
  width: 105,
  textAlign: 'center',
  height: 30,
};
export const LabelMargin = {
  marginLeft: 4,
};
