import React, { useState } from "react";

const PostContext = React.createContext();

export function PostContextProvider({ children }) {
  const [imageFile, setImageFile] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const resetPostContext = () => {
    setImageFile("");
    setVideoFile("");
  };

  return (
    <PostContext.Provider
      value={{
        resetPostContext,
        imageFile,
        setImageFile,
        videoFile,
        setVideoFile,
        isCreatingPost,
        setIsCreatingPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePostContext() {
  return React.useContext(PostContext);
}
