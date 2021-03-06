import React from 'react'
import PropTypes from 'prop-types'
import DeleteCandidateDialog from './deleteCandidateDialog'
import Spinner from '../../../commonComponents/UIComponentDecorators/spinner'
import styled from 'styled-components'

export default function DeleteCandidateControl(props) {
  if (props.candidateId === props.candidateIdOnDeleting) {
    return (
      <SpinnerWrapper>
        <Spinner size={26} />
      </SpinnerWrapper>
    )
  }

  return (
    <DeleteCandidateDialog
      candidateId={props.candidateId}
      disabled={props.disabled}
    />
  )
}

DeleteCandidateControl.propTypes = {
  candidateId: PropTypes.string.isRequired,
  candidateIdOnDeleting: PropTypes.string,
  disabled: PropTypes.bool
}

const SpinnerWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  padding-left: 7px;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
`