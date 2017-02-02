'use strict'

import moment from 'moment'

module.exports = {
  modifyTimestampToClientTimezoneAndFormat: (timestamp, format) => {
    return moment(timestamp).utcOffset(new Date().getTimezoneOffset()).format(format)
  },
  throwExceptionIfResponseStatusNotSuccess: (res) => {
    console.log('res status:', res.status)
    return (res.status !== 200) && (res.status !== 201) ? res.json().then(({ error }) => { throw error }) : res.json()
  },
  isUserTypeEqualTo: (type) => {
    const profile = JSON.parse(localStorage.getItem('profile'))

    if (profile === null) return false

    return profile.user_metadata.userType === type
  }
}
