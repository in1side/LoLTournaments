'use strict'

import React from 'react'
import Checkbox from 'material-ui/Checkbox'

// Input Example:
// [{
//   label: string,
//   value: string,
//   checked: bool,
//   onClick: function
// },
//   ...
// ]
const CustomMultiSelect = ({ arrayOfButtonConfigObjects, title }) => {
  const buttons = arrayOfButtonConfigObjects.map((config, index) => {
    return <Checkbox
      key={`${title}-multi-select-${index}`}
      label={config.label}
      value={config.value}
      checked={config.selected}
      onCheck={config.onClick}
    />
  })

  return (
    <div className='CustomMultiSelect'>
      <h2>{title}</h2>
      {buttons}
    </div>
  )
}

CustomMultiSelect.propTypes = {
  arrayOfButtonConfigObjects: React.PropTypes.arrayOf(React.PropTypes.object)
}

export default CustomMultiSelect
