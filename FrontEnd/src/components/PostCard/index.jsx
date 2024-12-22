import React, { useState } from 'react';
import './styles.css';

function PostCard({ post }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const renderPostContent = () => {
    if (post.type === 'image') {
      return <img src={post.image} alt="Post content" className="post-image" />;
    }
    if (post.type === 'video') {
      return (
        <video className="post-video" controls>
          <source src={post.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
    if (post.type === 'text') {
      return <p className="post-text">{post.text}</p>;
    }
    return null;
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <img src={post.userAvatar} alt="User avatar" className="avatar" />
        <span className="username">{post.username}</span>
      </div>
      {renderPostContent()}
      <div className="post-actions">
        <button onClick={toggleLike} className="like-button">
          {liked ? '❤️' : '🤍'}
        </button>
        <button className="comment-button">💬</button>
      </div>
      <div className="post-details">
        <p className="likes-count">{liked ? post.likes + 1 : post.likes} likes</p>
        <p className="post-caption">
          <span className="username">{post.username}</span> {post.caption}
        </p>
      </div>
    </div>
  );
}

export default PostCard;