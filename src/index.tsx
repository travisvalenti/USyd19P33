import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import config from './config'

new Promise((resolve) => {
  gapi.load('client:auth2', resolve)
})
  .then(() => gapi.client.init(config.gapi.init))
  .finally(() => ReactDOM.render(<App />, document.getElementById('root')))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
