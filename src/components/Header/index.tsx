import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

import './styles.css'

import UserWidget from './UserWidget'

type Props = {
  isSignedIn : boolean;
}

const Header = (props : Props & RouteComponentProps) => {
  console.log(props.location)
  return (
    <div className="Header">
      <ul>
        <Link to="/">
          <li className={props.location.pathname === '/' ? 'selected' : undefined}>
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
        <UserWidget isSignedIn={props.isSignedIn} />
      </ul>
    </div>
  )
}

export default Header