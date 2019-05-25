// @flow strict

import * as React from 'react';
import Dropdown from '../Dropdown';
import styled from 'styled-components';

const MonthPickerSpan = styled.span`
  display: inline-flex;
  border: 2px solid ${props => props.color};
  border-radius: 5px;
`;

type MonthPickerType = {
  color?: string,
  handleDateChange: ({ month: number, year: number }) => void,
};
const months = [
  { value: 0, label: 'January' },
  { value: 1, label: 'February' },
  { value: 2, label: 'March' },
  { value: 3, label: 'April' },
  { value: 4, label: 'May' },
  { value: 5, label: 'June' },
  { value: 6, label: 'July' },
  { value: 7, label: 'August' },
  { value: 8, label: 'September' },
  { value: 9, label: 'October' },
  { value: 10, label: 'November' },
  { value: 11, label: 'December' },
];

const years = [
  { value: 2017, label: '2017' },
  { value: 2018, label: '2018' },
  { value: 2019, label: '2019' },
  { value: 2020, label: '2020' },
  { value: 2021, label: '2021' },
  { value: 2022, label: '2022' },
  { value: 2023, label: '2023' },
  { value: 2024, label: '2024' },
  { value: 2025, label: '2025' },
  { value: 2026, label: '2026' },
  { value: 2027, label: '2027' },
  { value: 2028, label: '2028' },
];
const MonthPicker = ({
  color,
  handleDateChange,
}: MonthPickerType): React.Node => {
  const [month, setMonth] = React.useState(new Date().getMonth());
  const [year, setYear] = React.useState(new Date().getFullYear());
  React.useEffect(() => {
    handleDateChange({ month, year });
    return () => {
      const date = new Date();
      handleDateChange({ month: date.getMonth(), year: date.getFullYear() });
    };
  }, [month, year]);
  return (
    <MonthPickerSpan color={color}>
      <Dropdown
        initialValue={month}
        handleSelect={setMonth}
        defaultDisplayText="month"
        options={months}
        color={color}
      />
      <Dropdown
        initialValue={year}
        handleSelect={setYear}
        defaultDisplayText="year"
        options={years}
        color={color}
      />
    </MonthPickerSpan>
  );
};

MonthPicker.defaultProps = {
  color: 'rgb(51, 51, 51)',
};

export default MonthPicker;
