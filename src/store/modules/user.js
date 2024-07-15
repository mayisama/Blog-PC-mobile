// redux中编写获取token的异步获取和同步修改
import { createSlice } from '@reduxjs/toolkit'
import { removeToken, request } from '@/utils'
import { setToken as _setToken, getToken } from '@/utils'

const userStore = createSlice({
    name: 'user',
    initialState: {
        token: getToken() || '',
        userInfo: {}
    },
    // 同步修改方法
    reducers: {
        //Token持久化，redux存一份，localStorage存一份
        setToken(state, action) {
            state.token = action.payload
            _setToken(action.payload)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        clearUserInfo(state) {
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    }
})

// 解构出 actionCreater

const { setToken, setUserInfo, clearUserInfo } = userStore.actions

// 异步方法 完成登录获取token
const getLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await request.post('/authorizations', loginForm)
        dispatch(setToken(res.data.token))
    }
}

const getUserInfo = () => {
    return async (dispatch) => {
        const res = await request.get('/user/profile')
        dispatch(setUserInfo(res.data))
    }
}

// 获取 reducer函数

const userReducer = userStore.reducer

export { getLogin, getUserInfo, setToken, clearUserInfo }

export default userReducer 