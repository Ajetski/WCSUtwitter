import axios from 'axios'
//import {message} from 'antd'

export default function ajax(url, data={}, type='GET') {

  return new Promise((resolve, reject) => {
    let promise

    if(type==='GET') {
      promise = axios.get(url, {
        params: data
      })
    }

    if(type==='POST') {
      promise = axios.post(url, data)
    }

    promise.then(response => {
      //console.log(response)
      resolve(response)
    }).catch(error => {
      console.log('Error:' + error)
      //message.error('error: ' + error.message)
    })
  })
}