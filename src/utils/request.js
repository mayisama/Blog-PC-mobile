// axios的封装处理  所有项目都需要

import axios from 'axios'

// 1.根域名配置
// 2.超时时间配置

const request = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000
})

// 3.请求拦截器和响应拦截器
  
// 添加请求拦截器
//在请求发送之前，做拦截，插入一些自定义的配置 【参数的处理】
request.interceptors.request.use((config)=> {
    return config
}, (error)=> {
    return Promise.reject(error)
})
  
// 添加响应拦截器
// 在响应返回到客户端之前，做拦截，重点处理返回的数据
request.interceptors.response.use((response)=> {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
}, (error)=> {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
})

export { request }