import React from 'react';
import TextInput from '../materialUIDecorators/textInput';
import SelectMenu from '../materialUIDecorators/selectMenu';
import EditCommentForm from './editCommentForm';
import EditIcon from 'material-ui-icons/ViewList';
import DialogWindow from '../materialUIDecorators/dialogWindow';

export default class EditCandidateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({candidateType: props.tempCandidate.status});
    this.changeInfo = this.changeInfo.bind(this);
    this.changeCandidateType = this.changeCandidateType.bind(this);
  }

  render() {
    const changeInfo = this.changeInfo;
    const changeCandidateType = this.changeCandidateType;
    let specialFields;
    switch (this.state.candidateType) {
      case 'Interviewee':
        specialFields = <div>
          <TextInput
            name="interviewDate"
            label="Interview date"
            value={this.props.tempCandidate.interviewDate}
            placeholder="dd.mm.yyyy hh:mm"
            onChange={function(value) {changeInfo('interviewDate', value)}}/>
          <TextInput
            name="interviewRoom"
            label="Interview room"
            value={this.props.tempCandidate.interviewRoom}
            placeholder="interview placement"
            onChange={function(value) {changeInfo('interviewRoom', value)}}/>
        </div>;
        break;

      case 'Student':
        specialFields = <div>
          <TextInput
            name="groupName"
            label="Group name"
            value={this.props.tempCandidate.groupName}
            onChange={function(value) {changeInfo('groupName', value)}}/>
        </div>;
        break;

      case 'Trainee':
        specialFields = <div>
          <TextInput
            name="mentor"
            label="Mentor's name"
            value={this.props.tempCandidate.mentor}
            onChange={function(value) {changeInfo('mentor', value)}}/>
        </div>;
        break;
    }

    return (
      <div className="candidate-edit-form">
        <SelectMenu
          label="Candidate's status"
          options={['Interviewee', 'Student', 'Trainee']}
          selectedOption={this.state.candidateType}
          onChange={function(status) { changeCandidateType(status)}}
        />
        <TextInput
          name="name"
          label="Name"
          value={this.props.tempCandidate.name}
          onChange={function(value) {changeInfo('name', value)}}/>
        <TextInput
          name="birthDate"
          label="Birth date"
          value={this.props.tempCandidate.birthDate}
          placeholder="dd.mm.yyyy"
          onChange={function(value) {changeInfo('birthDate', value)}}/>
        <TextInput
          name="email"
          label="E-mail"
          value={this.props.tempCandidate.email}
          placeholder="example@mail.com"
          onChange={function(value) {changeInfo('email', value)}}/>

        {specialFields}

        <div className="float-right">
          {this.props.tempCandidate.comments ? this.props.tempCandidate.comments.length : 0}
          <DialogWindow
            content={
              <EditCommentForm
                setCandidateComment={this.props.setCandidateEditComment}
                candidateEditInfo={this.props.tempCandidate}
              />}
            label="Comments"
            openButtonType="icon"
            openButtonContent={<EditIcon />}
          />
        </div>
      </div>
    );
  }

  changeInfo(key, value) {
    this.props.changeTempCandidateInfo(key, value);
  }

  changeCandidateType(type) {
    this.setState({ candidateType: type });
    this.props.changeTempCandidateInfo('status', type);
  }
}