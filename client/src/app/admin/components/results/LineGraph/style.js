import styled from 'styled-components';

export const StyledLinegraphDiv = styled.div`
  width: 100%;
  height: 100vh;
`;

export const StyledLineInnerDiv = styled.div`
  height: 610px;
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
  align-content: flex-center;
  align-items: center;
  width: 100%;
  height: 80vh;
  color: #50a3a2;
`;

export const StyledLineDiv = styled.div`
  width: 100px;
  height: 400px;
  @media print {
    -webkit-print-color-adjust: exact;
  }
`;

export const StyledLabelsDiv = styled.div`
  padding-left: 40px;
  display: flex;
  flex-wrap: no-wrap;
  min-width: 640px;
  @media print {
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
