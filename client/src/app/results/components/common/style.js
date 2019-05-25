import styled from 'styled-components';

export const StyledContainerDiv = styled.div`
  color: white;
  height: 100%;
  width: 100%;
  padding: 0 5% 0 5%;
  borderradius: 10px;
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
