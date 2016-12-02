'use strict'

import React from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import CustomTable from './CustomTable'

import { generateColumnNames } from '../util/helpers'

// Contents: [{ title: string, desc: string, team: obj }, ...]
const CustomTabs = ({ teams }) => {
  const tabs = Object.keys(teams).map((team) => {
    const { name, desc } = teams[team]

    return (
      <Tab key={`tab-${name}`} label={name}>
        <div>
          <h2>{name}</h2>
          <p>{desc}</p>
          <CustomTable
            // NOTE: This is a hack since CustomTable wants ARRAY OF OBJECTS
            givenColumnNames={generateColumnNames([teams[team]])}
            rowContents={[teams[team]]}
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
