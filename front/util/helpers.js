'use strict'

module.exports = {
  generateColumnNames: (teams) => {
    const FIRST_TEAM = 0

    return teams.length === 0 ? [] : Object.keys(teams[FIRST_TEAM]).map((attribute) => attribute)
  }
}
