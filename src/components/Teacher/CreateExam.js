import React, { Fragment, useState } from "react";
import Button from "../../reusable/Button";
import "../../App.css";
import { createExamInput } from "../../utils/Input";
const CreateExam = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
  };
  let answer = "";
  const [inputData, setInputData] = useState({
    ans1: "",
    ans2: "",
    ans3: "",
    ans4: "",
  });

  const { ans1, ans2, ans3, ans4 } = inputData;

  const input = createExamInput(ans1, ans2, ans3, ans4);
  const handleOnChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    setInputData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="">
      {" "}
      <div className="container exam-container m-5">
        {input.map((item, index) => (
          <Fragment key={index}>
            {item.type === "radio" ? (
              <div key={item.id}>
                <input
                  id={item.id}
                  type="radio"
                  value={item.id}
                  name="question"
                  className="me-3"
                  checked={selectedValue === item.id}
                  onChange={handleRadioChange}
                />
                <label htmlFor={item.id}>
                  <input
                    type="text"
                    name={`${item.id}`}
                    onChange={handleOnChange}
                    className="form-control mb-3"
                  />
                </label>
                <br />
              </div>
            ) : (
              <div>
                {item.label} :{" "}
                <input
                  type={item.type}
                  name={item.name}
                  className="form-control mb-4"
                />
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <div className="text-start pe-5 me-5">
        <div>
          Answer:{" "}
          {input.map((item) =>
            Object.keys(inputData).map((value) => {
              if (value === item.id && value === selectedValue) {
                answer = answer + item.value;
              } else {
                answer = "";
              }
              return answer;
            })
          )}
        </div>
        <div className="button-container">
          <Button className={"btn btn-dark 3"} buttonText={"Next"} />
          <Button className={"btn btn-dark 3"} buttonText={"Previous"} />
          <Button className={"btn btn-dark 3"} buttonText={"Submit"} />
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
