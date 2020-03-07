const { registerUserComposition } = require('../index')
const { authProvider } = require('../fixtures/Auth')

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
  })
})
