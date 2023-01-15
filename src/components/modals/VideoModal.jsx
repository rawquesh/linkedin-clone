import { Container, Content, Header, PostButton, UserInfo } from "./style";
import { Box, Button, IconButton, Typography } from "@mui/material";
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
            <UserInfo>
              {user?.photoURL ? (
                <img src={user?.photoURL} alt="" />
              ) : (
                <img src="/images/user.svg" alt="" />
              )}
              <span>{user.displayName ? user.displayName : "Name"}</span>
            </UserInfo>
            <Box sx={{ padding: "12px 24px" }}>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body1">Select a video</Typography>
                  <IconButton onClick={() => setVideo(null)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Button
                  component="label"
                  sx={{
                    height: "250px",
                    width: "100%",
                    backgroundColor: "#C1C1C1",
                    padding: 0,
                  }}
                >
                  {video && (
                    <video
                      controls
                      style={{
                        maxHeight: "250px",
                        height: "100%",
                        width: "100%",
                      }}
                      src={video}
                    />
                  )}
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
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              height="100%"
              sx={{ padding: "10px 24px" }}
            >
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
