// 封装和文章相关的接口函数

import { request } from "@/utils"

// 1.获取频道列表
export function getChannelAPI() {
    return request({
        url: '/channels',
        method: 'GET',
    })
}