import styled from "styled-components";

export const StyledResultsDiv = styled.div`
  height: 100%;
  width: 100%;
  -webkit-print-color-adjust: exact;
`;
export const StyledResultsPadBottom = styled.div`
  padding-bottom: 30px;
`;

export const StyledTable = styled.div`
  width: 100%;
  -webkit-print-color-adjust: exact;
`;

export const StyledTableGlow = styled.div`
  margin-bottom: 29px;
  filter: drop-shadow(0 0 0.3rem darkgrey);
  @media print {
    filter: none;
  }
`;

export const StyledDateBar = styled.div`
  margin: 20px;
  padding: 10px;
  min-width: 400px;
  max-width: 60%;
  background-color: lightgrey;
  color: blue;
  border-radius: 10px;
`;
export const StyledFullWidthInline = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
export const StyledResultsHeader = styled.h1`
  color: black;
  font-weight: 800;
  font-size: 24px;
`;
