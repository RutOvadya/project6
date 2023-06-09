import React, { useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import './ViewPostsUser.css';

const ViewPostsUser = ({ listPosts, username }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
 
  const getCurrentComments = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const listComments = await response.json();
      if (listComments.length === 0) {
        throw new Error("You have no comments");
      }
      setComments(listComments);
    } catch (error) {
      alert("" + error);
    }
  };

  const showComments = async (id) => {
    await getCurrentComments(id);
  };
  const HideComments=()=>{
    setComments("");
  };

  const togglePost = (id) => {
    setSelectedPost(prevSelectedPost => prevSelectedPost === id ? null : id);
  };

  useEffect(() => {
    setComments([]);
  }, [selectedPost]);

  return (
    <div>
      {listPosts.map((post) => (
        <div key={post.id}>
          <Link to={`/users/${username}/Posts/${post.id}`} onClick={() => togglePost(post.id)}>
            <button
              id="title"
              
              className={selectedPost === post.id ? "highlighted" : ""}
            >
              {post.id}. {post.title}
            </button>
          </Link>
          {selectedPost === post.id && (
            <>
              <p id="postBody">&emsp;&emsp;{post.body}
                <br/>
                <button id="btnComments" className="fas" onClick={() => showComments(post.id)}>
                    View the comments &#xf086;
                </button>
              </p>
            </>
          )}
          {selectedPost === post.id && comments.length > 0 && (
            <div id="forComments">
              {comments.map((comment) => (
                <p key={comment.id} className="far">
                  &emsp;&emsp;&#xf075; {comment.name} <br /> &emsp;&emsp;{comment.body}
                </p>
              ))}
                <p>
                  <button id="btnComments" className="fas" onClick={() => HideComments()}>
                    Hide the comments &#xf086;
                  </button>
                </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ViewPostsUser;
