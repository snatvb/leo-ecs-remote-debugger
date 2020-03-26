/**
 * React renderer.
 */
// Import the styles here to process them with webpack
import '@public/normalize.css'
import '@public/style.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './components/App'
import * as sideEffects from './side-effects'
import * as transport from './transport'

const transportApi = transport.initialize()
sideEffects.initialize(transportApi)

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
