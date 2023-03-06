import React from "react";
import Menu from "./Menu";
const Base = ({
  title = "WPM",
  description = "Welcome to my typing speed app!",
  className = " text-white  p-4 ",
  children
}) => (
  <div>
    <Menu/>
    <div className="container-fluid ">
      <div className="jumbotron bg-dark text-white text-center m-3">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
   
      <div className="container-fluid bg-success text-white text-center py-3 footer">
        <h4>If you got any questions, feel free to reach out!</h4>
        <p className="p-3">email: info@wpm.in</p>
      </div>
   
    </div>
  
);

export default Base;
