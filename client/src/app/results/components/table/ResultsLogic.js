import React from "react";
import ResultsTable from "./ResultsTable";
import { getMonth } from "../common";
import { StyledResultsPadBottom } from "./style";

const ResultsLogic = ({ start, end, filtered, username }) => {
  const filteredByDate = filtered.filter(
    result => Number(result.date) > start && Number(result.date) < end
  );

  const sorted = filteredByDate.reduce(
    (obj, res) => {
      if (res.surveyName !== "participant" && res.surveyName !== "management") {
        return obj;
      }
      res.surveyName === "management"
        ? (obj.mentors = [...obj.mentors, res])
        : (obj.participants = [...obj.participants, res]);
      return obj;
    },
    { mentors: [], participants: [] }
  );

  const Mentor = num => {
    if (!sorted.mentors) {
      return 1;
    }
    if (sorted.mentors.length < 1) {
      return 1;
    }
    return (
      sorted.mentors.reduce(
        (sum, result) => (sum += result[`p${num}`] - 1),
        0
      ) /
        sorted.mentors.length +
      1
    );
  };
  const Participant = num => {
    if (!sorted.participants) {
      return 1;
    }
    if (sorted.participants.length < 1) {
      return 1;
    }
    return (
      sorted.participants.reduce(
        (sum, result) => (sum += result[`p${num}`] - 1),
        0
      ) /
        sorted.participants.length +
      1
    );
  };

  return (
    <StyledResultsPadBottom>
      <ResultsTable
        heading={
          getMonth(end) !== getMonth(start)
            ? `DASHBOARD – ${getMonth(start)} to ${getMonth(
                end
              )} for ${username.toUpperCase()}`
            : `DASHBOARD – ${getMonth(start) ||
                "SELECT DATE"} - for - ${username || "PARTICIPANT"}`
        }
        mentor1={Mentor(1)}
        mentor2={Mentor(2)}
        mentor3={Mentor(3)}
        mentor4={Mentor(4)}
        mentor5={Mentor(5)}
        mentor6={Mentor(6)}
        participant1={Participant(1)}
        participant2={Participant(2)}
        participant3={Participant(3)}
        participant4={Participant(4)}
        participant5={Participant(5)}
        participant6={Participant(6)}
      />
    </StyledResultsPadBottom>
  );
};

export default ResultsLogic;
