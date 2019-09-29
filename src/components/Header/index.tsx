import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

import './styles.css'

import SearchBar from './SearchBar'
import UserWidget from './UserWidget'

type Props = {
  isSignedIn : boolean;
}

const Header = (props : Props & RouteComponentProps) => {

  const queryString = require('query-string');
  const parsed = queryString.parse(props.location.search);

  return (
    <div className="Header">
      <div className="navigateItems">
        <ul>
          <Link to="/">
            <li className={props.location.pathname === '/' || props.location.pathname === '/search' ? 'selected' : undefined}>
              Dashboard
            </li>
          </Link>
          <Link to="/mail/write">
            <li className={props.location.pathname === '/mail/write' ? 'selected' : undefined}>
              <i className="material-icons">edit</i> Write
            </li>
          </Link>
          <Link to="/mail/read">
            <li className={props.location.pathname === '/mail/read' ? 'selected' : undefined}>
              <i className="material-icons">email</i> Read
            </li>
          </Link>
        </ul>
      </div>
      <SearchBar query={parsed.q}/>
      <UserWidget isSignedIn={props.isSignedIn} />
    </div>
  )
}

export default Header