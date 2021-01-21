import './index.scss';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// constants
import { pathConstants } from 'constants/path-constants';

// components
import { Row, Col, message, Modal, Form, Input, Button } from 'components/ui';
import WrappedLoginForm from 'components/forms/loginForm';

import { withRouter } from 'react-router';
import LOGO from 'images/logo-large.png';
import * as User from '../../shared/app-data/user';

// images
import { login, forgotPassword } from '../../redux/actions/loginActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    // const userInfo = sessionStorage.getItem("userInfo");
    const userInfo = User.getUserData();
    const { history } = this.props;
    if (userInfo && userInfo.id) {
      // history.push(pathConstants.DASHBOARD);
      history.push(pathConstants.DASHBOARD);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loginResponse, forgotPasswordResponse } = this.props;
    if (nextProps.loginResponse && nextProps.loginResponse !== loginResponse) {
      if (
        nextProps.loginResponse.error === 0 &&
        nextProps.loginResponse.content
      ) {
        const userData = nextProps.loginResponse.content;
        if (
          userData.role !== 'User' &&
          userData.role !== 'Store Incharge'
          // && userData.role !== "Store Supervisor"
        ) {
          const { history } = this.props;
          User.setUserData(userData);
          message.success('Logged in Successfully');
          history.push(pathConstants.DASHBOARD);
        } else {
          message.error('Access Denied');
        }
      } else {
        message.error(nextProps.loginResponse.message);
      }
    }

    if (
      nextProps.forgotPasswordResponse &&
      nextProps.forgotPasswordResponse !== forgotPasswordResponse
    ) {
      if (
        nextProps.forgotPasswordResponse.error === 0 &&
        nextProps.forgotPasswordResponse
      ) {
        message.success('New password is sent to your email address');
      } else {
        message.error(nextProps.forgotPasswordResponse.message);
      }
    }
  }

  handleLogin = data => {
    const { login } = this.props;
    login(data);
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleForgotpassword = e => {
    e.preventDefault();
    const { form, forgotPassword } = this.props;
    form.validateFields((err, values) => {
      if (!err) {

        const data = {
          email: values.email
        };

        forgotPassword(data);
        form.resetFields();
        this.setState({
          visible: false
        });
      }
    });
  };

  handleCancel = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible } = this.state;
    const { form } = this.props;

    return (
      <div className="login">
        <div className="login__container">
          <Row>
            <Col className="login__formwrapper">
              <div className="login__formwrapper__form">
                <div className="login__logo">
                  <img src={LOGO} className="login__logo" alt="logo" />
                </div>
                <div className="login__text"></div>
                <div className="login__subtext">Happy to see you again!</div>
                <WrappedLoginForm
                  handleLogin={this.handleLogin}
                  showModal={this.showModal}
                />
              </div>
            </Col>
          </Row>
                  </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    loginResponse: state.login.loginResponse,
    forgotPasswordResponse: state.login.forgotPasswordResponse
  };
}

export default connect(
  mapStateToProps,
  {
    login,
    forgotPassword
  }
)(withRouter(Form.create()(Login)));

Login.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    resetFields: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired
  }).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,

  loginResponse: PropTypes.arrayOf(PropTypes.any),
  forgotPasswordResponse: PropTypes.arrayOf(PropTypes.any),
  login: PropTypes.func.isRequired,
  forgotPassword: PropTypes.arrayOf(PropTypes.any)
};

Login.defaultProps = {
  // history: PropTypes.Object
  loginResponse: [],
  forgotPasswordResponse: []
};
