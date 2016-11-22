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
const CustomMultiSelect = ({ buttonConfigs, title }) => {
  const buttons = buttonConfigs.map((config, index) => {
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
  buttonConfigs: React.PropTypes.arrayOf(React.PropTypes.object)
}

export default CustomMultiSelect
