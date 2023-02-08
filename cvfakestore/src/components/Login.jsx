import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import Joi from 'joi-browser';
import auth from '../service/authService';

class Login extends Component {

    state = {
        data : { email : "", password : "" },
        errors : {},
         
    }

    
    schema = {
        email: Joi.string()
            .email()
            .required()
            .label("Email"),
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

    handleSubmit = async e => {
        e.preventDefault();

        let errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
        try {
            const { data } = this.state;
            await auth.login(data.email, data.password);
    
           // const { state } = this.props.location;
            window.location = /*state ? state.from.pathname :*/ "/";
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
            errors = { ...this.state.errors };
            errors.email = ex.response.data;
            console.log(errors);
            this.setState({ errors });
            }
        }
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

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <Form className='main-form' onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3 textbox-form" controlId="formBasicEmail">
                    <Form.Label>Email address or Username</Form.Label>
                    <Form.Control type="email"
                            placeholder="Enter email"
                            name='email'
                            value={this.state.email}
                            onChange={this.handleChange}
                            isInvalid={this.state.errors.email}  />
                            <Form.Control.Feedback type='invalid'>
                                {this.state.errors.email}
                            </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3 textbox-form" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
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
                <Button variant="success" type="submit" className='btn-form'>
                    Login
                </Button>
                
            </Form>
        );
    }
}

export default Login;