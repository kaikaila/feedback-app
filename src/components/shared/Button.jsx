import { type } from "@testing-library/user-event/dist/type";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import PropTypes from "prop-types";
import React from "react";
// version是btn， btn-primary，btn-secondary中的一个
function Button({ children, version, type, isDisabled }) {
  return (
    //这里犯的错误是，把<button>写成了<div>.type 和 disabled 是 HTML 按钮的属性，使用了 <div>的时候，这些属性在 <div> 上是无效的。
    <button
      type={type}
      disabled={isDisabled}
      className={`btn
    btn-${version}`}
    >
      {children}
    </button>
  );
}
Button.defaultProps = {
  version: "primary",
  type: "button",
  isDisabled: false,
};
Button.propTypes = {
  children: PropTypes.node.isRequired,
  verison: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
};
export default Button;
