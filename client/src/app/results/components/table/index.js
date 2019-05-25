import React from "react";
import { Query } from "react-apollo";
import { Segment } from "semantic-ui-react";
import { StyledContainerDiv } from "../common/style";
import ResultsLogic from "./ResultsLogic";
import { StyledResultsDiv, StyledFullWidthInline } from "./style";
import { GET_FILTERED_RESULTS } from "../../../../graphql/local/queries";

const Results = ({ date: { start, end } }) => {
  return (
    <Query query={GET_FILTERED_RESULTS}>
      {({
        data: {
          filtered: { results, username }
        }
      }) => {
        return (
          <StyledResultsDiv>
            <Segment basic>
              <StyledContainerDiv>
                <StyledFullWidthInline />
                <ResultsLogic
                  filtered={results}
                  start={start}
                  end={end}
                  username={username}
                />
              </StyledContainerDiv>
            </Segment>
          </StyledResultsDiv>
        );
      }}
    </Query>
  );
};

export default Results;
