import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import config from './config'

import './index.css'

import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Mail from './components/Mail'
import Write from './components/Write'
import AppContext from './AppContext'
import TimerContext from './AppContext/TimerContext'

type State = {
  isSignedIn: boolean
  timerContext: TimerContext
  queryString: string
}

class App extends React.Component<{}, State> {

  constructor (props: {}) {
    super(props)

    this.state = {
      isSignedIn: gapi.auth2.getAuthInstance().isSignedIn.get(),
      timerContext: new TimerContext(),
      queryString: ""
    }

    this.handleQueryChange = this.handleQueryChange.bind(this)
  }

  componentDidMount () {
    this.setState({
      isSignedIn: gapi.auth2.getAuthInstance().isSignedIn.get()
    })
    gapi.auth2.getAuthInstance().isSignedIn.listen(isSignedIn =>
      this.setState({ isSignedIn })
    )
  }

  handleQueryChange (query : string) {
    this.setState({queryString : query})
  }

  render () {

    return <AppContext.Provider value={{
      timerContext: this.state.timerContext
    }}>
        <Router basename={config.basename}>
        <div className="App">
          <Route path="/" render={props => <Header {...props} queryString={this.state.queryString} onQueryChange={this.handleQueryChange} isSignedIn={this.state.isSignedIn} /> } />
          <Route exact path="/" component={Dashboard} />
          <Route path="/mail/read" render={props => <Mail {...props} queryString={this.state.queryString} isSignedIn={this.state.isSignedIn} />} />
          <Route path="/mail/write" component={Write} />
        </div>
      </Router>
    </AppContext.Provider>
  }
}

export default App
