// redux中编写获取token的异步获取和同步修改
import { createSlice } from '@reduxjs/toolkit'
import { request } from '@/utils'

const userStore = createSlice({
    name: 'user',
    initialState: {
        token: localStorage.getItem('token_key') || '',
    },
    // 同步修改方法
    reducers: {
        //Token持久化，redux存一份，localStorage存一份
        setToken(state, action) {
            state.token = action.payload
            localStorage.setItem('token_key', action.payload)
        }
    }
})

// 解构出 actionCreater

const { setToken } = userStore.actions

// 异步方法 完成登录获取token
const getLogin = (loginForm) => {
    return async (dispatch) => {
        //1. 发送异步请求
        const res = await request.post('/authorizations', loginForm)
        //2. 提交同步action进行token的存入
        dispatch(setToken(res.data.token))
    }
}

// 获取 reducer函数

const userReducer = userStore.reducer

export { getLogin, setToken }

export default userReducer 