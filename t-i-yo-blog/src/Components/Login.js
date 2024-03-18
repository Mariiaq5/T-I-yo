import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../Managers/UserProfileManager";

export default function Login({setIsLoggedIn}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login({email, password})
      .then(r =>{
      if(r){
      setIsLoggedIn(true)
      navigate('/')
      }
      else{
        alert("Invalid email or password")
      }
    })
  };

  return (
    <div class = "container col-4 text-center">
      <div>
        <h2>Please login</h2>
    <Form onSubmit={loginSubmit}>
      <fieldset>
        <FormGroup>
          <Label for="email">Email address</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Login</Button>
        </FormGroup>
        <em>
          Don't have an account? <Link to="/register">Register here</Link>
        </em>
      </fieldset>
    </Form>
    </div>
    </div>
  );
}