import Button from "./Button";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const DialogBox = ({
  title,
  body,
  show,
  handleClose,
  action,
  buttonText1,
  buttonText2,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title} </Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button
          onClick={action}
          buttonText={buttonText1}
          className="btn btn-outline-danger text-dark"
        />
        <Button
          onClick={handleClose}
          buttonText={buttonText2}
          className="btn btn-outline-primary text-dark"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default DialogBox;
