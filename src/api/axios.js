import axios from 'axios'
import qs from 'qs'

const useToken = true

axios.defaults.timeout = 200000
// axios.defaults.baseURL = apiUrl.url
axios.defaults.withCredentials = true
// axios.defaults.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
axios.defaults.headers.post['Content-Type'] = 'application/json'
if (useToken) { // 从response.header请求头中获取相关的token
  axios.defaults.headers.get['token'] = localStorage.token
  axios.defaults.headers.post['token'] = localStorage.token
}
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
// 在发送请求之前做些什么
	return config;
}, function (error) {
// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
// 对响应数据做点什么
	return response;
}, function (error) {
// 对响应错误做点什么
	return Promise.reject(error);
});

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params
    })
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 封装post方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post (url, params = {}) {
  return new Promise((resolve, reject) => {
    console.log(process.env.NODE_ENV)
    const newUrl = process.env.NODE_ENV === 'development' ?`/cps${url}`:url
    axios.post(newUrl, qs.stringify(params))
      .then(function (response) {
        resolve(response)
        // 在所有 post 接口出现 -1000 状态时直接跳去登录
      })
      .catch(function (error) {
        reject(error)
      })
  })
}
