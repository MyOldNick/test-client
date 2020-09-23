import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

export default function Main(props) {
  const { addCounter, block, count, timer, role } = props;

  return (
    <Container style={{ width: "1000px" }} className="mt-5 pt-5">
      <div>{timer !== 0 ? <h2 className='text-center'>Доступно через {timer}</h2> : <h2 className='text-center'>Нажми</h2>}</div>
      <div className="d-flex justify-content-between mt-5">
        <div>
          {block ? (
            <Button disabled>Кнопка 1</Button>
          ) : (
            <Button onClick={() => addCounter("buttonOne")}>Кнопка 1</Button>
          )}
          <p className="pt-3">Нажато {count.buttonOne}</p>
        </div>
        <div>
          {block ? (
            <Button disabled>Кнопка 2</Button>
          ) : (
            <Button onClick={() => addCounter("buttonTwo")}>Кнопка 2</Button>
          )}
          <p className="pt-3">Нажато {count.buttonTwo}</p>
        </div>
        <div>
          {block ? (
            <Button disabled>Кнопка 3</Button>
          ) : (
            <Button onClick={() => addCounter("buttonThree")}>Кнопка 3</Button>
          )}
          <p className="pt-3">Нажато {count.buttonThree}</p>
        </div>
      </div>
      {role === "admin" ? <Link to='/admin'>ОДМИН ПОНЕЛЬ</Link> : undefined}
    </Container>
  );
}
