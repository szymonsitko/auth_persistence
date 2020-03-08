const MOCK_EMAIL = 'new_user@email.com'
const MOCK_PASSWORD = 'secret_password'

class Auth {
  constructor () {
    this.user = {}
    this.currentUser = {
      async delete () {
        return Promise.resolve({
          email: this.email,
          isDeleted: true
        })
      }
    }
  }

  auth () {
    return this
  }

  async createUserWithEmailAndPassword (email, password) {
    if (this.user.email === email) {
      throw new Error('The email address is already in use by another account.')
    } else {
      this.user = {
        email: MOCK_EMAIL,
        password: MOCK_PASSWORD
      }
    }
    return {
      additionalUserInfo: {
        isNewUser: true
      }
    }
  }

  async signInWithEmailAndPassword (email, password) {
    if (this.user.email !== email) {
      throw new Error('There is no user record corresponding to this identifier.')
    } else {
      this.currentUser.email = email
      this.user.email = email
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
