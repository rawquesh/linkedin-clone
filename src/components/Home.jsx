import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Left from "./Left";
import Right from "./Right";
import Main from "./main-sections/Main";
import { useThemeContext } from "../context/themeContext";

const Container = styled.div`
  max-width: 100%;

  transition: all ease-in-out 0.15s;
`;

const Content = styled.div`
  max-width: 1128px;
  margin: auto;
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "left main right";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  padding: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

function Home({ user }) {
  const { theme } = useThemeContext();

  return (
    <Container
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundImage: `url("/images/wellness-${
          theme ? "forest" : "ocean"
        }.jpg")`,
      }}
    >
      {!user && <Redirect to="/" />}
      <Content>
        <Layout>
          <Left />
          <Main />
          <Right />
        </Layout>
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(Home);
