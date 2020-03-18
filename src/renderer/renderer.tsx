/**
 * React renderer.
 */
// Import the styles here to process them with webpack
import '@public/normalize.css'
import '@public/style.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as api from './api'
import { App } from './components/App'
import * as dataWorker from './data-worker'

dataWorker.initialize(api.initialize())

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
