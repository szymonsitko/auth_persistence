const {
  registerUserComposition,
  registerUser,
  loginUserComposition,
  loginUser
} = require('../index')
const { authProvider, credentials } = require('../fixtures/Auth')
const { UserRegistrationError, UserAuthenticationError } = require('../../exceptions')

const { MOCK_EMAIL, MOCK_PASSWORD } = credentials
const useDependencies = process.env.TEST_ENV === 'test.dependencies'

describe('auth module test cases', () => {
  const registerUserHandler = useDependencies ? registerUser : registerUserComposition(authProvider)
  const loginUserHandler = useDependencies ? loginUser : loginUserComposition(authProvider)

  describe('registerUser method', () => {
    it('should register new user with given credentials', async () => {
      const credentials = {
        email: `new_${Date.now()}@email.com`,
        password: 'secret_password'
      }

      const userData = await registerUserHandler(credentials)
      expect(userData.email).toEqual(credentials.email)
      expect(userData.isCreated).toEqual(true)
    })

    it('should fail with UserRegistrationError error if register fails', () => {
      const credentials = {
        email: MOCK_EMAIL,
        password: MOCK_PASSWORD
      }

      registerUserHandler(credentials).catch(error => {
        expect(error).toBeInstanceOf(UserRegistrationError)
        expect(error.message).toContain('The email address is already in use by another account.')
      })
    })
  })

  describe('loginUser method', () => {
    it('should return logged user details upon success', async () => {
      const credentials = {
        email: 'new@email.com',
        password: 'qwerty'
      }

      const userData = await loginUserHandler(credentials)
      expect(userData.email).toEqual(credentials.email)
      expect(userData.isLoggedIn).toEqual(true)
    })

    it('should fail with UserAuthenticationError error if login fails', () => {
      const credentials = {
        email: 'non.existent@email.com',
        password: Date.now().toString()
      }

      loginUserHandler(credentials).catch(error => {
        expect(error).toBeInstanceOf(UserAuthenticationError)
        expect(error.message).toContain('There is no user record corresponding to this identifier.')
      })
    })
  })
})
