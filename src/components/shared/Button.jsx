import { type } from "@testing-library/user-event/dist/type";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import PropTypes from "prop-types";
import React from "react";
// version是btn， btn-primary，btn-secondary中的一个
function Button({ children, version, type, isDisabled }) {
  return (
    <div
      type={type}
      disabled={isDisabled}
      className={`btn
    btn-${version}`}
    >
      {children}
    </div>
  );
}
Button.defaultProps = {
  version: "primary",
  type: "button",
  isDisabled: false,
};
Button.propTyles = {
  children: PropTypes.node.isRequired,
  verison: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
};
export default Button;
