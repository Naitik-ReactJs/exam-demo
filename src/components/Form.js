import React, { Fragment, useState } from "react";

const Form = () => {
  const [checked, setChecked] = useState(false);
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
      disabled: checked,
    },
    {
      label: "Permanent city",
      type: "text",
      name: "permanent_city",
      placeholder: "Enter your Permanent city",
      className: "form-control",
      disabled: checked,
    },
    {
      label: "Permanent address same as current?",
      type: "checkbox",
      className: "mb-4 ms-2",
      value: "checked",
      name: "address",
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
  // const {
  //   username,
  //   email,
  //   current_state,
  //   current_city,
  //   permanent_state,
  //   permanent_city,
  //   card_number,
  //   card_cvv,
  //   card_exp,
  // } = formData;

  const handleOnChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    if (target.checked) {
      formData.permanent_city = formData.current_city;
      formData.permanent_state = formData.current_state;
      setChecked(true);
    } else if (!target.checked) {
      setChecked(false);
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

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
              disabled={item.disabled}
            />
            <br />
          </Fragment>
        );
      })}
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
      <pre>
        {JSON.stringify(
          input.map((value) => value.name),
          null,
          2
        )}
      </pre>
    </div>
  );
};

export default Form;
