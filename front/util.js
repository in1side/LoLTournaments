'use strict'

import moment from 'moment'

module.exports = {
  modifyTimestampToClientTimezoneAndFormat: (timestamp, format) => {
    return moment(timestamp).utcOffset(new Date().getTimezoneOffset()).format(format)
  },
  throwExceptionIfStatusNot200: (res) => {
    return res.status !== 200 ? res.json().then(({ error }) => { throw error }) : res.json()
  }
}
