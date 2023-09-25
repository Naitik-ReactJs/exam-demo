// Notes.js
import React from "react";
import Button from "../../reusable/Button";

const Notes = ({
  addNotes,
  handleAddNotes,
  handleDeleteNotes,
  notesText,
  notesError,
  currentQuestionIndex,
  handleNotesChange
}) => {


  return (
    <div>
      <label>Notes:</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter notes at last question"
        value={notesText}
        disabled={currentQuestionIndex !== 14}
        name="notes"
        onChange={handleNotesChange}
      />
      {notesError && (
        <div className="alert text-center alert-danger w-75 mt-4">
          {notesError}
        </div>
      )}
      <Button
        className="btn btn-primary mt-2"
        disabled={currentQuestionIndex !== 14}
        buttonText={"Add note"}
        onClick={handleAddNotes}
      />
      {addNotes &&
        addNotes.map((item, index) => {
          return (
            <div key={index} className="mt-2">
              {item}{" "}
              <span>
                <Button
                  className="btn btn-sm mx-2"
                  disabled={currentQuestionIndex !== 14}
                  buttonText={"❌"}
                  onClick={() => handleDeleteNotes(index)}
                />
              </span>{" "}
            </div>
          );
        })}
    </div>
  );
};

export default Notes;
