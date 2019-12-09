/*
 * Shakespeare Quote App
 * Front-end React Component: Post Quote
 * Form that validates data and then posts to the database
 */

import React, { Component } from 'react';
import ButtonForm from '../item-components/ButtonForm';
import { ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import { registerUser } from '../utils/auth';
import './RegisterUser.css';

export default class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetFields = this.resetFields.bind(this);
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    this.setState({ isAuth: newProps.isAuth });
  }

  resetFields() {
    this.setState({
      email: '',
      password: ''
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    registerUser(this.state);
  }

  render() {
    return (
      <div className="homepage">
        <form className="" id="register-user-container" onSubmit={this.handleSubmit} onReset={this.resetFields}>
          <FormGroup controlId="formControlsText" className="form-inner">
            <ControlLabel className="instruction">Register as a user</ControlLabel>
            <div className="form-row">
              <FormGroup className="form-group col-xs-12 col-sm-12 col-md-12">
                <ControlLabel>Email</ControlLabel>
                <HelpBlock id="help-register-email"></HelpBlock>
                <FormControl
                  className="form-control"
                  type="email"
                  name="email"
                  id="register-email"
                  placeholder="something@email.com"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
              </FormGroup>
            </div>
            <div className="form-row">
              <FormGroup className="form-group col-xs-12 col-sm-12 col-md-12">
                <ControlLabel>Password</ControlLabel>
                <HelpBlock id="help-register-password"></HelpBlock>
                <FormControl
                  className="form-control"
                  type="password"
                  name="password"
                  id="register-password"
                  placeholder="**********"
                  onChange={this.handleChange}
                  value={this.state.quote}
                />
              </FormGroup>
            </div>
            <div className="form-row post-buttons col-xs-12 col-sm-12 col-md-12">
              <ButtonForm type="submit" label="Register" className="form-button submit-button" />
              <ButtonForm type="reset" label="Reset" className="form-button reset-button" />
            </div>
          </FormGroup>
        </form>
      </div>
    );
  }
}
