'use strict'

import React from 'react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

const CustomRadioSelection = ({ objectOfOptions, selectionGroupName, eventHandler }) => {
  const options = []

  for (let key in objectOfOptions) {
    if (objectOfOptions.hasOwnProperty(key)) {
      options.push(<RadioButton key={`radio-selection${key}`} label={key} value={objectOfOptions[key]} />)
    }
  }

  // TODO: Figure out multi-select readio buttons
  return (
    <RadioButtonGroup
      name={selectionGroupName}
      onChange={eventHandler}>
      {options}
    </RadioButtonGroup>
  )
}

CustomRadioSelection.propTypes = {
  objectOfOptions: React.PropTypes.object.isRequired,
  selectionGroupName: React.PropTypes.string.isRequired,
  eventHandler: React.PropTypes.func.isRequired
}

export default CustomRadioSelection
