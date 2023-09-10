import { FC } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const UserCard: FC<any> = (props) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props?.profile_picture} />
      <Card.Body>
        <Card.Title>
          {props?.first_name} {props?.last_name}
        </Card.Title>
        <Card.Text>{props?.phone}</Card.Text>

        <Button variant="primary">Know more</Button>
      </Card.Body>
    </Card>
  );
};
