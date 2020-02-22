import ajax from './axios'

//const BASE = 'http://localhost:8080'
const BASE = ''

export const reqSingup = (user) => ajax(BASE + '/api/user', {user}, 'POST')