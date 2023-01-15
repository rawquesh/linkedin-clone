import { Container, Content, Header, PostButton } from "./style";
import { Box, Button, Divider } from "@mui/material";
import { connect } from "react-redux";
import { useRef, useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

function ImageModal({ clickHandler, showModal, user }) {
  const [images, setImages] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const imageContainer = useRef(null);

  const reset = (e) => {
    clickHandler(e);
    setCurrentImage(0);
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
                      src={images[currentImage]}
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
                    sx={{ textTransform: "none", width: "max-content" }}
                    component="label"
                  >
                    Select images to share
                    <input
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={(e) => {
                        setImages((prev) =>
                          prev
                            ? [
                                ...Array.from(e.target.files).map((file) =>
                                  URL.createObjectURL(file)
                                ),
                                ...prev,
                              ]
                            : [
                                ...Array.from(e.target.files).map((file) =>
                                  URL.createObjectURL(file)
                                ),
                              ]
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
                onClick={(e) => reset(e)}
                sx={{ borderRadius: "15px" }}
                variant="outlined"
              >
                Cancel
              </Button>
              <PostButton disabled={!images}>Post</PostButton>
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
