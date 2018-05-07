import React from 'react'
import PropTypes from 'prop-types'
import DateTimePicker from '../../../common/UIComponentDecorators/dateTimePicker'
import styled from 'styled-components'
import ResumeControls from './resumeControls'
import { toDateTimePickerFormat, fromDateTimePickerFormat } from '../../../utilities/customMoment'

export default function IntervieweeSpecialFields(props) {
  const handleInterviewDateChange = (value) => {
    props.changeProperty('interviewDate', fromDateTimePickerFormat(value))
  }

  return (
    <div>
      <DateTimePicker
        label='Interview date'
        defaultValue={toDateTimePickerFormat(props.interviewee.interviewDate)}
        onChange={handleInterviewDateChange}
      />
      <InputLabel>Resume</InputLabel>
      <ResumeControls interviewee={props.interviewee} authorized/>
    </div>)
}

IntervieweeSpecialFields.propTypes = {
  interviewee: PropTypes.object.isRequired,
  changeProperty: PropTypes.func.isRequired,
}

const InputLabel = styled.p`
  margin-top: 16px;
  color: rgba(0,0,0,0.54);
  font-size: 80%;
`