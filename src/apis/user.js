// 用户相关的所有请求
import { request } from "@/utils"

// 1.登录模块

export function loginAPI(formData) {
    return request({
        url: '/authorizations',
        method: 'POST',
        data: formData,
    })
}

// 2.获取用户信息

export function getUserInfoAPI() {
    return request({
        url: '/user/profile',
        method: 'GET',
    })
}