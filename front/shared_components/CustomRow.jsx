'use strict'

import React from 'react'
import { TableRow, TableRowColumn } from 'material-ui/Table'

const CustomRow = ({ data, rowNum, handleRowClick }) => {
  let rowColumns = []

  rowColumns = Object.keys(data).map((attribute, index) => {
    return <TableRowColumn key={`table-row-column${index}${rowNum}`}>{data[attribute]}</TableRowColumn>
  })

  return (
    <TableRow
      className='TableRow'
      onClick={() => { handleRowClick(data) }}
      >
      {rowColumns}
    </TableRow>
  )
}

CustomRow.propTypes = {
  data: React.PropTypes.object.isRequired,
  rowNum: React.PropTypes.number.isRequired,
  handleRowClick: React.PropTypes.func
}

export default CustomRow
