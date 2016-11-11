'use strict'

import React from 'react'
import { TableRow, TableRowColumn, TableHeaderColumn } from 'material-ui/Table'

const CustomRow = ({ orderedDataArray, rowNum, isHeaderColumn }) => {
  let rowColumns = []

  // Fill columns with each piece of data
  if (isHeaderColumn) {
    rowColumns = orderedDataArray.map((data, index) => {
      return <TableHeaderColumn key={`table-row-column${index}${rowNum}`}>{orderedDataArray[index]}</TableHeaderColumn>
    })
  } else {
    rowColumns = orderedDataArray.map((data, index) => {
      return <TableRowColumn key={`table-row-column${index}${rowNum}`}>{orderedDataArray[index]}</TableRowColumn>
    })
  }

  return (
    <TableRow className='TableRow'>
      {rowColumns}
    </TableRow>
  )
}

CustomRow.propTypes = {
  orderedDataArray: React.PropTypes.array.isRequired,
  rowNum: React.PropTypes.number.isRequired,
  isHeaderColumn: React.PropTypes.bool.isRequired
}

export default CustomRow
