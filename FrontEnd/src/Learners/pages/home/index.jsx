import "./style.css";
import PostCard from "../../components/PostCard";

function Home({ posts }) {
  return (
    <div className="posts-container">
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
  );
}

export default Home;