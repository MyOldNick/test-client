import React, {useState} from "react";
import { Link } from "react-router-dom";
import {  Container, Form, FormControl, Button } from "react-bootstrap";

export default function Auth(props) {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const changeEmail = (event) => {
    setEmail(event.target.value)
  }

  const changePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    console.log(email, password)
    props.auth(email, password)
    event.preventDefault();
  }

  return (
    <Container style={{ width: "300px" }} className="mt-5 pt-5 ">
      <Form className="mt-5" onSubmit={handleSubmit}>
          <Form.Label>Email</Form.Label>
          <FormControl type="email" placeholder="Enter email" value={email} onChange={changeEmail}/>
          <Form.Label>Пароль</Form.Label>
          <FormControl type="password" placeholder="Password" value={password} onChange={changePassword}/>
        <Button variant="primary" type="submit" className="mt-2">
          Войти
        </Button>
      </Form>
      <div className='mt-2 d-flex'>
        <p>Нет аккаунта?</p> <Link className='ml-2' to="/register">Регистрация</Link>
      </div>
    </Container>
  );
}
