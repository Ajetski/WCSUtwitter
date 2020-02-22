import store from 'store'
const USER_KEY = 'user_key'

export default {
  saveUser (user) {
    store.set(USER_KEY, user)
  },

  getUser () {
    // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
    return store.get(USER_KEY) || {}
  },

  removeUser () {
    store.remove(USER_KEY)
  }
}