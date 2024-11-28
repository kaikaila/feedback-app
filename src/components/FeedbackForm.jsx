import React from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import { useState, useContext } from "react";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  const { addFeedback } = useContext(FeedbackContext);

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
      addFeedback(newFeedback);
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
