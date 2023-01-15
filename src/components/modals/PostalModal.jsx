import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { postArticleAPI } from "../../action";
import { Box, IconButton } from "@mui/material";
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
import articleMock from "../../mocks/article";
import Article from "../Article/Article";
import validURL from "../../utils/validUrl";
import { getArticleById } from "../../firebase/queries";

function PostalModal({ clickHandler, showModal, user }) {
  const [editorText, setEditorText] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [assetArea, setAssetArea] = useState("");
  const [postLink, setPostLink] = useState("");
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (!postLink) {
      setArticle(null);
    }

    if (validURL(postLink)) {
      const url = new URL(postLink);

      getArticleById("id").then((querySnapshot) => {
        const data = querySnapshot.docs[0]?.data();

        if (data) {
          setArticle(article);
        }

        setArticle(articleMock);
      });
    }
  }, [postLink]);

  const reset = (event) => {
    setEditorText("");
    setImageFile("");
    setVideoFile("");
    setAssetArea("");
    setPostLink("");
    clickHandler(event);
  };

  function handleImage(event) {
    let image = event.target.files[0];

    if (image === "" || image === undefined) {
      alert(`Not an image. This file is: ${typeof imageFile}`);
      return;
    }
    setImageFile(image);
  }

  function switchAssetArea(area) {
    setImageFile("");
    setVideoFile("");
    setAssetArea(area);
  }

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
                <input
                  type="url"
                  placeholder="Enter a post url to share"
                  pattern="https://.*"
                  width="100%"
                  value={postLink}
                  onChange={(event) => setPostLink(event.target.value)}
                />

                <Box position="relative" width="100%">
                  <textarea
                    value={editorText}
                    onChange={(event) => setEditorText(event.target.value)}
                    placeholder="What do you want to talk about?"
                    autoFocus={true}
                  />
                  {article && (
                    <Box>
                      <Article preview article={article} />
                    </Box>
                  )}
                </Box>

                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jpeg, image/png"
                      name="image"
                      id="imageFile"
                      onChange={handleImage}
                      style={{ display: "none" }}
                    />
                    <p>
                      <label htmlFor="imageFile">
                        Select an image to share
                      </label>
                      <IconButton onClick={() => setImageFile("")}>
                        <DeleteIcon />
                      </IconButton>
                    </p>
                    {imageFile && (
                      <img src={URL.createObjectURL(imageFile)} alt="" />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "video" && (
                    <>
                      <input
                        style={{ boxSizing: "border-box" }}
                        width="100%"
                        type="text"
                        name="video"
                        id="videoFile"
                        value={videoFile}
                        placeholder="Enter the video link"
                        onChange={(event) => setVideoFile(event.target.value)}
                      />
                      {videoFile && (
                        <ReactPlayer width={"100%"} url={videoFile} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <ShareCreation>
              <AttachAsset>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img src="/images/share-image.svg" alt="" />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("video")}>
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
