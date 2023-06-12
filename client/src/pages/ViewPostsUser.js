import React, { useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import './ViewPostsUser.css';

const ViewPostsUser = ({ listPosts, username, userID }) => {
  const API_URL = 'http://localhost:3000';
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
 


  const getCurrentComments = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/comments/${id}`,
         { method: 'GET'}
      );
      if (response.ok) {
        const listComments = await response.json();
        if (listComments.length === 0) {
          throw new Error("You have no comments");
        }
        setComments(listComments);
      } else {
        throw new Error("Request failed!");
      }
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
                <p key={comment.id} >
                  &emsp;&emsp; {comment.name} <br /> &emsp;&emsp;{comment.body}
                </p>
              ))}
                <p>
                  <button id="btnComments" className="fas fa-comment" onClick={() => HideComments()}>
                    Hide the comments 
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
