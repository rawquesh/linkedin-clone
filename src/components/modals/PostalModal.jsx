import React, { useState } from "react";
import { connect } from "react-redux";
import { postArticleAPI } from "../../action";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Firebase from "firebase";
import {
  AssetButton,
  AttachAsset,
  Container,
  Content,
  Editor,
  Header,
  ShareCreation,
  SharedContent,
  UserInfo,
} from "./style";
import toast from "react-hot-toast";
import Article from "../Article/Article";
import validURL from "../../utils/validUrl";
import { getArticleById } from "../../firebase/queries";
import { usePostContext } from "../../context/postContext";
import { useThemeContext } from "../../context/themeContext";

function PostalModal({
  clickHandler,
  showModal,
  user,
  setShowImageModal,
  setShowVideoModal,
  setShowModal,
  postArticleToFirebase,
}) {
  const [editorText, setEditorText] = useState("");
  const [article, setArticle] = useState(null);
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useThemeContext();

  const { imageFile, videoFile, resetPostContext, setIsCreatingPost } =
    usePostContext();

  const onTextAreaPaste = (e) => {
    const postLink = e.clipboardData.getData("text");

    if (validURL(postLink)) {
      const url = new URL(postLink);

      if (process.env.REACT_APP_HOST !== url.host) {
        setUrls((prev) => {
          if (prev.find((currentUrl) => currentUrl.href === url.href)) {
            return prev;
          }

          return [...prev, url];
        });
        return;
      }

      setLoading(true);

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

    postArticleToFirebase(payload);
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

                  {urls.length > 0 && (
                    <Box display="flex" flexDirection="column" gap={1}>
                      {urls.map((url, index) => (
                        <Box
                          borderRadius={2}
                          bgcolor="#EEEEF0"
                          alignItems="center"
                          px={2}
                          py={1}
                          display="flex"
                        >
                          <a
                            style={{
                              flex: 1,
                              textDecoration: "none",
                              color: "black",
                              fontSize: "14px",
                            }}
                            href={url.href}
                            target="_blank"
                          >
                            <Box display="flex" flexDirection="column">
                              <Typography variant="body1">
                                {url.host}
                              </Typography>
                              <Typography fontSize="11px" variant="body2">
                                {url.href}
                              </Typography>
                            </Box>
                          </a>
                          <IconButton
                            onClick={() =>
                              setUrls((prevState) =>
                                [...prevState].filter(
                                  (_, currentIndex) => currentIndex !== index
                                )
                              )
                            }
                          >
                            <CloseIcon />
                          </IconButton>
                        </Box>
                      ))}
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
                      src={URL.createObjectURL(imageFile)}
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
                      src={URL.createObjectURL(videoFile)}
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
              <Button
                color={theme ? "secondary" : "primary"}
                variant="contained"
                disabled={!editorText ? true : false}
                onClick={(e) => postArticle(e)}
              >
                Post
              </Button>
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
    postArticleToFirebase: (payload) => dispatch(postArticleAPI(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostalModal);
