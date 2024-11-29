import { createContext, useState, useEffect } from "react";
// 因为backend会自动给分配unique id，所以这个uuid用不着了
// import { v4 as uuvidv4 } from "uuid";
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
    const response = await fetch(`/feedback?_sort=id&_order=desc`);
    const data = await response.json();

    console.log(data);
    setFeedback(data);
    setIsLoading(false);
  };
  // set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };
  const closeEditFeedback = (FeedbackEdit) => {
    FeedbackEdit.edit = false;
  };
  // delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      // .filter 是一个high order function
      // ${}意思是在一个模板字符串中加入表达式``
      await fetch(`/feedback/${id}`, { method: "DELETE" });
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
    //目前存在一个问题，一旦开始编辑一个feedback之后，就一直在编辑它，不能添加新的item
  };

  const addFeedback = async (newFeedback) => {
    // send to backend
    // no need for localhost because proxy is set
    const response = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });
    if (!response.ok) {
      console.error(
        `HTTP error! status: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    // 以下是使得UI显示了增加feedback
    // 这是用uuid这个包给newFeedback增加一个instance variable，即id
    // newFeedBack.id = uuvidv4();
    // 因为Feedback本身是immutable，所以只能复制一遍然后加上新加的

    setFeedback([data, ...feedback]);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        isLoading,
        FeedbackEdit,
        addFeedback,
        editFeedback,
        closeEditFeedback,
        updateFeedback,
        setFeedback,
        deleteFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
