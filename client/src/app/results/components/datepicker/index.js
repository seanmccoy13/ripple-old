import React, { useState, useEffect } from 'react';
import { graphql } from 'react-apollo';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Button } from 'semantic-ui-react';
import { SET_DATE } from '../../../../graphql/local/mutations';
import 'react-datepicker/dist/react-datepicker.css';
import { StyledPickerDiv } from './style';

const mutation = SET_DATE;
const setDate = async (start, end, mutation) => {
  await mutation({
    variables: {
      start,
      end,
    },
  });
};

const createTime = date => new Date(date.format()).getTime();

const DateRangePicker = ({ update, mutate }) => {
  let now = new Date().getTime();
  const [start, setStart] = useState(moment().subtract(31, 'days'));
  const [end, setEnd] = useState(moment());
  const [startToggle, setStartToggle] = useState(false);
  const [endToggle, setEndToggle] = useState(false);

  useEffect(() => {
    setDate(createTime(start), createTime(end), mutate);
    return () => {
      setDate(now - 2629800000, now, mutate);
    };
  }, [start, end]);

  useEffect(() => {
    update();
  }, []);

  return (
    <StyledPickerDiv>
      <Button.Group size="large">
        <Button name="startOpen" onClick={() => setStartToggle(!startToggle)}>
          {startDate.format('DD-MM-YYYY')}
        </Button>
        <Button.Or text="to" />
        <Button name="endOpen" onClick={() => setEndToggle(!endToggle)}>
          {endDate.format('DD-MM-YYYY')}
        </Button>
      </Button.Group>
      {startOpen && (
        <DatePicker
          dateFormat="LL"
          selected={start}
          selectsStart
          withPortal
          inline
          startDate={start}
          endDate={end}
          onChange={date => setStart(date)}
        />
      )}
      {endOpen && (
        <DatePicker
          dateFormat="LL"
          selected={end}
          selectsEnd
          withPortal
          inline
          startDate={start}
          endDate={end}
          onChange={date => setEnd(date)}
        />
      )}

    </StyledPickerDiv>
  );
};

export default graphql(mutation)(DateRangePicker);
