import { Children, useState } from "react";
import {
  Caption,
  Heading,
  IPricingCard,
  PricingCard,
} from "../features/pricing";
import Form from "react-bootstrap/Form";

const cardContent: IPricingCard[] = [
  {
    title: "Free",
    price: 0,
    services: [
      "10 users included",
      "2 GB of storage",
      "Email support",
      "Help center access",
    ],
    buttonText: "Sign up for free",
    isOutline: true,
    maxUsers: 10,
    minUsers: 0,
  },
  {
    title: "Pro",
    price: 15,
    services: [
      "20 users included",
      "10 GB of storage",
      "Priority email support",
      "Help center access",
    ],
    buttonText: "Get started",
    isOutline: false,
    maxUsers: 20,
    minUsers: 11,
  },
  {
    title: "Enterprise",
    price: 29,
    services: [
      "30 users included",
      "15 GB of storage",
      "Phone and email support",
      "Help center access",
    ],
    buttonText: "Contact us",
    isOutline: false,
    maxUsers: 30,
    minUsers: 21,
  },
];

const Pricing = () => {
  const [userRange, setUserRange] = useState(0);
  return (
    <div style={{ textAlign: "center" }}>
      <Heading />
      <Caption />
      <>
        <Form.Label>User range {userRange}</Form.Label>
        <Form.Range
          value={userRange}
          onChange={(e) => setUserRange(Number(e.target.value))}
          min={0}
          max={30}
        />
      </>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {Children.toArray(
          cardContent.map((card) => (
            <PricingCard
              title={card.title}
              price={card.price}
              services={card.services}
              buttonText={card.buttonText}
              isOutline={card.isOutline}
              highlight={
                Number(userRange) <= Number(card.maxUsers) &&
                Number(userRange) >= Number(card.minUsers)
              }
            />
          ))
        )}
      </div>
    </div>
  );
};
export default Pricing;
