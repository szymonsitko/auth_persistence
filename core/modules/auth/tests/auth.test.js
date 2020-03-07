const { registerUserComposition } = require('../index')
const { authProvider, credentials } = require('../fixtures/Auth')
const { UserRegistrationError } = require('../../exceptions')

const { MOCK_EMAIL, MOCK_PASSWORD } = credentials

describe('auth module test cases', () => {
  const registerUser = registerUserComposition(authProvider)

  describe('registerUser method', () => {
    it('should register new user with given credentials', async () => {
      const credentials = {
        email: `new_${Date.now()}@email.com`,
        password: 'secret_password'
      }

      const userData = await registerUser(credentials)
      expect(userData.email).toEqual(credentials.email)
      expect(userData.isCreated).toEqual(true)
    })

    it('should fail with UserRegistrationError error if register fails', () => {
      const credentials = {
        email: MOCK_EMAIL,
        password: MOCK_PASSWORD
      }

      registerUser(credentials).catch(error => {
        expect(error).toBeInstanceOf(UserRegistrationError)
        expect(error.message).toContain('User already exists')
      })
    })
  })
})
