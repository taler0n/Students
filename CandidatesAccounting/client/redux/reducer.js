import Immutable from 'immutable';

export default function reducer(state = Immutable.Map(), action) {
  switch (action.type) {
    case 'SET_INITIAL_STATE':
      return state.merge(action.state);

    case 'LOGIN_SUCCESS':
      let userName = action.email.split('@')[0];
      state = state.set('userName', userName);
      return state = state.set('authorizationStatus', 'authorized');

    case 'LOGOUT_SUCCESS':
      state = state.set('userName', '');
      return state = state.set('authorizationStatus', 'not-authorized');

    case 'ADD_CANDIDATE_SUCCESS':
      return state.update('candidates', (candidates) => candidates.push(Immutable.fromJS(action.candidate)));

    case 'DELETE_CANDIDATE_SUCCESS':
      return state.update('candidates', (candidates) => candidates.filterNot((candidate) => candidate.get('id') === action.candidateID));

    case 'UPDATE_CANDIDATE_SUCCESS':
      return state = state.update('candidates', (candidates) => candidates.map((candidate) => {
        console.log(candidate);
        if (candidate.get('id') === action.candidate.id) {
          return Immutable.fromJS(action.candidate);
        } else {
          return candidate;
        }
      }));

    case 'ADD_COMMENT_SUCCESS':
      return state = state.update('candidates', (candidates) => candidates.map((candidate) => {
        if (candidate.get('id') === action.candidateID) {
          return candidate.update('comments', (comments) => comments.push(Immutable.fromJS(action.comment)));
        } else {
          return candidate;
        }
      }));

    case 'DELETE_COMMENT_SUCCESS':
      return state = state.update('candidates', (candidates) => candidates.map((candidate) => {
        if (candidate.get('id') === action.candidateID) {
          return candidate.update('comments', (comments) => comments.filterNot((comment) =>
            comment.get('author') === action.comment.author &&
            comment.get('date') === action.comment.date &&
            comment.get('text') === action.comment.text));
        } else {
          return candidate;
        }
      }));

    case 'SET_ERROR_MESSAGE':
      return state = state.set('errorMessage', action.message);

    case 'SET_SEARCH_REQUEST':
      return state = state.set('searchRequest', action.searchRequest);

    case 'SET_PAGE_TITLE':
      return state = state.set('pageTitle', action.title);

    default:
      return state;
  }
}