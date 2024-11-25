import React from "react";
import PropTypes from "prop-types";

//一种方式是prop，下方要用时写prop.text
//另一种方式是解构prop

function Header({ text, bgColor, textColor }) {
  const styleHeader = {
    backgroundColor: bgColor,
    color: textColor,
  };

  return (
    <header style={styleHeader}>
      <div>
        <h2>{text}</h2>
      </div>
    </header>
  );
}

Header.defaultProps = {
  text: "Feedback UI",
  bgColor: "rgba(0,0,0,0.4)",
  textColor: "#ff6a95",
};
// 注意大小写
Header.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default Header;
