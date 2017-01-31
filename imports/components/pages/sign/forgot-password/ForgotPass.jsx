import React, { Component } from 'react';
import { FlowRouter } from '.meteor/kadira:flow-router';
import {Accounts} from 'meteor/accounts-base';
import VkBtn from '../../../btn-vk/VkBtn.jsx';

/* Semantic UI */
import { Form, Input } from 'semantic-ui-react';

export default class ForgotPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e, { formData }) {
    e.preventDefault();
  }

    signIn() {
        // const {email} = this.state;

        console.log(this.state);
        // Accounts.forgotPassword({email: email.toLowerCase().trim()}, error => {
        //     if (error) {
        //         // this.props.addError(error.reason);
        //     } else {
        //         // this.props.addError('Check your email inbox');
        //         // this.props.closeModal();
        //     }
        // });
    }
  render() {
    const { email } = this.state;
    return (
      <div className="signin">
        <div className="card card_login">
          <div className="login-form">
            <div className="login-item"> 
              <h4 className="headline-login">Войти</h4>
            </div>
            <div className="login-item-separator">
              <div className="login-item-separator__text">или</div>
            </div>
            <Form size={'tiny'} onSubmit={this.handleSubmit}>
              <div className="login-item">
                  <input
                      type='email'
                      placeholder='Your email address'
                      onChange={e => this.setState({email: e.target.value})}
                      onKeyDown={e => {
                          if (e.keyCode === 13) this.signIn();
                      }}
                  />
              </div>
              <div className="login-item">
                  <button className="simple-btn simple-btn_blue" onClick={this.signIn}>Войти</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

ForgotPass.propTypes = {
  // layout: React.PropTypes.string,
};
