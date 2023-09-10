import { Children, FC, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FormModal } from "../modal";
export interface IPricingCard {
  title: string;
  price: number;
  services: string[];
  buttonText: string;
  isOutline: boolean;
  maxUsers?: number;
  minUsers?: number;
  highlight?: boolean;
}
export const PricingCard: FC<IPricingCard> = (props) => {
  const [modalOpen, setModalOpen] = useState("");

  /**function  to handle modal open */
  const handleButtonClick = () => setModalOpen(props.buttonText);

  return (
    <>
      <Card
        style={{
          width: "350px",
          textAlign: "center",
          margin: 10,
          boxShadow: props.highlight
            ? "2px 2px 2px 1px rgba(77, 75, 75, 0.2)"
            : "none",
          background: props.highlight ? "rgba(4, 32, 245, 0.081)" : "none",
        }}
      >
        <Card.Header
          style={{
            backgroundColor: "#F7F7F7",
            margin: 0,
            fontWeight: 600,
            fontSize: "1.5rem",
          }}
        >
          {props.title}
        </Card.Header>
        <Card.Body>
          <h1>
            ${props.price} <span style={{ color: "GrayText" }}>/ mo</span>
          </h1>
          <div style={{ marginBottom: "20px" }}>
            {Children.toArray(
              props.services.map((service) => (
                <Card.Text style={{ margin: 0 }}>{service}</Card.Text>
              ))
            )}
          </div>

          <Button
            variant={props.isOutline ? "outline-primary" : "primary"}
            style={{ width: "100%", fontWeight: 600, padding: 10 }}
            onClick={handleButtonClick}
          >
            {props.buttonText}
          </Button>
        </Card.Body>
      </Card>

      {/* modal */}

      {Boolean(modalOpen) && (
        <FormModal
          heading={modalOpen}
          onClose={() => setModalOpen("")}
          onSave={() => {}}
        />
      )}
    </>
  );
};
