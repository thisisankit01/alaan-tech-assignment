import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [fetchedData, setFetchedData] = useState([]);
  const [comments, setComments] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchdata = await fetch(
        `https://jsonplaceholder.typicode.com/posts`
      );
      const jsonData = await fetchdata.json();
      setFetchedData(jsonData);
    };
    fetchPosts();
  }, []);

  const handleCardClick = (postId) => {
    if (postId === expandedCard) {
      setExpandedCard(null);
    } else {
      setExpandedCard(postId);
      fetchComments(postId);
    }
  };

  // console.log(comments);

  const fetchComments = async (postId) => {
    const fetchData = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    const jsonData = await fetchData.json();
    setComments(jsonData);
  };

  return (
    <>
      <div className="grid grid-cols-3 grid-flow-row gap-4">
        {fetchedData.map((data) => (
          <div key={data?.id}>
            <div
              className={`block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer ${
                data?.id === expandedCard ? "expanded" : ""
              }`}
              onClick={() => handleCardClick(data?.id)}
            >
              <p className=" font-normal text-gray-700 dark:text-gray-400 pb-2">
                User : {data?.userId}
              </p>
              <p className="text-gray-700 dark:text-gray-400 font-bold py-2">
                {data?.title}
              </p>
              <p className=" font-normal text-gray-700 dark:text-gray-400 py-2">
                {data?.body}
              </p>
              {data?.id === expandedCard && (
                <div className="comments">
                  {comments.map((comment) => (
                    <div key={comment.id} className="py-4">
                      <hr />
                      <p className="font-bold py-2">{comment.email}</p>
                      <p className="font-bold py-2">{comment.name}</p>
                      <p>{comment.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
