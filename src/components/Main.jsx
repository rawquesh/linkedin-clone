import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getArticlesAPI, updateArticleAPI } from "../action";
import PostalModal from "./PostalModal";
import Article from "./Article";

const Container = styled.div`
  grid-area: main;
`;

const CommonBox = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonBox)`
  display: flex;
  flex-direction: column;
  margin: 0 0 8px;
  color: #958b7b;

  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      display: flex;
      align-items: center;
      border: none;
      background-color: transparent;
      font-weight: 600;
      padding: 10px 15px;
      cursor: pointer;
      border-radius: 8px;
      flex: 1;
      justify-content: center;

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
    }

    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px;

      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }

      button {
        margin: 4px 0;
        flex-grow: 1;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        text-align: left;
      }
    }

    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
        }
      }
    }
  }
`;

const Content = styled.div`
  text-align: center;

  & > img {
    width: 30px;
  }
`;

function Main(props) {
  const [showModal, setShowModal] = useState("close");

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

  function likeHandler(event, postIndex, id) {
    event.preventDefault();
    let currentLikes = props.articles[postIndex].likes.count;
    let whoLiked = props.articles[postIndex].likes.whoLiked;
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
          <button>
            <img src="/images/photo-icon.svg" alt="" />
            <span>Photo</span>
          </button>
          <button>
            <img src="/images/video-icon.svg" alt="" />
            <span>Video</span>
          </button>
        </div>
      </ShareBox>
      <Content>
        {props.loading && <img src="/images/spin-loader.gif" alt="" />}
        {props.articles.length > 0 &&
          props.articles.map((article, key) => (
            <Article
              onLikeClick={likeHandler}
              key={key}
              index={key}
              article={article}
              {...props}
            />
          ))}
      </Content>
      <PostalModal showModal={showModal} clickHandler={clickHandler} />
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
