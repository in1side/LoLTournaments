'use strict'

module.exports = {
  findUserByID: (userID) => {
    return db.User.findById(userID)
  }
}
