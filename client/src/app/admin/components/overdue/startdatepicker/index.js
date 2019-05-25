import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { StyledPickerDiv } from './style'
import { SET_DATE } from '../../../../../graphql/local/mutations'

import 'react-datepicker/dist/react-datepicker.css'


class StartDatePicker extends Component {
  state = {
    startDate: moment(),
    endDate: moment()
  }
  createTime = (date) => (new Date(date.format())).getTime()
  handleChange = (date, setDate) => {
    this.setState({ startDate: date })
    setDate({ variables: { start: this.createTime(date), end: this.createTime(this.state.endDate) } })
  }


  render() {
    const { startDate } = this.state
    return (
      <Mutation mutation={SET_DATE} >
        {
          setDate => {
            return (
              <StyledPickerDiv>
                <DatePicker
                  dateFormat='LL'
                  selected={startDate}
                  onChange={(date) => this.handleChange(date, setDate)}
                />
              </StyledPickerDiv>
            )
          }
        }
      </Mutation>
    )
  }
}


export default StartDatePicker