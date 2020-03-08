const { provider } = require('./provider')
const {
  UserRegistrationError,
  UserAuthenticationError,
  UserDeletionError,
  UserLogoutError
} = require('../../exceptions')

const registerUserComposition = authProvider => async ({ email, password }) => {
  try {
    const response = await authProvider
      .auth()
      .createUserWithEmailAndPassword(email, password)
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

const deleteUserComposition = authProvider => async () => {
  try {
    const { currentUser } = authProvider.auth()
    await currentUser.delete()
    return {
      currentUser: currentUser.email,
      isDeleted: true
    }
  } catch ({ stack }) {
    throw new UserDeletionError(
      `Unable to delete currently authenticated user. Stack trace: ${stack}`
    )
  }
}

const logoutUserComposition = authProvider => async () => {
  try {
    const { currentUser } = authProvider.auth()
    await authProvider.auth().signOut()

    return {
      currentUser: currentUser.email,
      isLoggedOut: true
    }
  } catch ({ stack }) {
    throw new UserLogoutError(
      `Unable to delete currently authenticated user. Stack trace: ${stack}`
    )
  }
}

module.exports = {
  registerUser: registerUserComposition(provider),
  loginUser: loginUserComposition(provider),
  deleteUser: deleteUserComposition(provider),
  logoutUser: logoutUserComposition(provider),
  registerUserComposition,
  loginUserComposition,
  deleteUserComposition,
  logoutUserComposition
}
