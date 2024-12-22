import "./style.css";
import Testimonials from "../../components/Testimonial";
import Panel from "../../components/Panel";

function Home() {
  const isloggedin = localStorage.getItem("");
  return (
    <div>
      <Panel />
      <Testimonials />
    </div>
  );
}

// import "./style.css";
// import PostCard from "../../components/PostCard";

// let posts = [
//   {
//     userAvatar: 'path_to_avatar.jpg',
//     username: 'john_doe',
//     caption: 'This is an amazing post!',
//     likes: 150,
//     type: 'image', // Can be 'image', 'video', or 'text'
//     image: 'path_to_image.jpg', // Used if type is 'image'
//     videoUrl: 'path_to_video.mp4', // Used if type is 'video'
//     text: 'Here’s some cool content without any image or video!', // Used if type is 'text'
//   }  
// ];

// function Home() {
//   return (
//     <div className="posts-container">
//       {posts.map((post, index) => (
//         <PostCard key={index} post={post} />
//       ))}
//     </div>
//   );
// }

// export default Home;

export default Home;