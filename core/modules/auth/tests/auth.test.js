const {
  registerUserComposition,
  registerUser,
  loginUserComposition,
  loginUser,
  deleteUserComposition,
  deleteUser,
  logoutUserComposition,
  logoutUser
} = require('../index')
const { authProvider, credentials } = require('../fixtures/Auth')
const {
  UserRegistrationError,
  UserAuthenticationError,
  UserDeletionError
} = require('../../../exceptions')
const { EXCEEDED_TIMEOUT } = require('../fixtures/defaults')

const useDependencies = process.env.TEST_ENV === 'test.dependencies'
const loginObject = {
  email: credentials.MOCK_EMAIL,
  password: credentials.MOCK_PASSWORD
}
const badCredentials = {
  email: 'non.existent@email.com',
  password: Date.now().toString()
}

describe('auth module test cases', () => {
  const registerUserHandler = useDependencies ? registerUser : registerUserComposition(authProvider)
  const loginUserHandler = useDependencies ? loginUser : loginUserComposition(authProvider)
  const deleteUserHandler = useDependencies ? deleteUser : deleteUserComposition(authProvider)
  const logoutUserHandler = useDependencies ? logoutUser : logoutUserComposition(authProvider)

  describe(
    'registerUser method',
    () => {
      it('should register new user with given credentials', async () => {
        const userData = await registerUserHandler(loginObject)
        expect(userData.email).toEqual(loginObject.email)
        expect(userData.isCreated).toEqual(true)
      })

      it('should fail with UserRegistrationError error if register fails', () => {
        registerUserHandler(loginObject).catch(error => {
          expect(error).toBeInstanceOf(UserRegistrationError)
          expect(error.message).toContain(
            'The email address is already in use by another account.'
          )
        })
      })
    },
    EXCEEDED_TIMEOUT
  )

  describe(
    'loginUser method',
    () => {
      it('should return logged user details upon success', async () => {
        const userData = await loginUserHandler(loginObject)
        expect(userData.email).toEqual(loginObject.email)
        expect(userData.isLoggedIn).toEqual(true)
      })

      it('should fail with UserAuthenticationError error if login fails', () => {
        loginUserHandler(badCredentials).catch(error => {
          expect(error).toBeInstanceOf(UserAuthenticationError)
          expect(error.message).toContain(
            'There is no user record corresponding to this identifier.'
          )
        })
      })
    },
    EXCEEDED_TIMEOUT
  )

  describe(
    'logoutUser method',
    () => {
      it('should logout user which is currently authenticated', async () => {
        const { currentUser, isLoggedOut } = await logoutUserHandler()

        expect(currentUser).toEqual(loginObject.email)
        expect(isLoggedOut).toBeTruthy()
      })
    },
    EXCEEDED_TIMEOUT
  )

  describe(
    'deleteUser method',
    () => {
      beforeAll(async () => {
        await loginUserHandler(loginObject)
      })

      it('should delete existing user', async () => {
        const { currentUser, isDeleted } = await deleteUserHandler()

        expect(currentUser).toEqual(credentials.MOCK_EMAIL)
        expect(isDeleted).toBeTruthy()
      })

      it('should fail with UserDeletionError error if login fails', () => {
        deleteUserHandler(badCredentials).catch(error => {
          expect(error).toBeInstanceOf(UserDeletionError)
          expect(error.message).toContain(
            'Unable to delete currently authenticated user.'
          )
        })
      })
    },
    EXCEEDED_TIMEOUT
  )
})
