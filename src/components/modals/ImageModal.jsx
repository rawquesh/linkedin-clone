import { Container, Content, Header } from "./style";
import { Box, Button, Divider } from "@mui/material";
import { connect } from "react-redux";
import { useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { usePostContext } from "../../context/postContext";
import { useThemeContext } from "../../context/themeContext";

function ImageModal({ clickHandler, showModal, setShowPostModal }) {
  const [images, setImages] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  const { theme } = useThemeContext();

  const { setImageFile, resetPostContext, isCreatingPost } = usePostContext();

  const reset = (e) => {
    clickHandler(e);
    setCurrentImage(0);
    resetPostContext();
    setImages(null);
  };

  return (
    <>
      {showModal && (
        <Container>
          <Content>
            <Header>
              <h2>Create an image post</h2>
              <button onClick={(event) => reset(event)}>
                <img src="/images/close-icon.svg" alt="" />
              </button>
            </Header>
            <Box sx={{ padding: images ? "initial" : "75px 24px" }}>
              <Box
                alignItems="center"
                display="flex"
                flexDirection="column"
                gap={2}
              >
                {images?.length > 0 ? (
                  <Box
                    sx={{
                      overflowY: "auto",
                      maxHeight: "75vh",
                    }}
                  >
                    <img
                      style={{
                        objectFit: "cover",
                        height: "100%",
                        width: "100%",
                      }}
                      src={URL.createObjectURL(images[currentImage])}
                      alt="list"
                    />
                    <button
                      style={{
                        position: "absolute",
                        right: "0",
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "white",
                        border: "none",
                        cursor: "pointer",
                        padding: "5px",
                      }}
                    >
                      <NavigateNextIcon
                        onClick={() => {
                          const nextIndex = currentImage + 1;

                          if (images.length > nextIndex) {
                            setCurrentImage(nextIndex);
                          }
                        }}
                        sx={{ fontSize: "30px" }}
                      />
                    </button>
                    <button
                      style={{
                        position: "absolute",
                        left: "0",
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "white",
                        border: "none",
                        cursor: "pointer",
                        padding: "5px",
                      }}
                    >
                      <NavigateBeforeIcon
                        onClick={() => {
                          const nextIndex = currentImage - 1;

                          if (nextIndex >= 0) {
                            setCurrentImage(nextIndex);
                          }
                        }}
                        sx={{ fontSize: "30px" }}
                      />
                    </button>
                  </Box>
                ) : (
                  <Button
                    color={theme ? "secondary" : "primary"}
                    sx={{ textTransform: "none", width: "max-content" }}
                    component="label"
                  >
                    Select images to share
                    <input
                      accept="image/*"
                      multiple={!isCreatingPost}
                      type="file"
                      onChange={(e) => {
                        setImages((prev) =>
                          prev
                            ? [...Array.from(e.target.files), ...prev]
                            : [...Array.from(e.target.files)]
                        );
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
                    setImages(null);
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
                    setImageFile(images[0]);
                    setImages(null);
                    setShowPostModal("open");
                    clickHandler(e);
                  } else {
                    // add to db
                  }
                }}
                disabled={!images}
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

export default connect(mapStateToProps, null)(ImageModal);
