import React from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import { useState, useContext, useEffect } from "react";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  // FeedbackEdit is an object
  const { addFeedback, FeedbackEdit, closeEditFeedback, updateFeedback } =
    useContext(FeedbackContext);
  // 如果[] 里面填了东西，[]里的东西一变，useEffect就会跑
  // 如果[]里面是空的，那么useEffect只在加载时跑一次
  useEffect(() => {
    if (FeedbackEdit.edit === true) {
      setBtnDisabled(false);
      setText(FeedbackEdit.item.text);
      setRating(FeedbackEdit.item.rating);
    }
  }, [FeedbackEdit]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const handleTextChange = (e) => {
    if (text === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setMessage("Text must be at least 10 characters");
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
    setText(e.target.value);
    console.log("handleTextChange is working");
  };

  const handleSubmit = (e) => {
    // default是submit to a file
    e.preventDefault();
    if (text.trim().length > 10) {
      //本来这里要写text：text， rating：rating，可省略为以下
      const newFeedback = { text, rating };
      console.log("handleSubmit is working");
      console.log("newFeedback");
      if (FeedbackEdit.edit === true) {
        updateFeedback(FeedbackEdit.item.id, newFeedback);
        closeEditFeedback(FeedbackEdit);
      } else {
        addFeedback(newFeedback);
      }
      setText("");
    }
  };

  return (
    <Card>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Form submitted");
          handleSubmit(e);
        }}
      >
        {" "}
        <h2>How would you rate your service with us?</h2>
        {/* to do - rating select component */}
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button
            type="submit"
            isDisabled={btnDisabled}
            onClick={() => console.log("Button clicked")}
          >
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
