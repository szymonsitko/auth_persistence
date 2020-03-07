const { provider } = require('./provider')
const { UserRegistrationError, UserAuthenticationError } = require('../exceptions')

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

const loginUserComposition = authProvider => async ({ email, password }) => {
  try {
    await authProvider.auth().signInWithEmailAndPassword(email, password)
    return {
      email,
      isLoggedIn: true
    }
  } catch (error) {
    throw new UserAuthenticationError(error)
  }
}

module.exports = {
  registerUser: registerUserComposition(provider),
  loginUser: loginUserComposition(provider),
  registerUserComposition,
  loginUserComposition
}
