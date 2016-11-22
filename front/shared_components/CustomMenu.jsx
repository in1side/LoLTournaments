'use strict'

import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

const CustomMenu = ({ actions }) => {
  const menuItems = actions.map((action, index) => {
    return <MenuItem key={`menu-item${index}`} primaryText={action.text} onTouchTap={action.handler} />
  })

  return (
    <div className='CustomMenu'>
      <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        {menuItems}
      </IconMenu>
    </div>
  )
}

CustomMenu.propTypes = {
  actions: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
}

export default CustomMenu
