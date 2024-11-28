import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [FeedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });
  const [feedback, setFeedback] = useState([]);
  //原先数据是在useState()内作为一个数组 hard coded
  //   [
  //   {
  //     id: 1,
  //     text: "This item is from context.",
  //     rating: 10,
  //   },
  // ]
  useEffect(() => {
    console.log(123);
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    const response = await fetch(
      "http://localhost:5050/feedback?_sort=id&_order=desc"
    );
    const data = await response.json();

    console.log(data);
    setFeedback(data);
    setIsLoading(false);
  };

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      // .filter 是一个high order function
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  //add更要补课
  // const addFeedback = (newFeedBack) => {
  //   newFeedBack.id = uuvidv4();
  //   setFeedback([newFeedBack, ...feedback]);
  // };
  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        isLoading,
        editFeedback,
        setFeedback,
        deleteFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
