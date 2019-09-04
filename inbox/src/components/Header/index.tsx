import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

import './styles.css'

const Header = ({ location }: RouteComponentProps) => {
  console.log(location)
  return (
    <div className="Header">
      <ul>
        <Link to="/">
          <li className={location.pathname === '/' ? 'selected' : undefined}>
            Dashboard
          </li>
        </Link>
        <Link to="/mail/write">
          <li className={location.pathname === '/mail/write' ? 'selected' : undefined}>
            <i className="material-icons">edit</i> Write
          </li>
        </Link>
        <Link to="/mail/read">
          <li className={location.pathname === '/mail/read' ? 'selected' : undefined}>
            <i className="material-icons">email</i> Read
          </li>
        </Link>
      </ul>
    </div>
  )
}

export default Header