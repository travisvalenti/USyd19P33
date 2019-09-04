import React, { Component } from 'react'

export default class Write extends Component {
  render() {
    return (
      <div style={{
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%'
      }}>
        <strong style={{
          display: 'inline-block',
          height: '1rem'
        }}>Haven't done this yet</strong>
      </div>
    )
  }
}
