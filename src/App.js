import { useState } from "react";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackData from "./data/FeedbackData";

function App() {
  const [feedback, setFeedback] = useState(FeedbackData);

  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      // .filter 是一个high order function
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // JSX expressions must have one parent element.
  // if we need to return multiple elements, wrap them in one parent element
  return (
    <>
      {/* 在下一句中，text就是一个prop，本质上是传入component的一个参数，text同事被赋值为‘Hello World’ */}
      <Header bgColor="blue" textColor="yellow" />
      <div className="container">
        {/* {}是用来存放variable的 */}
        <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
      </div>
    </>
  );
}
export default App;
