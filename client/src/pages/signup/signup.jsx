import React from 'react';
import './signup.less';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Checkbox,
  Button,
  message,
  Modal
} from 'antd';

import {reqSingup, reqUserIsExist, reqEmailIsExist} from '../../axios/index'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import aesUtils from '../../utils/aesUtils'

function readAgreementInfo() {
  Modal.info({
    title: 'Agreement',
    content: (
      <div>
        <p>Nothing, but Thank you for your registration</p>
      </div>
    ),
    onOk() {},
  });
}

async function userIsExist(username) {
  return await reqUserIsExist(username)
}

async function emailIsExist(email) {
  return await reqEmailIsExist(email);
}

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, user) => {
      if (!err) {
        user.password = aesUtils.aesEncrypt(user.password, user.username)
        delete user.confirm
        const result = await reqSingup(user)
        console.log(result)
        if (result.status===200) {
          message.success(result.data.response)

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

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  validateUsername = (rule, value, callback) => {
    if(!value) {
      callback('Please input your username!')
    } else if (value.length<4) {
      callback('User name must be at least 4 characters!')
    } else if (value.length>12) {
      callback('User name cannot be longer than 12 characters!')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('User name must be letters, numbers, or underscores!')
    } else {
      userIsExist(value).then(response => {
        if(response.data.exists){
          callback('Username already exists!')
        } else {
          callback()
        }
      })
    }
  }

  validateEmail = (rule, value, callback)  => {
    emailIsExist(value).then(response => {
      if(response.data.exists){
        callback('This email is already registered!')
      } else {
        callback()
      }
    })
  }

  validatePassword = (rule, value, callback) => {
    if(!value) {
      callback('Please input your password!')
    } else if (value.length<6) {
      callback('Password must be at least 6 characters!')
    } else if (value.length>24) {
      callback('Password cannot be longer than 24 characters!')
    } else {
      callback()
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className="signup-form">
        <div className="signup-form-icon">
        <Icon type="twitter" style={{ fontSize: '50px', color: '#08c' }} />
        <p className="signup-form-p">Create your account</p>
        </div>

        <Form.Item label={
            <span>
              Username&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }>
          {getFieldDecorator('username', {
            rules: [
              {
                validator: this.validateUsername
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                validator: this.validatePassword
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            validateFirst: true,
            rules: [
              {
                validator: this.validatePassword
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            validateFirst: true,
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
              {
                validator: this.validateEmail
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label={"First Name"}>
          {getFieldDecorator('firstname', {
            rules: [{ required: true, message: 'Please input first name!', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label={"Last Name"}>
          {getFieldDecorator('lastname', {
            rules: [{ required: true, message: 'Please input your last name!', whitespace: true }],
          })(<Input />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'true',
          })(
            <Checkbox defaultChecked={true}>
              <Button type="link" onClick={readAgreementInfo}>I have read the agreement</Button>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default WrappedRegistrationForm;