import React from 'react';
import 'antd/dist/antd.css';
import './login.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

class LoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <div className="login-form-icon">
        <Icon type="twitter" style={{ fontSize: '50px', color: '#08c' }} />
        <p className="login-form-p">Log in to Twitter</p>
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
          <a href="/forgot.html">Forgot password? </a>
          <a href="/register.html"> Sign up for Twitter!</a>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

export default WrappedLoginForm;