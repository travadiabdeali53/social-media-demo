import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Home() {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [comments, setComments] = useState({});

  const currentUser = JSON.parse(localStorage.getItem("user"));

  // Get all posts
  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");

      setPosts(res.data.posts);

      res.data.posts.forEach((post) => {
        fetchComments(post._id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Create post
  const createPost = async () => {
    if (!content.trim()) {
      alert("Write something first");
      return;
    }

    try {
      await API.post("/posts", {
        content,
      });

      setContent("");

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const likePost = async (postId) => {
    try {
      await API.put(`/posts/like/${postId}`);

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (postId) => {
    try {
      const confirmDelete = window.confirm("Delete this post?");

      if (!confirmDelete) return;

      await API.delete(`/posts/${postId}`);

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const res = await API.get(`/comments/${postId}`);

      setComments((prev) => ({
        ...prev,
        [postId]: res.data.comments,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (postId) => {
    const text = commentText[postId];

    if (!text?.trim()) {
      return;
    }

    try {
      await API.post(`/comments/${postId}`, {
        text,
      });

      setCommentText((prev) => ({
        ...prev,
        [postId]: "",
      }));

      fetchComments(postId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />

      <style>
        {`
.home-wrapper{
  max-width:800px;
  margin:30px auto;
  padding:0 15px;
}

.feed-title{
  margin-bottom:20px;
  color:#1877f2;
}

.create-post-card{
  background:white;
  padding:20px;
  border-radius:16px;
  box-shadow:0 4px 15px rgba(0,0,0,.08);
}

.create-post-card textarea{
  width:100%;
  height:120px;
  padding:15px;
  border:1px solid #ddd;
  border-radius:12px;
  resize:none;
}

.create-btn{
  margin-top:12px;
  background:#1877f2;
  color:white;
  border:none;
  padding:12px 20px;
  border-radius:10px;
  cursor:pointer;
}

.post-card-modern{
  background:white;
  margin-top:20px;
  padding:20px;
  border-radius:16px;
  box-shadow:0 4px 15px rgba(0,0,0,.08);
}

.post-header{
  display:flex;
  align-items:center;
  gap:12px;
  margin-bottom:15px;
}

.post-avatar{
  width:50px;
  height:50px;
  border-radius:50%;
  background:#1877f2;
  color:white;
  display:flex;
  justify-content:center;
  align-items:center;
  font-weight:bold;
  font-size:20px;
}

.post-content{
  margin:15px 0;
  line-height:1.6;
}

.post-actions-modern{
  display:flex;
  gap:10px;
  margin-top:15px;
}

.post-actions-modern button{
  border:none;
  padding:10px 16px;
  border-radius:10px;
  cursor:pointer;
}

.like-btn{
  background:#ffe4e6;
}

.delete-btn{
  background:#fee2e2;
}

.comment-box{
  margin-top:15px;
}

.comment-item{
  background:#f5f5f5;
  padding:10px;
  border-radius:8px;
  margin-bottom:8px;
}

.comment-input{
  width:100%;
  padding:10px;
  border-radius:8px;
  border:1px solid #ddd;
  margin-top:10px;
}

.comment-btn{
  margin-top:10px;
  background:#1877f2;
  color:white;
  border:none;
  padding:10px 15px;
  border-radius:8px;
  cursor:pointer;
}

@media(max-width:768px){

  .post-actions-modern{
    flex-direction:column;
  }

  .create-btn{
    width:100%;
  }

  .comment-btn{
    width:100%;
  }
}
`}
      </style>

      <div className="home-wrapper">
        <h2 className="feed-title">News Feed</h2>

        <div className="create-post-card">
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button className="create-btn" onClick={createPost}>
            Create Post
          </button>
        </div>

        {/* Posts */}

        <div className="posts-container">
          {posts.map((post) => (
            <div key={post._id} className="post-card-modern">
              {/* Post Header */}

              <div className="post-header">
                <div className="post-avatar">
                  {post.user?.username?.charAt(0).toUpperCase()}
                </div>

                <h4>{post.user?.username}</h4>
              </div>

              {/* Post Content */}

              <p className="post-content">{post.content}</p>

              {/* Comments */}

              <div className="comment-box">
                <h5>Comments</h5>

                {comments[post._id]?.map((comment) => (
                  <div key={comment._id} className="comment-item">
                    <strong>{comment.user?.username}</strong>: {comment.text}
                  </div>
                ))}

                <input
                  className="comment-input"
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText[post._id] || ""}
                  onChange={(e) =>
                    setCommentText({
                      ...commentText,
                      [post._id]: e.target.value,
                    })
                  }
                />

                <button
                  className="comment-btn"
                  onClick={() => addComment(post._id)}
                >
                  Add Comment
                </button>
              </div>

              {/* Like/Delete */}

              <div className="post-actions-modern">
                <button className="like-btn" onClick={() => likePost(post._id)}>
                  ❤️ {post.likes.length}
                </button>

                {currentUser && currentUser._id === post.user?._id && (
                  <button
                    className="delete-btn"
                    onClick={() => deletePost(post._id)}
                  >
                    🗑 Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
