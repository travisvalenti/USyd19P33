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
        <Link to="/mail">
          <li className={location.pathname === '/mail' ? 'selected' : undefined}>
            Mail
          </li>
        </Link>
      </ul>
    </div>
  )
}

export default Header