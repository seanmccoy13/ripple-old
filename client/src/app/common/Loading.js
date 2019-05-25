import React from 'react';
import { Icon, Message } from 'semantic-ui-react';
import { StyledLoadingStageDiv } from './style';

const Loading = ({
  message = {
    header: 'Just one second',
    content: 'We are fetching that content for you.',
  },
}) => {
  return (
    <StyledLoadingStageDiv>
      <Message icon>
        <Icon name="circle notched" loading size="massive" color="teal" />
        <Message.Content>
          <Message.Header>{message.header}</Message.Header>
          {message.content}
        </Message.Content>
      </Message>
    </StyledLoadingStageDiv>
  );
};

export default Loading;
