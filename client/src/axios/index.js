import ajax from './axios'

//const BASE = 'http://localhost:8080'
const BASE = ''

export const reqSingup = (user) => ajax(BASE + '/api/user', {user}, 'POST')
export const reqLogin = (username, password) => ajax(BASE + '/api/login', {username, password}, 'POST')