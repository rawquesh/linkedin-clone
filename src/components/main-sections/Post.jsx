import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Article from "../Article/Article";
import { Container, Content } from "./style";
import { Box, CircularProgress } from "@mui/material";
import { getArticleById } from "../../firebase/queries";
import { useThemeContext } from "../../context/themeContext";

function Post({ user }) {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const { theme } = useThemeContext();

  const { id } = useParams();

  useEffect(() => {
    getArticleById(id).then((querySnapshot) => {
      const data = querySnapshot.data();

      if (data) {
        setArticle(data);
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

  return (
    <Container
      style={{
        flex: 1,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundImage: `url("/images/wellness-${
          theme ? "forest" : "ocean"
        }.jpg")`,
      }}
    >
      <Box my={4} maxWidth="900px" sx={{ marginX: "auto" }}>
        <Content>
          {loading && <CircularProgress color="secondary" />}
          {article && <Article preview article={article} id={id} />}
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

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
