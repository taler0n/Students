import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import reducer from './reducer';
import rootSaga from './sagas'
import { BrowserRouter, Route} from 'react-router-dom';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createPalette from 'material-ui/styles/createPalette';
import {deepPurple} from 'material-ui/colors';
import AppView from './appview';
import {CreateCandidate} from './candidatesClasses';
import {getAllCandidates} from './fetcher';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

getAllCandidates()
  .then(function(candidatesArray) {
    let candidates = [];
    for (let i = 0; i < candidatesArray.length; i++) {
      candidates.push(CreateCandidate(candidatesArray[i].status, candidatesArray[i]));
    }
    store.dispatch({
      type: "SET_INITIAL_STATE",
      state: {
        candidates: candidates
      }
    });

    ReactDOM.render(
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <Route path="/" component={AppView} />
          </BrowserRouter>
        </Provider>
      </MuiThemeProvider>,

      document.getElementById('root')
    );
  });

const theme = createMuiTheme({
  palette: createPalette({
    primary: deepPurple,
  })
});

