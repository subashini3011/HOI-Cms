import React, { Component } from 'react';

import { withRouter } from 'react-router';

// components
import { Form, Input, Button, Checkbox } from 'components/ui';

// images
import USER from 'images/user.png';
import PASSWORD from 'images/password.png';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginSucess: true
    };
  }

  componentDidMount() {
    sessionStorage.clear();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isLoginSucess: true });
    this.props.form.validateFields((err, values) => {
      const data = {
        type: 'Form',
        user_name: values.userName,
        password: values.password
      };
      if (!err) {
        setTimeout(() => {
          values.host = window.location.origin;
          if (values.remember) {
            const data = {
              userName: values.userName,
              password: values.password
            };
            // localStorage.setItem('loginInfo', JSON.stringify(data));
            // cookies.set("userName", values.userName.trim(), { path: "/" });
            // cookies.set("password", values.password.trim(), { path: "/" });
          }
          if (this.props.handleLogin) {
            this.props.handleLogin(data);
          }
        }, 500);
        // values.host = window.location.origin;
        // if (values.remember) {
        //   const data = {
        //     userName: values.userName,
        //     password: values.password
        //   };
        //   loginStorage.setItem("loginInfo", JSON.stringify(data));
        // } else {
        //   const data = {
        //     userName: "",
        //     password: ""
        //   };
        //   loginStorage.setItem("loginInfo", JSON.stringify(data));
        // }
        // if (this.props.handleLogin) {
        //   this.props.handleLogin(data);
        // }
      }
    });
  };

  openModal = () => {
    this.props.showModal();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    // const userName = cookies? cookies.get('userName') : undefined
    const userLoginData = JSON.parse(localStorage.getItem('loginInfo'));
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          <div className="login__formtext">Username</div>
          {getFieldDecorator('userName', {
            initialValue:
              userLoginData && userLoginData.email
                ? userLoginData.email
                : undefined,
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={
                <img
                  src={USER}
                  style={{ marginBottom: 6, marginRight: 38 }}
                   alt="user"
                />
              }
              placeholder="Username"
            />
          )}
        </Form.Item>

        <Form.Item>
          <div className="login__formtext">Password</div>
          {getFieldDecorator('password', {
            initialValue:
              userLoginData && userLoginData.password
                ? userLoginData.password
                : undefined,
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={
                <img
                  src={PASSWORD}
                  style={{ marginBottom: 6 }}
                  alt="password"
                />
              }
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'notchecked',
            initialValue: false
          })(
            <Checkbox className="login__keepsignin">Keep me signed in</Checkbox>
          )}
          <Button
            className="login__forgotpassword"
            onClick={this.props.showModal}
          >
            Forgot password?
          </Button>

          <div className="login__button">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              LOGIN
            </Button>
          </div>
        </Form.Item>
      </Form>
    );
  }
}
const WrappedLoginForm = Form.create()(LoginForm);

export default withRouter(WrappedLoginForm);
