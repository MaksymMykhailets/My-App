import { createContext, useState } from "react";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    setPosts((prevPosts) => [...prevPosts, { ...post, id: Date.now() }]);
  };

  return (
    <PostsContext.Provider value={{ posts, addPost }}>
      {children}
    </PostsContext.Provider>
  );
};
