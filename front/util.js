'use strict'

import moment from 'moment'

module.exports = {
  modifyTimestampToClientTimezoneAndFormat: (timestamp, format) => {
    return moment(timestamp).utcOffset(new Date().getTimezoneOffset()).format(format)
  }
}
