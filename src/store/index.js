// 组合redux子模块 + 导出store实例

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";

export default configureStore({
  reducer: {
    // 这里可以添加多个子模块的reducers
    user: userReducer
  }, 
})