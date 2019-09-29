import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import './index.css'

import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Search from './components/Dashboard/Search'
import Mail from './components/Mail'
import Write from './components/Write'
import AppContext from './AppContext'
import TimerContext from './AppContext/TimerContext'

type State = {
  isSignedIn: boolean
  timerContext: TimerContext
}

class App extends React.Component<{}, State> {

  constructor (props: {}) {
    super(props)

    this.state = {
      isSignedIn: gapi.auth2.getAuthInstance().isSignedIn.get(),
      timerContext: new TimerContext()
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

    return <AppContext.Provider value={{
      timerContext: this.state.timerContext
    }}>
        <Router>
        <div className="App">
          <Route path="/" render={props => <Header {...props} isSignedIn={this.state.isSignedIn} /> } />
          <Route exact path="/" component={Dashboard} />
          <Route path="/search" component={Search} />
          <Route path="/mail/read" render={props => <Mail {...props} isSignedIn={this.state.isSignedIn} />} />
          <Route path="/mail/write" component={Write} />
        </div>
      </Router>
    </AppContext.Provider>
  }
}

export default App
