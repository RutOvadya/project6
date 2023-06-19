import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ViewPostsUser = ({ userID }) => {
  const [listsOfPosts, setListOfPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editablePostId, setEditablePostId] = useState(null);
  const [editablePostText, setEditablePostText] = useState('');
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    getCurrentPosts();
  }, []);

  const API_URL = 'your_api_url';

  const getCurrentPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts/${userID}`);
      const data = await response.json();
      setListOfPosts(data);
    } catch (error) {
      alert('Error retrieving posts:', error);
    }
  };

  const getCurrentComments = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/comments/${postId}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      alert('Error retrieving comments:', error);
    }
  };

  const togglePost = async (postId) => {
    if (selectedPost === postId) {
      setSelectedPost(null);
      setComments([]);
    } else {
      try {
        setSelectedPost(postId);
        await getCurrentComments(postId);
      } catch (error) {
        alert('Error toggling post:', error);
      }
    }
  };

  const editPost = (postId) => {
    const postToEdit = listsOfPosts.find((post) => post.id === postId);
    setEditablePostId(postId);
    setEditablePostText(postToEdit.body);
  };

  const saveEditedPost = async (postId) => {
    const updatedPost = {
      body: editablePostText,
    };

    try {
      const response = await fetch(`${API_URL}/posts/${userID}/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // 'Post updated successfully'
        setEditablePostId(null);
        getCurrentPosts(); // Fetch the updated list of posts
      } else {
        throw new Error('Request failed!');
      }
    } catch (error) {
      alert('Error updating post:', error);
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/posts/${userID}/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // 'Post deleted successfully'
        getCurrentPosts(); // Fetch the updated list of posts
      } else {
        throw new Error('Request failed!');
      }
    } catch (error) {
      alert('Error deleting post:', error);
    }
  };

  const addComment = async (postId, commentBody) => {
    const newComment = {
      postId: postId,
      body: commentBody,
    };

    try {
      const response = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // 'Comment added successfully'
        getCurrentComments(postId); // Fetch the updated list of comments
        setNewComment('');
      } else {
        throw new Error('Request failed!');
      }
    } catch (error) {
      alert('Error adding comment:', error);
    }
  };

  const editComment = async (commentId, commentBody) => {
    const updatedComment = {
      body: commentBody,
    };

    try {
      const response = await fetch(`${API_URL}/comments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedComment),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // 'Comment updated successfully'
        getCurrentComments(selectedPost); // Fetch the updated list of comments
      } else {
        throw new Error('Request failed!');
      }
    } catch (error) {
      alert('Error updating comment:', error);
    }
  };

  return (
    <div>
      <h1>Posts</h1>

      {listsOfPosts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          {editablePostId === post.id ? (
            <div>
              <textarea
                value={editablePostText}
                onChange={(e) => setEditablePostText(e.target.value)}
              ></textarea>
              <button onClick={() => saveEditedPost(post.id)}>Save</button>
            </div>
          ) : (
            <>
              <p>{post.body}</p>
              <div>
                <button onClick={() => togglePost(post.id)}>
                  {selectedPost === post.id ? 'Hide' : 'Show'} Comments
                </button>
                <button onClick={() => editPost(post.id)}>Edit Post</button>
                <button onClick={() => deletePost(post.id)}>Delete Post</button>
              </div>
              {selectedPost === post.id && (
                <>
                  <h3>Comments:</h3>
                  {comments.map((comment) => (
                    <div key={comment.id}>
                      <p>{comment.body}</p>
                      <button onClick={() => editComment(comment.id, comment.body)}>
                        Edit Comment
                      </button>
                    </div>
                  ))}
                  <div>
                    <label htmlFor="commentBody">Add Comment:</label>
                    <textarea
                      id="commentBody"
                      onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <button onClick={() => addComment(post.id, newComment)}>
                      Add Comment
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      ))}
      <div className="back-link">
        <Link to={`/user/${userID}`}>Back to User Profile</Link>
      </div>
    </div>
  );
};

export default ViewPostsUser;
