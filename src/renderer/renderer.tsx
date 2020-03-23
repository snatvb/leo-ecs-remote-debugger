/**
 * React renderer.
 */
// Import the styles here to process them with webpack
import '@public/normalize.css'
import '@public/style.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './components/App'
import * as dataWorker from './transport'

dataWorker.initialize()

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
