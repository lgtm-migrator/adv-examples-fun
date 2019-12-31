import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Grid from '@material-ui/core/Grid'
import AccChart from './containers/AccChart'
import LossChart from './containers/LossChart'
import LoadButton from './containers/LoadButton'
import TrainButton from './containers/TrainButton'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { reducer } from './modules'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import { composeWithDevTools } from 'redux-devtools-extension'
import GenButton from './containers/GenButton'

const sagaMiddleware = createSagaMiddleware()
// When you use the next line, your browser will crash
// const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))
const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)
const App = () => (
  <Provider store={store}>
    <Grid container spacing={3} justify="center">
      <Grid container item xs={12} justify="center">
        <LoadButton />
      </Grid>
      <Grid container item xs={12} justify="center">
        <TrainButton />
      </Grid>
      <Grid container item xs={6} justify="center">
        <LossChart />
      </Grid>
      <Grid container item xs={6} justify="center">
        <AccChart />
      </Grid>
      <Grid container item xs={12} justify="center">
        <GenButton />
      </Grid>
    </Grid>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
