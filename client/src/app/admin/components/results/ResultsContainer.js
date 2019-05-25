import React from 'react';
import { StyledResultsDiv, StyledFullWidthInline } from './style';
import ResultsLogic from './ResultsLogic';

const ResultsContainer = ({ results, username, date: { start, end } }) => {
  return (
    <StyledResultsDiv>
      <StyledFullWidthInline />
      <ResultsLogic
        filtered={results}
        start={start}
        end={end}
        username={username}
      />
    </StyledResultsDiv>
  );
};

export default ResultsContainer;
