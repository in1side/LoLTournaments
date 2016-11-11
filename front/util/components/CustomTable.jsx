'use strict'

import React from 'react'
import { Table, TableBody, TableHeader } from 'material-ui/Table'

// Components
import CustomRow from './CustomRow'

const CustomTable = ({ arrayOfColumnNames, arrayOfRowContentArrays }) => {
  // Create table rows
  const rows = arrayOfRowContentArrays.map((rowContentArray, index) => {
    return <CustomRow key={`table-row${index}`} orderedDataArray={ rowContentArray } rowNum={index} isHeaderColumn={false} />
  })

  return (
    <div>
      <Table className='CustomTable'>
        <TableHeader>
          {/* Header Columns */}
          <CustomRow key={'table-row-1'} orderedDataArray={ arrayOfColumnNames } rowNum={-1} isHeaderColumn />
        </TableHeader>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </div>

  )
}

CustomTable.propTypes = {
  arrayOfColumnNames: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  arrayOfRowContentArrays: React.PropTypes.arrayOf(React.PropTypes.array).isRequired
}

export default CustomTable
