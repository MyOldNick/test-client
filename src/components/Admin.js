import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Row, Col } from "react-bootstrap";

import { API } from "../API";

export default function Admin() {
  const [users = [], setUsers] = useState();

  useEffect(() => {
    if(users.length <= 0) {
        axios.get(`${API}/users`).then((res) => setUsers(res.data));
    }
  });

  const deleteUser = (user) => {
    const newUsers = users.filter(el => el._id != user._id)
    console.log(newUsers)
    setUsers(newUsers)
    axios
      .put(`${API}/delete`, {
        id: user._id,
      })
      .then((res) => console.log(res.data));
  };

  return (
    <Container style={{ width: "1000px" }} className="shadow mt-5 pb-5 pt-4">
      <h2 className="text-center">Админ панель</h2>
      {users.length > 0
        ? users.map((el) => (
            <Container
              style={{ width: "90%", height: "70px" }}
              className="pt-4"
              key={el._id}
            >
              <Row>
                <Col>
                  <p>
                    <strong>Логин:</strong> {el.login}
                  </p>
                </Col>
                <Col>
                  <p>
                    <strong>Кнопка 1:</strong> {el.count.buttonOne}
                  </p>
                </Col>
                <Col>
                  <p>
                    <strong>Кнопка 2:</strong> {el.count.buttonTwo}
                  </p>
                </Col>
                <Col>
                  <p>
                    <strong>Кнопка 3:</strong> {el.count.buttonThree}
                  </p>
                </Col>
                <Col>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteUser(el)}
                  >
                    Удалить
                  </Button>
                </Col>
              </Row>
            </Container>
          ))
        : undefined}
    </Container>
  );
}
