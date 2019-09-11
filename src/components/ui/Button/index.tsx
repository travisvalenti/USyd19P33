import React from 'react'

import './styles.css'

type Props = {
  onClick?: any,
  className?: string,
  disabled?: boolean,
  children?: React.ReactNode
}


const Button: React.FC<Props> = props => {
  let className = 'Button'
  if (props.className !== undefined) className += ' ' + props.className
  return (
    <button className={className} disabled={props.disabled} onClick={props.onClick}>
      {
        props.children
      }
    </button>
  )
}

export default Button