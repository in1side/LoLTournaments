'use strict'

import React from 'react'

const TeamInfo = ({ team }) => {
  const infoComponents = Object.keys(team).map((info, index) => {
    return <h2 key={`${team.name}-${index}`}>{`${info}: ${team[info]}`}</h2>
  })

  return (
    <div className='TeamInfo'>
      {infoComponents}
    </div>
  )
}

TeamInfo.propTypes = {
  team: React.PropTypes.object.isRequired
}

export default TeamInfo
