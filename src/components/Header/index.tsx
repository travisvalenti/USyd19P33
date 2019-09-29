import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

import './styles.css'

import SearchBar from './SearchBar'
import UserWidget from './UserWidget'

type Props = {
  isSignedIn : boolean
  queryString : string
  onQueryChange : any
}

const Header = (props : Props & RouteComponentProps) => {

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
      <SearchBar queryString={props.queryString} onQueryChange={props.onQueryChange}/>
      <UserWidget isSignedIn={props.isSignedIn} />
    </div>
  )
}

export default Header