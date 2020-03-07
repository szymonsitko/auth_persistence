const MOCK_EMAIL = 'new@email.com'
const MOCK_PASSWORD = 'mocke_password123'

class Auth {
  constructor () {
    this.user = {
      email: MOCK_EMAIL,
      password: MOCK_PASSWORD
    }
  }

  auth () {
    return this
  }

  async createUserWithEmailAndPassword (email, password) {
    if (this.user.email === email) {
      throw new Error('User already exists.')
    }
    return {
      additionalUserInfo: {
        isNewUser: true
      }
    }
  }
}

module.exports = {
  authProvider: new Auth(),
  credentials: {
    MOCK_EMAIL,
    MOCK_PASSWORD
  }
}
