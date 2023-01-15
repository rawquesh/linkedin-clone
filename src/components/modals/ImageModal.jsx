import { Container, Content, Header, PostButton, UserInfo } from "./style";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { connect } from "react-redux";
import { useState } from "react";
import db from "../../firebase";

function ImageModal({ clickHandler, showModal, user }) {
  const [image, setImage] = useState(null);

  db.collection("articles");

  const reset = () => {
    clickHandler();
    setImage(null);
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
                  <Typography variant="body1">Select an image</Typography>
                  <IconButton onClick={() => setImage(null)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Button
                  component="label"
                  sx={{
                    height: "200px",
                    width: "100%",
                    backgroundColor: "#C1C1C1",
                    padding: 0,
                  }}
                >
                  {image && (
                    <img
                      style={{
                        objectFit: "cover",
                        height: "100%",
                        width: "100%",
                      }}
                      src={image}
                      alt="list"
                    />
                  )}
                  <input
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={(e) => {
                      setImage(URL.createObjectURL(e.target.files[0]));
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
              <PostButton disabled={!image}>Post</PostButton>
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
