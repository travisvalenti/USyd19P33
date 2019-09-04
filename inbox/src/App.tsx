import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import './index.css'

import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Mail from './components/Mail'
import Write from './components/Write'

const App: React.FC = () => (
    <Router>
      <div className="App">
        <Route path="/" component={Header} />
        <Route exact path="/" component={Dashboard} />
        <Route path="/mail/read" component={Mail} />
        <Route path="/mail/write" component={Write} />
      </div>
    </Router>
)

export default App
