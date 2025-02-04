import { Container, Content, Header } from "./style";
import { Box, Button, Divider } from "@mui/material";
import { connect } from "react-redux";
import { useState } from "react";
import { usePostContext } from "../../context/postContext";
import { useThemeContext } from "../../context/themeContext";
import Firebase from "firebase";
import { postArticleAPI } from "../../action";

function VideoModal({
  clickHandler,
  showModal,
  setShowPostModal,
  postArticleToFirebase,
  user,
}) {
  const [video, setVideo] = useState(null);
  const { theme } = useThemeContext();

  const { setVideoFile, resetPostContext, isCreatingPost } = usePostContext();

  const reset = () => {
    clickHandler();
    setVideo(null);
    resetPostContext();
  };

  function postArticle(event) {
    if (event.target !== event.currentTarget) {
      return;
    }

    const payload = {
      video: video,
      image: "",
      description: "",
      user: user,
      timestamp: Firebase.firestore.Timestamp.now(),
    };

    postArticleToFirebase(payload);
    reset(event);
  }

  return (
    <>
      {showModal && (
        <Container>
          <Content>
            <Header>
              <h2>Create a video post</h2>
              <button onClick={(event) => reset(event)}>
                <img src="/images/close-icon.svg" alt="" />
              </button>
            </Header>
            <Box
              justifyContent="center"
              width="100%"
              boxSizing="border-box"
              display="flex"
              sx={{
                padding: video ? "initial" : "75px 24px",
                backgroundColor: video ? "black" : "initial",
              }}
            >
              <Box>
                {video ? (
                  <video
                    controls
                    style={{
                      maxHeight: "75vh",
                      height: "100%",
                      width: "100%",
                    }}
                    src={URL.createObjectURL(video)}
                  />
                ) : (
                  <Button
                    color={theme ? "secondary" : "primary"}
                    component="label"
                    sx={{ textTransform: "none", width: "max-content" }}
                  >
                    Select/Edit your video
                    <input
                      accept="video/*"
                      type="file"
                      onChange={(e) => {
                        setVideo(e.target.files[0]);
                        e.target.value = null;
                      }}
                      hidden
                    />
                  </Button>
                )}
              </Box>
            </Box>
            <Divider />

            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              height="100%"
              sx={{ padding: "10px 24px" }}
              gap={2}
            >
              <Button
                color={theme ? "secondary" : "primary"}
                onClick={(e) => {
                  if (isCreatingPost) {
                    setShowPostModal("open");
                    setVideo(null);
                    clickHandler(e);
                  } else {
                    reset(e);
                  }
                }}
                variant="outlined"
              >
                {isCreatingPost ? "Back" : "Cancel"}
              </Button>
              <Button
                color={theme ? "secondary" : "primary"}
                variant="contained"
                onClick={(e) => {
                  if (isCreatingPost) {
                    setVideoFile(video);
                    setVideo(null);
                    setShowPostModal("open");
                    clickHandler(e);
                  } else {
                    postArticle(e);
                    reset(e);
                  }
                }}
                disabled={!video}
              >
                {isCreatingPost ? "Done" : "Post"}
              </Button>
            </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(VideoModal);
