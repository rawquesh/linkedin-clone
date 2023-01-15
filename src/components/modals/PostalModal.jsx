import React, { useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { postArticleAPI } from "../../action";
import { Box, IconButton, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Firebase from "firebase";
import {
  Container,
  Header,
  Content,
  SharedContent,
  UploadImage,
  AttachAsset,
  Editor,
  AssetButton,
  PostButton,
  ShareCreation,
  UserInfo,
} from "./style";
import toast from "react-hot-toast";
import Article from "../Article/Article";
import validURL from "../../utils/validUrl";
import { getArticleById } from "../../firebase/queries";
import { usePostContext } from "../../context/postContext";

function PostalModal({
  clickHandler,
  showModal,
  user,
  setShowImageModal,
  setShowVideoModal,
  setShowModal,
}) {
  const [editorText, setEditorText] = useState("");
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);

  const { imageFile, videoFile, resetPostContext, setIsCreatingPost } =
    usePostContext();

  const onTextAreaPaste = (e) => {
    const postLink = e.clipboardData.getData("text");

    if (validURL(postLink)) {
      setLoading(true);
      const url = new URL(postLink);
      let id = url.pathname.split("/")[2];

      id = !!id ? id : "unknown";

      getArticleById(id).then((doc) => {
        if (doc.exists) {
          setArticle(doc.data());
        } else {
          toast.error(
            "Cannot display preview. You can post as is, or try another link.",
            { position: "bottom-left" }
          );
        }

        setLoading(false);
      });
    }
  };

  const reset = (event) => {
    setEditorText("");
    setArticle(null);
    setLoading(false);
    resetPostContext();
    clickHandler(event);
  };

  function postArticle(event) {
    event.preventDefault();
    if (event.target !== event.currentTarget) {
      return;
    }

    const payload = {
      image: imageFile,
      video: videoFile,
      description: editorText,
      user: user,
      timestamp: Firebase.firestore.Timestamp.now(),
    };

    postArticle(payload);
    reset(event);
  }

  return (
    <>
      {showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(event) => reset(event)}>
                <img src="/images/close-icon.svg" alt="" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {user?.photoURL ? (
                  <img src={user?.photoURL} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>{user.displayName ? user.displayName : "Name"}</span>
              </UserInfo>
              <Editor>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  position="relative"
                  width="100%"
                >
                  <textarea
                    onPaste={(e) => onTextAreaPaste(e)}
                    style={{ border: "none", outline: "none" }}
                    value={editorText}
                    onChange={(event) => {
                      setEditorText(event.target.value);
                      event.target.style.height = "auto";
                      event.target.style.height =
                        event.target.scrollHeight + "px";
                    }}
                    placeholder="What do you want to talk about?"
                    autoFocus={true}
                  />
                  {loading && (
                    <Box height="50px" display="flex" justifyContent="center">
                      <CircularProgress />
                    </Box>
                  )}
                  {article && !loading && (
                    <Box>
                      <Article preview article={article} />
                    </Box>
                  )}
                  {imageFile && (
                    <img
                      style={{
                        objectFit: "cover",
                        height: "100%",
                        width: "100%",
                      }}
                      src={imageFile}
                      alt="list"
                    />
                  )}
                  {videoFile && (
                    <video
                      controls
                      style={{
                        backgroundColor: "black",
                        maxHeight: "75vh",
                        height: "100%",
                        width: "100%",
                      }}
                      src={videoFile}
                    />
                  )}
                </Box>
              </Editor>
            </SharedContent>
            <ShareCreation>
              <AttachAsset>
                <AssetButton
                  onClick={(e) => {
                    setShowModal("close");
                    setShowImageModal(true);
                    setIsCreatingPost(true);
                  }}
                >
                  <img src="/images/share-image.svg" alt="" />
                </AssetButton>
                <AssetButton
                  onClick={(e) => {
                    setShowModal("close");
                    setShowVideoModal(true);
                    setIsCreatingPost(true);
                  }}
                >
                  <img src="/images/share-video.svg" alt="" />
                </AssetButton>
              </AttachAsset>
              <PostButton
                disabled={!editorText ? true : false}
                onClick={(event) => postArticle(event)}
              >
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postArticle: (payload) => dispatch(postArticleAPI(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostalModal);
