import React, { Fragment, useState } from "react";

const Form = () => {
  const input = [
    {
      label: "Name",
      type: "text",
      name: "username",
      placeholder: "Enter your name",
      className: "form-control",
    },
    {
      label: "Email",
      type: "text",
      name: "email",
      placeholder: "Enter your email",
      className: "form-control",
    },

    {
      label: "Current state",
      type: "text",
      name: "current_state",
      placeholder: "Enter your Current state",
      className: "form-control",
    },
    {
      label: "Current city",
      type: "text",
      name: "current_city",
      placeholder: "Enter your Current city",
      className: "form-control",
    },
    {
      label: "Permanent state",
      type: "text",
      name: "permanent_state",
      placeholder: "Enter your Permanent state",
      className: "form-control",
    },
    {
      label: "Permanent city",
      type: "text",
      name: "permanent_city",
      placeholder: "Enter your Permanent city",
      className: "form-control",
    },
    {
      label: "Permanent address same as current?",
      type: "checkbox",
      className: "mb-4 ms-2",
    },
    {
      label: "Credit card number",
      type: "text",
      name: "card_number",
      placeholder: "Enter your card number",
      className: "form-control",
    },
    {
      label: "Credit card cvv",
      name: "card_cvv",
      type: "text",
      placeholder: "Enter your card cvv",
      className: "form-control",
    },
    {
      label: "Credit card exp.",
      name: "card_exp",
      type: "text",
      placeholder: "Enter your card exp",
      className: "form-control",
    },
  ];
  const [formData, setFormData] = useState(input.map((value) => value.name));
  const {
    username,
    email,
    current_state,
    current_city,
    permanent_state,
    permanent_city,
    card_number,
    card_cvv,
    card_exp,
  } = formData;
  const data = {
    "personal details": {
      username: username,
      email: email,
    },
    "current address": [
      {
        state: current_state,
        city: current_city,
      },
    ],
    "permanent address": [
      {
        state: permanent_state,
        city: permanent_city,
      },
    ],
    "card details": [
      {
        card_number: card_number,
        card_exp: card_exp,
        card_cvv: card_cvv,
      },
    ],
  };
  const handleOnChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  console.log(["personal details"]?.username);
  return (
    <div className="container py-5">
      {input.map((item, index) => {
        return (
          <Fragment key={index}>
            <label> {item.label}</label>
            <input
              type={item.type}
              name={item.name}
              placeholder={item.placeholder}
              className={item.className}
              onChange={handleOnChange}
            />
            <br />
          </Fragment>
        );
      })}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Form;
