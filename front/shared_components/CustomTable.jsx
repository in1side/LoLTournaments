'use strict'

import React from 'react'
import { Table, TableBody, TableHeader } from 'material-ui/Table'

// Components
import CustomRow from './CustomRow'
import CustomTableHeader from './CustomTableHeader'

const CustomTable = ({ givenColumnNames, rowContents, handleRowClick }) => {
  let rows
  // Create table rows
  if (rowContents !== null) {
    rows = rowContents.map((rowContent, index) => {
      return <CustomRow key={`table-row${index}`} data={rowContent} rowNum={index} isHeaderColumn={false} handleRowClick={handleRowClick}/>
    })
  }

  return (
    <Table className='CustomTable'>
      <TableHeader>
        {/* Header Columns */}
        <CustomTableHeader key={'table-row-1'} columnNames={givenColumnNames} rowNum={-1} />
      </TableHeader>
      <TableBody>
        {rows}
      </TableBody>
    </Table>
  )
}

CustomTable.propTypes = {
  givenColumnNames: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  rowContents: React.PropTypes.arrayOf(React.PropTypes.object),
  handleRowClick: React.PropTypes.func
}

export default CustomTable
