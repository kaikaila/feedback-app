import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackData from "./data/FeedbackData";
import FeedbackStats from "./components/FeedbackStats";

import FeedbackForm from "./components/FeedbackForm";
import { FeedbackProvider } from "./context/FeedbackContext";
import AboutPage from "./pages/AboutPage";

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
    <FeedbackProvider>
      <Router>
        {/* 在下一句中，text就是一个prop，本质上是传入component的一个参数，text同事被赋值为‘Hello
      World’
      <Header bgColor="blue" textColor="yellow" /> */}
        <Header />
        <div className="container">
          {/* 如果下方没有exact关键字，因为/about也有、，所以about那页也会有主页的所有组件 */}
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStats feedback={feedback} />
                  <FeedbackList
                    feedback={feedback}
                    handleDelete={deleteFeedback}
                  />
                </>
              }
            >
              {/* {}是用来存放variable的 */}
            </Route>

            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
        {/* <Route path="/about">This is the about Page</Route> */}
      </Router>
    </FeedbackProvider>
  );
}
export default App;
