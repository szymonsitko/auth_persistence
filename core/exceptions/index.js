class UserRegistrationError extends Error {
  constructor (message) {
    super(message)
    this.name = 'UserRegistrationError'
  }
}

class UserAuthenticationError extends Error {
  constructor (message) {
    super(message)
    this.name = 'UserAuthenticationError'
  }
}

class UserDeletionError extends Error {
  constructor (message) {
    super(message)
    this.name = 'UserDeletionError'
  }
}

module.exports = {
  UserRegistrationError,
  UserAuthenticationError,
  UserDeletionError
}
