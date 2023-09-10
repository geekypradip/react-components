import { ChangeEvent, Children, FC, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { IFormData, useHandleFormSubmit } from "../pricing/hooks";
import { Alert } from "react-bootstrap";

interface IFormModal {
  onClose: () => void;
  heading: string;
  onSave: (data: IFormData) => void;
}

const inputs = [
  {
    label: "Name",
    name: "name",
    type: "text",
    placeholder: "John Smith",
  },
  {
    label: "Email address",
    name: "email",
    type: "email",
    placeholder: "name@example.com",
  },
  {
    label: "Order Comments",
    name: "message",
    type: "textarea",
    placeholder: "Please leave any comments here",
  },
];

export const FormModal: FC<IFormModal> = (props) => {
  //custom hook
  const { handleSubmit, showError, setShowError } = useHandleFormSubmit();
  const formData = useRef<IFormData>({ name: "", email: "", message: "" });

  const handleFormChange = (e: ChangeEvent<any>) => {
    formData.current = {
      ...formData.current,
      [e.target.name]: e.target.value,
    };
  };
  return (
    <>
      <Modal show={true} onHide={props.onClose} centered>
        {/* alert */}
        {showError && (
          <Alert variant="danger" dismissible onClose={() => setShowError("")}>
            <p>{showError}</p>
          </Alert>
        )}
        <Modal.Header closeButton>
          <Modal.Title>{props.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Children.toArray(
              inputs.map((input) => (
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>{input.label}</Form.Label>
                  <Form.Control
                    type={input.type}
                    placeholder={input.placeholder}
                    autoFocus
                    as={input.type === "textarea" ? "textarea" : undefined}
                    name={input.name}
                    onChange={handleFormChange}
                  />
                </Form.Group>
              ))
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit(formData.current);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
