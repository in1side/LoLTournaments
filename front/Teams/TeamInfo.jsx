'use strict'

import React from 'react'

const TeamInfo = ({ teamInfoObject }) => {
  const infoComponents = Object.keys(teamInfoObject).map((info, index) => {
    return <h2 key={`${teamInfoObject.name}-${index}`}>{`${info}: ${teamInfoObject[info]}`}</h2>
  })

  return (
    <div className='TeamInfo'>
      {infoComponents}
    </div>
  )
}

TeamInfo.propTypes = {
  teamInfoObject: React.PropTypes.object.isRequired
}

export default TeamInfo
