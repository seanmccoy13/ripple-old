// @flow
import * as React from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import { SET_DATE } from '../../../../graphql/local/mutations';
import MonthPicker from './MonthPicker';

const mutation = SET_DATE;

const StyledPickerDiv = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 11px;
  font-stretch: 100%;
  font-style: normal;
  font-variant-caps: normal;
  font-variant-east-asian: normal;
  font-variant-ligatures: normal;
  font-variant-numeric: normal;
  font-weight: 600;
  @media print {
    display: none;
  }
`;
const setDate = async (start, end, mutation) => {
  await mutation({
    variables: {
      start,
      end,
    },
  });
};

const DatePicker = ({ mutate, update }): React.node => {
  let now = new Date().getTime();
  const [start, setStart] = React.useState(now - 2629800000);
  const [end, setEnd] = React.useState(now);
  React.useEffect(() => {
    update();
  }, []);
  React.useEffect(() => {
    setDate(start, end, mutate);
    return () => {
      setDate(now - 2629800000, now, mutate);
    };
  }, [start, end]);
  const makeStartDate = ({ year, month }) =>
    setStart(new Date(year, month, 1).getTime());
  const makeEndDate = ({ year, month }) =>
    setEnd(new Date(year, month + 1, 0).getTime());
  return (
    <StyledPickerDiv>
      <MonthPicker color="white" handleDateChange={makeStartDate} />
      {'  '}- to -{'  '}
      <MonthPicker color="white" handleDateChange={makeEndDate} />
    </StyledPickerDiv>
  );
};
DatePicker.defaultProps = {
  update: () => {
    console.log('ripple contagious attitudes');
  },
};

export default graphql(mutation)(DatePicker);
