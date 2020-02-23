import React from 'react';
import { Redirect } from 'react-router-dom'
import './login.less';
import { Form, Icon, Input, Button, message } from 'antd';
import bcrypt from 'bcryptjs';

import { reqLogin } from '../../axios/index'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

const saltRounds = 10;
class LoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        values.password = await bcrypt.hash(values.password, saltRounds)
        const {username, password} = values
        const result = await reqLogin(username, password)
        if (result.status===0) {
          message.success('login successful!')

          const user = result.data
          memoryUtils.user = user
          storageUtils.saveUser(user)

          this.props.history.replace('/home')
        } else {
          message.error(result.msg)
        }
      } else {
        console.log('error: '+ err.message)
      }
    });
  };

  render() {
    const user = memoryUtils.user
    if(user && user.username) {
      return <Redirect to='/home'/>
    }
    
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <div className="login-form-icon">
        <Icon type="twitter" style={{ fontSize: '50px', color: '#08c' }} />
        <p className="login-form-p">Log in to WCSUTwitter</p>
        </div>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input size="large" className="login-form-input"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input size="large" className="login-form-input"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" shape="round" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          <a href="/forgot">Forgot password?</a>
          <a href="/signup" style={{ float: 'right' }}> Sign up for WCSUTwitter!</a>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

export default WrappedLoginForm;