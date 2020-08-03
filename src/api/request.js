import axios from 'axios'
import { cloneDeep } from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
// import store from 'store'
import Cookie from 'js-cookie'
import { retunToLogin } from 'utils'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
// import qs from 'qs'

const { CancelToken, interceptors } = axios
window.cancelRequest = new Map()

// 添加请求拦截器
interceptors.request.use(function (config) {
  const { headers } = config
  const Authorization = Cookie.get('authorization')
  if (Authorization !== undefined){
    headers.Authorization = Authorization
  } 
  // else {
  //   retunToLogin()
  // }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 响应拦击
interceptors.response.use(function (response) {
  const { config, headers } = response
  if (config.url === '/gaia-web/login1212' || config.url === '/gaia-web/login2') {
    Cookie.set('authorization', headers.authorization)
  } else if (response.data.messageCode === '001004') retunToLogin()
  // 对响应数据做点什么
  return response
}, function (error) {
  if (String(error.message) === CANCEL_REQUEST_MESSAGE) return Promise.reject(error)
  const { status } = error.response
  // 401 Token 失效
  if (status === 401) retunToLogin()
  // 404
  if (status === 404) window.location = `${window.location.origin}/notFound`
  return Promise.reject(error)
})

export default function request (options) {
  let { data, url } = options
  const cloneData = cloneDeep(data)

  try {
    let domain = ''
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/)
    if (urlMatch) {
      ;[domain] = urlMatch
      url = url.slice(domain.length)
    }

    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)

    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domain + url
  } catch (e) {
    message.error(e.message)
  }

  options.url = url
  options.params = cloneData
  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel,
    })
  })

  return axios(options)
    .then(response => {
      const { statusText, status, data } = response
      let result = {}
      if (typeof data === 'object') {
        result = data
        if (Array.isArray(data)) {
          result.list = data
        }
      } else {
        result.data = data
      }
      const resultObj = {
        success: data.messageCode && data.messageCode === '000000',
        message: statusText,
        statusCode: status,
        ...result,
      }
      return Promise.resolve(resultObj)
    })
    .catch(error => {
      const { response, message } = error
      if (String(message) === CANCEL_REQUEST_MESSAGE) {
        return null
      }
      let msg
      let statusCode
      if (response && response instanceof Object) {
        const { data, statusText } = response
        statusCode = response.status
        msg = data.message || statusText
      } else {
        statusCode = 600
        msg = error.message || 'Network Error'
      }
      /* eslint-disable */
      return Promise.reject({
        success: false,
        statusCode,
        message: msg,
      })
    })
}
