import React from "react";
import ResultsLine from "./ResultsLine";
import { Header, Label } from "semantic-ui-react";
import {
  StyledLineOuterDiv,
  StyledLineInnerDiv,
  StyledLabelsDiv,
  LabelStandard,
  LabelMargin
} from "./style";
import { getMonth, getYear } from "../common";

const Linegraph = ({
  results: { results },
  user: { companyName },
  date: { start, end }
}) => {
  let data = [];
  if (results && results.length > 0) {
    data = results.filter(
      result => Number(result.date) > start && result.date < end
    );
  }
  return (
    <StyledLineOuterDiv>
      <StyledLineInnerDiv>
        <Header as="h2" icon textAlign="center" size="large" color="teal">
          LINE GRAPH OF TOTAL GROUP AVERAGE
          <Header.Subheader>
            {companyName} Capabilities {`${getMonth(start)}${getYear(start)}`}{" "}
            to {`${getMonth(end)}${getYear(end)}`}
          </Header.Subheader>
        </Header>
        <ResultsLine lineData={data} companyName={companyName} />
        <StyledLabelsDiv>
          <Label style={LabelStandard} pointing="above" color="blue">
            Communication
          </Label>
          <Label
            style={{ ...LabelStandard, ...LabelMargin }}
            pointing="above"
            color="teal"
          >
            Respect
          </Label>
          <Label
            style={{ ...LabelStandard, ...LabelMargin }}
            pointing="above"
            color="yellow"
          >
            Integrity
          </Label>
          <Label
            style={{ ...LabelStandard, ...LabelMargin }}
            pointing="above"
            color="orange"
          >
            Creativity
          </Label>
          <Label
            style={{ ...LabelStandard, ...LabelMargin }}
            pointing="above"
            color="red"
          >
            Knowledge
          </Label>
          <Label
            style={{ ...LabelStandard, ...LabelMargin }}
            pointing="above"
            color="purple"
          >
            Teamwork
          </Label>
        </StyledLabelsDiv>
      </StyledLineInnerDiv>
    </StyledLineOuterDiv>
  );
};

export default Linegraph;
