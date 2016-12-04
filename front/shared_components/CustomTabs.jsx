'use strict'

import React from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import CustomTable from './CustomTable'

import { generateColumnNames } from '../util/helpers'

// Contents: [{ title: string, desc: string, team: obj }, ...]
const CustomTabs = ({ contents }) => {
  const tabs = Object.keys(contents).map((content) => {
    const { name, desc } = contents[content]

    return (
      <Tab key={`tab-${name}`} label={name}>
        <div>
          <h2>{name}</h2>
          <p>{desc}</p>
          <CustomTable
            // NOTE: This is a hack since CustomTable wants ARRAY OF OBJECTS
            givenColumnNames={generateColumnNames([contents[content]])}
            rowContents={[contents[content]]}
          />
        </div>
    </Tab>
    )
  })

  return (
    <Tabs className='CustomTabs'>
      {tabs}
    </Tabs>
  )
}

export default CustomTabs
