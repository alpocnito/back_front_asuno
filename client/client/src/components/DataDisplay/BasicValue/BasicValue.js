import React from "react";
import "./styles.css";

const BasicButton = (props) => {
  return (
    <div id="DIV_1">
      <div id="DIV_2"></div>

      <div id="DIV_11">
        <div id="DIV_12">{props.name}</div>
        <div id="DIV_9">
          <div id="A_10">{props.value}</div>
        </div>
      </div>
    </div>
  );
};

export default BasicButton;
