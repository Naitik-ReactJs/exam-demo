import { Fragment } from "react";

const Form = ({
  handleSubmit,
  inputFields,
  handleRadioChange,
  selectedRole,
}) => {
  return (
    <>
      {" "}
      <div>
        <form onSubmit={handleSubmit}>
          {inputFields.map((item, index) => {
            return (
              <Fragment key={index}>
                {item.type === "radio" ? (
                  <>
                    <label>{item.role}</label>
                    <label key={item.id} className="p-2 mb-4" htmlFor={item.id}>
                      <input
                        id={item.id}
                        checked={selectedRole === item.id}
                        value={item.id}
                        type={item.type}
                        onChange={handleRadioChange}
                        className={item.className}
                      />

                      {item.label}
                    </label>
                  </>
                ) : (
                  <input
                    className={item.className}
                    type={item.type}
                    name={item.name}
                    placeholder={item.placeholder}
                    onChange={item.onChange}
                  />
                )}
                {item.formErrors && (
                  <div
                    key={index}
                    className="alert alert-danger m-3 border text-center p-2"
                    role="alert"
                  >
                    {item.formErrors}
                  </div>
                )}
              </Fragment>
            );
          })}
        </form>
      </div>
    </>
  );
};

export default Form;
