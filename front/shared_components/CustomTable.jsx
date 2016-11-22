'use strict'

import React from 'react'
import { Table, TableBody, TableHeader } from 'material-ui/Table'

// Components
import CustomRow from './CustomRow'
import CustomTableHeader from './CustomTableHeader'

const CustomTable = ({ givenColumnNames, rowContents }) => {
  let rows
  // Create table rows
  if (rowContents !== null) {
    rows = rowContents.map((rowContentObject, index) => {
      return <CustomRow key={`table-row${index}`} dataObject={rowContentObject} rowNum={index} isHeaderColumn={false}/>
    })
  }

  return (
    <div>
      <Table className='CustomTable'>
        <TableHeader>
          {/* Header Columns */}
          <CustomTableHeader key={'table-row-1'} columnNames={givenColumnNames} rowNum={-1} />
        </TableHeader>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </div>

  )
}

CustomTable.propTypes = {
  givenColumnNames: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  rowContents: React.PropTypes.arrayOf(React.PropTypes.object),
  onRowClick: React.PropTypes.func
}

export default CustomTable
