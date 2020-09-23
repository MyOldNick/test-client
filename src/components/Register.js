import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";

import {API} from '../API'

export default function Register() {
  const [create, setCreate] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [login, setLogin] = useState();

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const changeLogin = (event) => {
    setLogin(event.target.value);
  };

  const handleSubmit = (event) => {
    axios
      .post(`${API}/register`, {
        login: login,
        email: email,
        password: password,
      })
      .then((res) => {
        res.status === 200 ? setCreate(true) : console.log("error");
      })
      .catch((err) => console.log(err));
    event.preventDefault();
  };

  return (
    <Container style={{ width: "300px" }} className="mt-5 pt-5 ">
      {create ? (
        <div>Аккаунт создан, можете <Link to='/'>Войти</Link></div>
      ) : (
        <Fragment>
          <Form className="mt-5" onSubmit={handleSubmit}>
            <Form.Label>Логин</Form.Label>
            <FormControl
              type="text"
              placeholder="Login"
              value={login}
              onChange={changeLogin}
            />
            <Form.Label>Email</Form.Label>
            <FormControl
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={changeEmail}
            />

            <Form.Label>Пароль</Form.Label>
            <FormControl
              type="password"
              placeholder="Password"
              value={password}
              onChange={changePassword}
            />
            <Button className='mt-2' variant="primary" type="submit">
              Создать аккаунт
            </Button>
          </Form>
          <div className="mt-2 d-flex">
            <p>Есть аккаунт?</p>{" "}
            <Link className="ml-2" to="/">
              Войти
            </Link>
          </div>
        </Fragment>
      )}
    </Container>
  );
}
