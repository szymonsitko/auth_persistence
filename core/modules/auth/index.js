const { provider } = require('./provider')
const { UserRegistrationError } = require('../exceptions')

const registerUserComposition = authProvider => async ({ email, password }) => {
  try {
    const response = await authProvider.auth().createUserWithEmailAndPassword(email, password)
    return {
      email,
      isCreated: response.additionalUserInfo.isNewUser
    }
  } catch (error) {
    throw new UserRegistrationError(error)
  }
}

module.exports = {
  registerUser: registerUserComposition(provider),
  registerUserComposition
}
