'use strict'

import 'whatwg-fetch'

module.exports = {
  generateColumnNames: (teams) => {
    const FIRST_TEAM = 0

    return teams.length === 0 ? [] : Object.keys(teams[FIRST_TEAM]).map((attribute) => attribute)
  },
  hitAPI: (endpoint, method, headers = {}, body) => {
    const request = {
      method,
      headers: Object.assign(headers,
        {
          'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
          'Content-Type': 'application/json'
        }
      ),
      body
    }

    return fetch(endpoint, request)
  }
}
