import React, { useState } from "react";

const CreateExam = () => {
  const [selectedAns, setSelectedAns] = useState("");
  const [radioError, setRadioError] = useState(false);
  const radioErrorMessage = "Please select a answers";
  const handleRadioChange = () => {
    setRadioError(false);
  };
  const input = [
    {
      id: "answer1",
      type: "radio",
      onChange: handleRadioChange,
      name: "answers",
    },
    {
      id: "answer2",
      type: "radio",
      onChange: handleRadioChange,
      name: "answers",
    },
    {
      id: "answer3",
      type: "radio",
      onChange: handleRadioChange,
      name: "answers",
    },
    {
      id: "answer4",
      type: "radio",
      onChange: handleRadioChange,
      name: "answers",
    },
  ];

  const inputText = [
    {
      type: "text",
      placeholder: "Enter your answer here",
    },
  ];
  return (
    // <form>
    //   {input.map((item) => {
    //     return (
    //       <>
    //         {" "}
    //         <input
    //           required
    //           id={item.id}
    //           checked={selectedAns === item.id}
    //           value={item.id}
    //           type={item.type}
    //           onChange={handleRadioChange}
    //         />
    //         <div>
    //           {inputText.map((textItem) => {
    //             return (
    //               <>
    //                 <input type={textItem.type} />
    //               </>
    //             );
    //           })}
    //         </div>
    //       </>
    //     );
    //   })}
    //   <div>
    //     {radioError && (
    //       <div
    //         className="alert text-center alert-danger border text-center w-50"
    //         answers="alert"
    //       >
    //         {radioErrorMessage}
    //       </div>
    //     )}
    //   </div>
    //   <div>
    //     <span className="text-danger">{selectedAns}</span>
    //   </div>
    // </form>
    <>
      <form>
        <br />
        <input
          id="ans1"
          type="radio"
          value="1"
          name="question1"
          className="me-3"
        />
        <label for="ans1">
          <input type="text" name="ans1" />
        </label>
        <br />
        <input
          id="ans2"
          type="radio"
          className="me-3"
          value="2"
          name="question1"
        />
        <label for="ans2">
          {" "}
          <input type="text" name="ans1" />
        </label>
        <br />
        <input
          id="ans3"
          type="radio"
          className="me-3"
          value="3"
          name="question1"
        />
        <label for="ans3">
          {" "}
          <input type="text" name="ans1" />
        </label>
        <br />
        <input
          id="ans4"
          type="radio"
          className="me-3"
          value="4"
          name="question1"
        />
        <label for="ans4">
          {" "}
          <input type="text" name="ans1" />
        </label>
        <br />
      </form>
    </>
  );
};

export default CreateExam;
