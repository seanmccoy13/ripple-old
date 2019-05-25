import React from "react";
import {
  Table,
  Progress,
  Label,
  List,
  Divider,
  Header
} from "semantic-ui-react";
import { StyledTable, StyledTableGlow } from "./style";
import "./negative.css";

const positive = num => num >= 4;

const scoreLabel = (number, name) => {
  const num = +(number - 1).toFixed(2);
  const color = positive(number) ? "green" : "red";
  return (
    <List>
      <List.Item>
        <Label circular color={color} key={color}>
          {num}
        </Label>
      </List.Item>
      <List.Item>{name}</List.Item>
    </List>
  );
};

const getPercent = num => {
  const x = num - 1;
  if (x === 0 || x === 5) return 100;
  if (x < 3) {
    const y = ((3 - x) / 3) * 100;
    return y;
  }
  if (x >= 3) {
    const z = ((x - 3) / 3) * 100;
    return z + 33.33;
  }
};

const ResultsTable = props => {
  return (
    <StyledTable>
      <Divider horizontal inverted>
        <Header as="h3" content={props.heading} />
      </Divider>
      <Divider horizontal>Values</Divider>
      <StyledTableGlow>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center" colSpan="7">
                Communication
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell textAlign="left">0</Table.HeaderCell>
              <Table.HeaderCell textAlign="left">1</Table.HeaderCell>
              <Table.HeaderCell textAlign="left">2</Table.HeaderCell>
              <Table.HeaderCell />
              <Table.HeaderCell textAlign="right">3</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">4</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">5</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell colSpan="3">
                <Progress
                  className="negativeProgress"
                  percent={
                    positive(props.mentor1) ? 100 : getPercent(props.mentor1)
                  }
                  color={!positive(props.mentor1) ? "red" : "grey"}
                  disabled={positive(props.mentor1)}
                />
              </Table.Cell>
              <Table.Cell colSpan="1" width="2" textAlign="center">
                {scoreLabel(props.mentor1, "Mentor")}
              </Table.Cell>
              <Table.Cell colSpan="3">
                <Progress
                  percent={
                    positive(props.mentor1) ? getPercent(props.mentor1) : 100
                  }
                  color={positive(props.mentor1) ? "green" : "grey"}
                  disabled={!positive(props.mentor1)}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan="3">
                <Progress
                  className="negativeProgress"
                  percent={
                    positive(props.participant1)
                      ? 100
                      : getPercent(props.participant1)
                  }
                  color={!positive(props.participant1) ? "red" : "grey"}
                  disabled={positive(props.participant1)}
                />
              </Table.Cell>
              <Table.Cell colSpan="1" width="2" textAlign="center">
                {scoreLabel(props.participant1, "Participant")}
              </Table.Cell>
              <Table.Cell colSpan="3">
                <Progress
                  percent={
                    positive(props.participant1)
                      ? getPercent(props.participant1)
                      : 100
                  }
                  color={positive(props.participant1) ? "green" : "grey"}
                  disabled={!positive(props.participant1)}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </StyledTableGlow>
      <StyledTableGlow>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center" colSpan="7">
                Respect
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell textAlign="left">0</Table.HeaderCell>
              <Table.HeaderCell textAlign="left">1</Table.HeaderCell>
              <Table.HeaderCell textAlign="left">2</Table.HeaderCell>
              <Table.HeaderCell />
              <Table.HeaderCell textAlign="right">3</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">4</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">5</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell colSpan="3">
                <Progress
                  className="negativeProgress"
                  percent={
                    positive(props.mentor2) ? 100 : getPercent(props.mentor2)
                  }
                  color={!positive(props.mentor2) ? "red" : "grey"}
                  disabled={positive(props.mentor2)}
                />
              </Table.Cell>
              <Table.Cell colSpan="1" width="2" textAlign="center">
                {scoreLabel(props.mentor2, "Mentor")}
              </Table.Cell>
              <Table.Cell colSpan="3">
                <Progress
                  percent={
                    positive(props.mentor2) ? getPercent(props.mentor2) : 100
                  }
                  color={positive(props.mentor2) ? "green" : "grey"}
                  disabled={!positive(props.mentor2)}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan="3">
                <Progress
                  className="negativeProgress"
                  percent={
                    positive(props.participant2)
                      ? 100
                      : getPercent(props.participant2)
                  }
                  color={!positive(props.participant2) ? "red" : "grey"}
                  disabled={positive(props.participant2)}
                />
              </Table.Cell>
              <Table.Cell colSpan="1" width="2" textAlign="center">
                {scoreLabel(props.participant2, "Participant")}
              </Table.Cell>
              <Table.Cell colSpan="3">
                <Progress
                  percent={
                    positive(props.participant2)
                      ? getPercent(props.participant2)
                      : 100
                  }
                  color={positive(props.participant2) ? "green" : "grey"}
                  disabled={!positive(props.participant2)}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </StyledTableGlow>
      <StyledTableGlow>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center" colSpan="7">
                Integrity
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell textAlign="left">0</Table.HeaderCell>
              <Table.HeaderCell textAlign="left">1</Table.HeaderCell>
              <Table.HeaderCell textAlign="left">2</Table.HeaderCell>
              <Table.HeaderCell />
              <Table.HeaderCell textAlign="right">3</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">4</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">5</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell colSpan="3">
                <Progress
                  className="negativeProgress"
                  percent={
                    positive(props.mentor3) ? 100 : getPercent(props.mentor3)
                  }
                  color={!positive(props.mentor3) ? "red" : "grey"}
                  disabled={positive(props.mentor3)}
                />
              </Table.Cell>
              <Table.Cell colSpan="1" width="2" textAlign="center">
                {scoreLabel(props.mentor3, "Mentor")}
              </Table.Cell>
              <Table.Cell colSpan="3">
                <Progress
                  percent={
                    positive(props.mentor3) ? getPercent(props.mentor3) : 100
                  }
                  color={positive(props.mentor3) ? "green" : "grey"}
                  disabled={!positive(props.mentor3)}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan="3">
                <Progress
                  className="negativeProgress"
                  percent={
                    positive(props.participant3)
                      ? 100
                      : getPercent(props.participant3)
                  }
                  color={!positive(props.participant3) ? "red" : "grey"}
                  disabled={positive(props.participant3)}
                />
              </Table.Cell>
              <Table.Cell colSpan="1" width="2" textAlign="center">
                {scoreLabel(props.participant3, "Participant")}
              </Table.Cell>
              <Table.Cell colSpan="3">
                <Progress
                  percent={
                    positive(props.participant3)
                      ? getPercent(props.participant3)
                      : 100
                  }
                  color={positive(props.participant3) ? "green" : "grey"}
                  disabled={!positive(props.participant3)}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </StyledTableGlow>
      <StyledTableGlow>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center" colSpan="7">
                Creativity
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell textAlign="left">0</Table.HeaderCell>
              <Table.HeaderCell textAlign="left">1</Table.HeaderCell>
              <Table.HeaderCell textAlign="left">2</Table.HeaderCell>
              <Table.HeaderCell />
              <Table.HeaderCell textAlign="right">3</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">4</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">5</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell colSpan="3">
                <Progress
                  className="negativeProgress"
                  percent={
                    positive(props.mentor4) ? 100 : getPercent(props.mentor4)
                  }
                  color={!positive(props.mentor4) ? "red" : "grey"}
                  disabled={positive(props.mentor4)}
                />
              </Table.Cell>
              <Table.Cell colSpan="1" width="2" textAlign="center">
                {scoreLabel(props.mentor4, "Mentor")}
              </Table.Cell>
              <Table.Cell colSpan="3">
                <Progress
                  percent={
                    positive(props.mentor4) ? getPercent(props.mentor4) : 100
                  }
                  color={positive(props.mentor4) ? "green" : "grey"}
                  disabled={!positive(props.mentor4)}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan="3">
                <Progress
                  className="negativeProgress"
                  percent={
                    positive(props.participant4)
                      ? 100
                      : getPercent(props.participant4)
                  }
                  color={!positive(props.participant4) ? "red" : "grey"}
                  disabled={positive(props.participant4)}
                />
              </Table.Cell>
              <Table.Cell colSpan="1" width="2" textAlign="center">
                {scoreLabel(props.participant4, "Participant")}
              </Table.Cell>
              <Table.Cell colSpan="3">
                <Progress
                  percent={
                    positive(props.participant4)
                      ? getPercent(props.participant4)
                      : 100
                  }
                  color={positive(props.participant4) ? "green" : "grey"}
                  disabled={!positive(props.participant4)}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </StyledTableGlow>
      <StyledTableGlow>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center" colSpan="7">
                Knowledge
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell textAlign="left">0</Table.HeaderCell>
              <Table.HeaderCell textAlign="left">1</Table.HeaderCell>
              <Table.HeaderCell textAlign="left">2</Table.HeaderCell>
              <Table.HeaderCell />
              <Table.HeaderCell textAlign="right">3</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">4</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">5</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell colSpan="3">
                <Progress
                  className="negativeProgress"
                  percent={
                    positive(props.mentor5) ? 100 : getPercent(props.mentor5)
                  }
                  color={!positive(props.mentor5) ? "red" : "grey"}
                  disabled={positive(props.mentor5)}
                />
              </Table.Cell>
              <Table.Cell colSpan="1" width="2" textAlign="center">
                {scoreLabel(props.mentor5, "Mentor")}
              </Table.Cell>
              <Table.Cell colSpan="3">
                <Progress
                  percent={
                    positive(props.mentor5) ? getPercent(props.mentor5) : 100
                  }
                  color={positive(props.mentor5) ? "green" : "grey"}
                  disabled={!positive(props.mentor5)}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan="3">
                <Progress
                  className="negativeProgress"
                  percent={
                    positive(props.participant5)
                      ? 100
                      : getPercent(props.participant5)
                  }
                  color={!positive(props.participant5) ? "red" : "grey"}
                  disabled={positive(props.participant5)}
                />
              </Table.Cell>
              <Table.Cell colSpan="1" width="2" textAlign="center">
                {scoreLabel(props.participant5, "Participant")}
              </Table.Cell>
              <Table.Cell colSpan="3">
                <Progress
                  percent={
                    positive(props.participant5)
                      ? getPercent(props.participant5)
                      : 100
                  }
                  color={positive(props.participant5) ? "green" : "grey"}
                  disabled={!positive(props.participant5)}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </StyledTableGlow>
      <StyledTableGlow>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center" colSpan="7">
                Teamwork
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell textAlign="left">0</Table.HeaderCell>
              <Table.HeaderCell textAlign="left">1</Table.HeaderCell>
              <Table.HeaderCell textAlign="left">2</Table.HeaderCell>
              <Table.HeaderCell />
              <Table.HeaderCell textAlign="right">3</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">4</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">5</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell colSpan="3">
                <Progress
                  className="negativeProgress"
                  percent={
                    positive(props.mentor6) ? 100 : getPercent(props.mentor6)
                  }
                  color={!positive(props.mentor6) ? "red" : "grey"}
                  disabled={positive(props.mentor6)}
                />
              </Table.Cell>
              <Table.Cell colSpan="1" width="2" textAlign="center">
                {scoreLabel(props.mentor6, "Mentor")}
              </Table.Cell>
              <Table.Cell colSpan="3">
                <Progress
                  percent={
                    positive(props.mentor6) ? getPercent(props.mentor6) : 100
                  }
                  color={positive(props.mentor6) ? "green" : "grey"}
                  disabled={!positive(props.mentor6)}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan="3">
                <Progress
                  className="negativeProgress"
                  percent={
                    positive(props.participant6)
                      ? 100
                      : getPercent(props.participant6)
                  }
                  color={!positive(props.participant6) ? "red" : "grey"}
                  disabled={positive(props.participant6)}
                />
              </Table.Cell>
              <Table.Cell colSpan="1" width="2" textAlign="center">
                {scoreLabel(props.participant6, "Participant")}
              </Table.Cell>
              <Table.Cell colSpan="3">
                <Progress
                  percent={
                    positive(props.participant6)
                      ? getPercent(props.participant6)
                      : 100
                  }
                  color={positive(props.participant6) ? "green" : "grey"}
                  disabled={!positive(props.participant6)}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </StyledTableGlow>
    </StyledTable>
  );
};
export default ResultsTable;
