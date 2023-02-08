import { CSSProperties, useEffect, useRef } from "react";

const DialogStyle: CSSProperties = {
  position: "absolute",
  top: "0px",
  left: "0px",

  width: "200px",
  height: "400px",
  backgroundColor: "grey",
  borderRadius: "20px",

  padding: "20px",

  transition: "all 0.5s",
};

const Confirm = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      if (ref.current) {
        ref.current.style.top = `${Math.random() * 1200}px`;
        ref.current.style.left = `${Math.random() * 1200}px`;
      }
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div style={DialogStyle} ref={ref}>
      <h3>This is a test confirm dialog.</h3>
      <h4>Are you understand?</h4>
    </div>
  );
};

export default Confirm;
