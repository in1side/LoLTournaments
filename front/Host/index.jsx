'use strict'

import React, { Component } from 'react'

export default class Host extends Component {
  isUserHost = () => {
    if (localStorage.getItem('profile') === null) return

    const userType = JSON.parse(localStorage.getItem('profile')).user_metadata.userType
    return userType === 'host'
  }

  render () {
    if (this.isUserHost()) {
      return (
        <div className='Host'>
          <h1>HOST VIEW</h1>
        </div>
      )
    }
    return null
  }
}
