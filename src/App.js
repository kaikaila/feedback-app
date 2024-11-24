function App() {
  const title = "Blog Post";
  const body = "This is my blog";
  // comments是array；
  // {}圈起来的是键值对
  const comments = [
    { id: 1, text: "comment one" },
    { id: 2, text: "comment two" },
    { id: 3, text: "comment three" },
  ];
  const showComments = true;

  const commentBlock = (
    <div className="comments">
      <h3>Comments({comments.length})</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );

  // JSX expressions must have one parent element.
  // if we need to return multiple elements, wrap them in one parent element
  return (
    <div className="container">
      {/* {}是用来存放variable的 */}
      <h1>{title}</h1>
      <p>{body}</p>

      {/* 条件判断语句的完整写法是
      {condition ? 'yes':'no'}
      如果之规定了condition为true时做xxx，为false时什么也不做，可以简写为
      {showComments && 'yes'} */}

      {showComments ? commentBlock : null}
    </div>
  );
}
export default App;
