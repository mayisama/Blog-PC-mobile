// 封装高阶组件
// 有token正常跳转，无token跳转登录页
import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

export function AuthRoute({ children }) {
    const token = getToken();
    return token ? <>{ children }</> : <Navigate to="/login" />;
}