import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { getLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  // 登录表单提交
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = (values) => {
    //触发异步action
    dispatch(getLogin(values))
    //1.跳转到首页
    navigate('/')
    //2.提示登录成功
    message.success('登录成功')
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form onFinish={onFinish} validateTrigger="onBlur">
          <Form.Item 
            name="mobile"
            rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: '请输入正确的手机格式',
                }
        ]}>
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
                {
                required: true,
                message: 'Please input your password!',
                },
            ]}>
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login