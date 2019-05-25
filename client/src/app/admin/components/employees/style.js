import styled from "styled-components";
import icon from "../../../../images/ripple";

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
`;

export const ManageUsersContainer = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 100px auto 100px;
  grid-template-rows: 80px 80px auto;
  grid-gap: 15px 10px;
  min-height: 80vh;
  min-width: 80vw;
  height: 100%;
  width: 100%;
`;

export const ManageUsersTitle = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  place-self: center stretch;
  justify-self: center;
  align-self: center;
`;

export const ManageUsersSearch = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  place-self: center stretch;
  justify-self: center;
  align-self: center;
`;

export const ManageUsersSearchResults = styled.div`
  grid-area: 3 / 2 / 4 / 3;
  place-self: center stretch;
  justify-self: center;
  align-self: center;
`;
