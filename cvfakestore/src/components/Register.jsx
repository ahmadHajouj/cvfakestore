import React, { Component } from 'react';
import Joi from 'joi-browser';
import * as userService from '../service/userService';
import auth from '../service/authService';
import { Button, Form } from 'react-bootstrap';
import { makeCart } from '../service/cartsService';

class Register extends Component {

    state = {
        data : { email : "", username : "",  password : "" },
        errors : {},
         
    }

    
  schema = {
      email: Joi.string()
        .email()
        .required()
        .label("Email"),
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
  };

  
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
      const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange({ currentTarget: input }){
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = { ...this.state.data}
        data[input.name] = input.value

        this.setState({ data, errors });
    }

    handleSubmit = async e => {
        e.preventDefault();

        let errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
        try {
            const response = await userService.register(this.state.data);
            auth.loginWithJwt(response.headers["x-auth-token"]);
            makeCart({ userId : response.data._id });
            window.location = "/";
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
    }

    render() {
        return (
            <div>
                <Form className='main-form' onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3 textbox-form" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name='email'
                            value={this.state.email}
                            onChange={this.handleChange}
                            isInvalid={this.state.errors.email}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {this.state.errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3 textbox-form" controlId="formBasicUser">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            name='username'
                            value={this.state.username}
                            onChange={this.handleChange}
                            isInvalid={this.state.errors.username}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {this.state.errors.username}
                        </Form.Control.Feedback>
                        
                    </Form.Group>
                    <Form.Group className="mb-3 textbox-form" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            name='password'
                            value={this.state.password}
                            onChange={this.handleChange}
                            isInvalid={this.state.errors.password}
                         />
                         <Form.Control.Feedback type='invalid'>
                            {this.state.errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="success" disabled={this.validate()} className='btn-form' type='submit'>
                        Register
                    </Button>
                </Form>
            </div>

        );
    }
}

export default Register;