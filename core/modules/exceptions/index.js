class UserRegistrationError extends Error {
  constructor (message) {
    super(message)
    this.name = 'UserRegistrationError'
  }
}

module.exports = {
  UserRegistrationError
}
