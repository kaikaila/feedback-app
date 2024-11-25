import React from "react";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default FeedbackItem;

function FeedbackItem({ item, handleDelete }) {
  // const [rating, setRating] = useState(7);
  // const [text, setText] = useState("this is an example of a feedback item.");
  // const handleClick = () => {
  //   setRating((prev) => {
  //     return prev + 1;
  //   });
  //   };

  return (
    <div className="card">
      <div className="num-display">{item.rating}</div>
      <button
        onClick={() => {
          handleDelete(item.id);
        }}
        className="close"
      >
        <FaTimes color="purple" />
      </button>
      <div className="text-display">{item.text}</div>
      {/* <button onClick={handleClick}>Click</button> */}
    </div>
  );
}
