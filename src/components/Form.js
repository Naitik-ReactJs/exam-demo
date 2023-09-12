import React, { Fragment, useState } from "react";

const Form = () => {
  const [checked, setChecked] = useState(false);
  const [response, setResponse] = useState();
  const input = [
    {
      label: "Name",
      type: "text",
      name: "username",
      placeholder: "Enter your name",
      className: "form-control",
      heading: "details",
    },
    {
      label: "Email",
      type: "text",
      name: "email",
      placeholder: "Enter your email",
      className: "form-control",
      heading: "details",
    },

    {
      label: "Current state",
      type: "text",
      name: "current_state",
      placeholder: "Enter your Current state",
      className: "form-control",
      heading: "current address",
    },
    {
      label: "Current city",
      type: "text",
      name: "current_city",
      placeholder: "Enter your Current city",
      heading: "current address",
      className: "form-control",
    },
    {
      label: "Permanent state",
      type: "text",
      name: "permanent_state",
      placeholder: "Enter your Permanent state",
      className: "form-control",
      heading: "permanent address",
      disabled: checked,
    },
    {
      label: "Permanent city",
      type: "text",
      name: "permanent_city",
      placeholder: "Enter your Permanent city",
      className: "form-control",
      heading: "permanent address",
      disabled: checked,
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
      heading: "credit card detail",
      className: "form-control",
    },
    {
      label: "Credit card cvv",
      name: "card_cvv",
      type: "text",
      placeholder: "Enter your card cvv",
      heading: "credit card detail",
      className: "form-control",
    },
    {
      label: "Credit card exp.",
      name: "card_exp",
      type: "text",
      placeholder: "Enter your card exp",
      heading: "credit card detail",
      className: "form-control",
    },
  ];
  const [formData, setFormData] = useState(input.map((value) => value.name));

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
  const handleSubmit = (e) => {
    e.preventDefault();
    const personal_details = {};

    input.forEach((item) => {
      if (formData[item.name]) {
        if (!personal_details[item.heading]) {
          personal_details[item.heading] = {};
        }
        personal_details[item.heading][item.label] = formData[item.name];
      }
      setResponse(personal_details);
    });
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
      <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
        Submit
      </button>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
};

export default Form;
