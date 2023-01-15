import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getArticlesAPI, updateArticleAPI } from "../../action";
import PostalModal from "../modals/PostalModal";
import Article from "../Article/Article";
import ImageModal from "../modals/ImageModal";
import VideoModal from "../modals/VideoModal";
import { Container, Content, ShareBox } from "./style";

function Main(props) {
  const [showModal, setShowModal] = useState("close");
  const [showImageModal, setShowImageModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    props.getArticles();
  }, []);

  const clickHandler = (event) => {
    event.preventDefault();
    if (event.target !== event.currentTarget) {
      return;
    }
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };

  function likeHandler(event, article, id) {
    event.preventDefault();
    let currentLikes = article.likes.count;
    let whoLiked = article.likes.whoLiked;
    let user = props.user.email;
    let userIndex = whoLiked.indexOf(user);

    if (userIndex >= 0) {
      currentLikes--;
      whoLiked.splice(userIndex, 1);
    } else if (userIndex === -1) {
      currentLikes++;
      whoLiked.push(user);
    }

    const payload = {
      update: {
        likes: {
          count: currentLikes,
          whoLiked: whoLiked,
        },
      },
      id: id,
    };

    props.likeHandler(payload);
  }

  return (
    <Container>
      <ShareBox>
        <div>
          {props.user?.photoURL ? (
            <img src={props.user?.photoURL} alt="" />
          ) : (
            <img src="/images/user.svg" alt="" />
          )}
          <button
            onClick={clickHandler}
            disabled={props.loading ? true : false}
          >
            Start a post
          </button>
        </div>
        <div style={{ display: "flex", padding: "0 10px 10px" }}>
          <button
            onClick={() => setShowImageModal(true)}
            disabled={props.loading ? true : false}
          >
            <img src="/images/photo-icon.svg" alt="" />
            <span>Photo</span>
          </button>
          <button
            onClick={() => setShowVideoModal(true)}
            disabled={props.loading ? true : false}
          >
            <img src="/images/video-icon.svg" alt="" />
            <span>Video</span>
          </button>
        </div>
      </ShareBox>
      <Content>
        {props.loading && <img src="/images/spin-loader.gif" alt="" />}
        {props.articles.length > 0 &&
          props.articles.map((article, index) => (
            <Article
              onLikeClick={likeHandler}
              key={props.ids[index]}
              article={article}
              id={props.ids[index]}
            />
          ))}
      </Content>
      <PostalModal showModal={showModal} clickHandler={clickHandler} />
      <ImageModal
        showModal={showImageModal}
        clickHandler={() => setShowImageModal(false)}
      />
      <VideoModal
        showModal={showVideoModal}
        clickHandler={() => setShowVideoModal(false)}
      />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    loading: state.articleState.loading,
    articles: state.articleState.articles,
    ids: state.articleState.ids,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
  likeHandler: (payload) => dispatch(updateArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
