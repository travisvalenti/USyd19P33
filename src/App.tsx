import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import './index.css'

import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Mail from './components/Mail'
import Write from './components/Write'

type State = {
  isSignedIn: boolean
}

class App extends React.Component<{}, State> {

  constructor (props: {}) {
    super(props)

    this.state = {
      isSignedIn: gapi.auth2.getAuthInstance().isSignedIn.get()
    }
  }

  componentDidMount () {
    this.setState({
      isSignedIn: gapi.auth2.getAuthInstance().isSignedIn.get()
    })
    gapi.auth2.getAuthInstance().isSignedIn.listen(isSignedIn =>
      this.setState({ isSignedIn })
    )
  }

  render () {
    return <Router>
      <div className="App">
        <Route path="/" component={Header} />
        <Route exact path="/" component={Dashboard} />
        <Route path="/mail/read" component={() => <Mail isSignedIn={this.state.isSignedIn} />} />
        <Route path="/mail/write" component={Write} />
      </div>
    </Router>
  }
}

export default App
