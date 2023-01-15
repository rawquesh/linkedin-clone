import { Container, Content, Header, PostButton, UserInfo } from "./style";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { connect } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

function VideoModal({ clickHandler, showModal, user }) {
  const [video, setVideo] = useState(null);
  const reset = () => {
    clickHandler();
    setVideo(null);
  };

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
                    src={video}
                  />
                ) : (
                  <Button
                    component="label"
                    sx={{ textTransform: "none", width: "max-content" }}
                  >
                    Select/Edit your video
                    <input
                      accept="video/*"
                      type="file"
                      onChange={(e) => {
                        setVideo(URL.createObjectURL(e.target.files[0]));
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
              <PostButton disabled={!video}>Post</PostButton>
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

export default connect(mapStateToProps, null)(VideoModal);
