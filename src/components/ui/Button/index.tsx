import React from 'react'

import './styles.css'

type Props = {
  onClick?: any,
  className?: string,
  disabled?: boolean,
  children?: React.ReactNode
}


const Button: React.FC<Props> = props => {
  return (
    
    <button className={'Button ' + props.className}>
      {
        props.children
      }
    </button>
  )
}

export default Button