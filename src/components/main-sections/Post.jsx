import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Article from "../Article/Article";
import { Container, Content } from "./style";
import { updateArticleAPI } from "../../action";
import articleMock from "../../mocks/article";
import { Box } from "@mui/material";
import { getArticleById } from "../../firebase/queries";

function Post({ onArticleLike, user }) {
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState(articleMock);

  const { id } = useParams();

  useEffect(() => {
    getArticleById(id).then((querySnapshot) => {
      const data = querySnapshot.docs[0]?.data();

      if (data) {
        setArticle(article);
      }

      setLoading(false);
    });
  }, []);

  if (!user) {
    return null;
  }

  if (!id) {
    return <Redirect to="/" />;
  }

  function likeHandler(event, article, id) {
    event.preventDefault();
    let currentLikes = article.likes.count;
    let whoLiked = article.likes.whoLiked;
    let userIndex = whoLiked.indexOf(user.email);

    if (userIndex >= 0) {
      currentLikes--;
      whoLiked.splice(userIndex, 1);
    } else if (userIndex === -1) {
      currentLikes++;
      whoLiked.push(user.email);
    }

    const payload = {
      update: {
        likes: {
          count: currentLikes,
          whoLiked: whoLiked,
        },
      },
      id: "6u9DZyCmBlRioPlH1JGo",
    };

    onArticleLike(payload);
  }

  return (
    <Container>
      <Box my={4} maxWidth="1128px" sx={{ marginX: "auto" }}>
        <Content>
          {loading && <img src="/images/spin-loader.gif" alt="" />}
          {article && !loading && (
            <Article onLikeClick={likeHandler} article={article} id={id} />
          )}
        </Content>
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onArticleLike: (payload) => dispatch(updateArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
