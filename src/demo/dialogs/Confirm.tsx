import { CSSProperties } from "react";

const DialogStyle: CSSProperties = {
  position: "absolute",
  top: "100px",
  left: "100px",
  
  width: "200px",
  height: "400px",
  backgroundColor: "grey",
  borderRadius: "20px",

  padding: "20px",
};

const Confirm = () => (
  <div style={DialogStyle}>
    <h3>This is a test confirm dialog.</h3>
    <h4>Are you understand?</h4>
  </div>
);

export default Confirm;
