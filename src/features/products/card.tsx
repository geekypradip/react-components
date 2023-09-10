import { FC } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const ProductCard: FC<any> = (props) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={props?.images?.at(0)}
        style={{ height: "50%" }}
      />
      <Card.Body>
        <Card.Title>{props?.title}</Card.Title>
        <Card.Text>{props?.description}</Card.Text>
        <Button variant="primary">Know more</Button>
      </Card.Body>
    </Card>
  );
};
