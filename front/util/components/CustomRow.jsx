'use strict'

import React from 'react'
import { TableRow, TableRowColumn } from 'material-ui/Table'

const CustomRow = ({ dataObject, rowNum }) => {
  let rowColumns = []

  rowColumns = Object.keys(dataObject).map((attribute, index) => {
    return <TableRowColumn key={`table-row-column${index}${rowNum}`}>{dataObject[attribute]}</TableRowColumn>
  })

  return (
    <TableRow className='TableRow'>
      {rowColumns}
    </TableRow>
  )
}

CustomRow.propTypes = {
  dataObject: React.PropTypes.object.isRequired,
  rowNum: React.PropTypes.number.isRequired
}

export default CustomRow
