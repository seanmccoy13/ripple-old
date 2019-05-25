import styled from "styled-components";

export const StyledMenuOuterDiv = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 5% 0 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media print {
    justify-content: flex-start;
  }
`;

export const StyledMenuInnerDiv = styled.div`
  padding-top: 20px;
  width: 100%;
  min-width: 400px;
  max-width: 1200px;
  @media print {
    display: none;
  }
`;

export const NoPrint = styled.div`
  display: flex;
  @media print {
    display: none;
  }
`;
