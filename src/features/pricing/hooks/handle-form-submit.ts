import axios from "axios";
import { useState } from "react";

export interface IFormData {
  name: string;
  email: string;
  message: string;
}

/* function to  validate email */
const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const useHandleFormSubmit = () => {
  const [showError, setShowError] = useState("");

  const postData = (data: IFormData) => {
    const url = "https://forms.maakeetoo.com/formsdata/192";

    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",

          //   "access code": "0XYFL03G0CMC9CIAE6OSC7ATM",
        },
      })
      .then((res) => console.log(res))
      .catch((err) => setShowError("something went wrong"));
  };

  const handleSubmit = (props: IFormData) => {
    const { email } = props;

    for (let field of Object.keys(props)) {
      if (!props[field.trim() as keyof IFormData]) {
        setShowError(`Please fill out the ${field} field.`);
        return;
      }
      if (!validateEmail(email.trim())) {
        setShowError("Please enter a valid email address.");
        return;
      }
    }

    setShowError("");

    postData(props);
  };

  return {
    handleSubmit,
    showError,
    setShowError,
  };
};
