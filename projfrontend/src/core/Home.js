import React from "react";
import "../styles.css";

import Base from "./Base";
import App from "./WpmCalculator";
export default function Home() {
  
  return (
    <Base>
     <div className="row text-center">
        <div className="row ">
           <App />
        </div>
      </div>
    </Base>
  );
}
