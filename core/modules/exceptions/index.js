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

module.exports = {
  UserRegistrationError,
  UserAuthenticationError
}
