import React, { useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import './ViewPostsUser.css';

const ViewPostsUser = ({ listPosts, username, userID }) => {
  const API_URL = 'http://localhost:3000';
  const [listsOfPosts, setListsOfPosts] = useState([...(listPosts || [])]);

  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
 

  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [editablePostId, setEditablePostId] = useState(null);
  const [editablePostText, setEditablePostText] = useState("");

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
    setShowNewPostForm(false);
  };

  useEffect(() => {
    setComments([]);
  }, [selectedPost]);


  const getCurrentPosts = async()=>{
    try {
      const response = await fetch(
        `${API_URL}/posts/${userID}`,
        { method: 'GET'}
      );
      if (response.ok) {
        const listPosts = await response.json();
        if (listPosts.length === 0) {
          throw new Error("You have no Posts");
        }
        setListsOfPosts(listPosts);
        return listPosts;
      } else {
        throw new Error("Request failed!");
      }
    } catch (error) {
      alert("" + error);
    }
  };

  const editPost = (id) => {
    const post = listsOfPosts.find(post => post.id === id);
    if (post) {
      setEditablePostId(id);
      setEditablePostText(post.body); // Update with the post's body
    }
  }; 
  
  const saveEditedPost = async (id) => {
    const updatedPost = {
      body: editablePostText
    };
  
    await fetch(
      `${API_URL}/posts/${userID}/${id}`, 
      {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedPost)
      }
    )
    .then(response => response.json())
    .then(data => {
      alert(data.message); // 'post updated successfully'
      setEditablePostId(null);
      setEditablePostText("");
      getCurrentPosts(); // to get the updated list of posts
    })
    .catch(error => {
      alert('Error updating post:', error);
    });
  };
 
 
  const handleCreatePost= async()=>{
    const newPost = {
      userId: userID,
      title: newPostTitle,
      body: newPostBody
    };
     
      await fetch(
        `${API_URL}/posts`,
        {method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(newPost) })  
         .then(response => response.json())
         .then(data => {
           alert(data.message); // Post created successfully
         })
         .catch(error => {
           alert('Error create post:', error);
         });

        getCurrentPosts(); //to get the update list of posts
        setNewPostTitle('');
        setNewPostBody('');
 
     };

  return (
    <div>
       <div>
      {showNewPostForm ? (
        <div id="forNewPost">
          <label htmlFor="postTitle">&emsp;Title:</label>
          <textarea
            type="text"
            id="postTitle"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}/>
          <label htmlFor="postBody">Body:</label>
          <textarea
            id="postBody"
            value={newPostBody}
            onChange={(e) => setNewPostBody(e.target.value)}></textarea>
          <button onClick={handleCreatePost}>Create Post</button>
          <button onClick={() => setShowNewPostForm(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() =>{ setShowNewPostForm(true); setSelectedPost(null)}}>Click here to add new post</button>
      )}
    </div>
    <div>
    {listsOfPosts.length > 0 ? (
  listsOfPosts.map((post) => (
    <div key={post.id}>
      <Link to={`/users/${username}/Posts/${post.id}`} onClick={() => togglePost(post.id)}>
        <button id="title" className={selectedPost === post.id ? "highlighted" : ""}>
          {post.title}
        </button>
      </Link>
      {selectedPost === post.id && (
        <>
          <p id="postBody">
            &emsp;&emsp;
            {post.id === editablePostId ? (
              <textarea
                value={editablePostText}
                onChange={(event) => setEditablePostText(event.target.value)}
                rows={Math.ceil(editablePostText.length / 50)} // Adjust the row count based on the length of the text
                style={{ width: '100%' }} // Set the width to 100% for the textarea
              />
            ) : (
              <span>{post.body}</span>
            )}
            <br/>
            {post.id === editablePostId ? (
              <button className="forActions" onClick={() => saveEditedPost(post.id)}>Save</button>
            ) : (
              <button className="forActions" onClick={() => editPost(post.id)}>Edit</button>
            )}
            <button id="btnComments" className="fas" onClick={() => showComments(post.id)}>
              View the comments &#xf086;
            </button>
          </p>
        </>
      )}
      {selectedPost === post.id && comments.length > 0 && (
        <div id="forComments">
          {comments.map((comment) => (
            <p key={comment.id}>
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
  ))
) : null

(
      <p>&emsp; There are no posts</p>
    )}
      </div>
    </div>
  );
};

export default ViewPostsUser;

