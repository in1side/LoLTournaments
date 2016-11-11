'use strict'

import React, { Component } from 'react'

// Components
import CustomTable from '../util/components/CustomTable'

export default class Teams extends Component {
  // Fetch all teams from database
  render () {
    return (
      <div className='Teams'>
        <h2>Testing Table</h2>
        <CustomTable
          arrayOfColumnNames={['test', 'num']}
          arrayOfRowContentArrays={[['test 1', 1], ['test 2', 2]]}
        />
      </div>
    )
  }
}
