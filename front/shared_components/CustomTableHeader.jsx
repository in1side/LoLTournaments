'use strict'

import React from 'react'
import { TableRow, TableHeaderColumn } from 'material-ui/Table'

const CustomTableHeader = ({ columnNames, rowNum }) => {
  let rowColumns = []

  // Fill columns with each piece of data
  rowColumns = columnNames.map((columnName, index) => {
    return <TableHeaderColumn key={`table-row-column${index}${rowNum}`}>{columnName}</TableHeaderColumn>
  })

  return (
    <TableRow className='TableRow'>
      {rowColumns}
    </TableRow>
  )
}

CustomTableHeader.propTypes = {
  columnNames: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  rowNum: React.PropTypes.number.isRequired
}

export default CustomTableHeader
