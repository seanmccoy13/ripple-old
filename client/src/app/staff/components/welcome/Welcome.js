import React from 'react';
import { Header, Image } from 'semantic-ui-react';
import StartSurveyButton from './StartSurveyButton';
import styled from 'styled-components';
import { StyledHeader, StyledH1, StyledInlineDiv } from './style';
import * as images from '../../../../images';

const Welcome = ({
  email,
  companyName,
  firstName,
  lastName,
  firstTime,
  survey,
  userDetails,
  mobileId,
}) => {
  if (!companyName) {
    return null;
  }
  // const name = [...companyName]
  //   .map(char => {
  //     if (char === ' ') {
  //       return '';
  //     }
  //     return char.toLowerCase();
  //   })
  //   .join('');
  const name = companyName
    .trim()
    .split(' ')
    .join('')
    .toLowerCase();

  let footer = '';
  if (images[name]) {
    footer = images[name].footer;
  }
  const icon = images.ripple.logo;

  const logo = images[name] ? images[name].logo : icon;

  const StyledWelcome = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-position: bottom;
    background-image: url(${footer});
    background-origin: border-box;
    background-repeat: no-repeat;
    background-size: 100%;
    background-attachment: fixed;
  `;
  return (
    <StyledWelcome bg={footer}>
      <StyledHeader>
        <StyledInlineDiv>
          <Image src={icon} avatar />
          <StyledH1>Welcome to Ripple</StyledH1>
        </StyledInlineDiv>
        <Header as="h2" textAlign="center" inverted>
          <Header.Content>
            {firstName} {lastName}
          </Header.Content>
        </Header>
      </StyledHeader>
      <Image src={logo} size="medium" />
      <StartSurveyButton
        firstTime={firstTime}
        email={email}
        survey={survey}
        userDetails={userDetails}
        mobileId={mobileId}
      />
    </StyledWelcome>
  );
};

export default Welcome;
