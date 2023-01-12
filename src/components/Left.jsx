import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  grid-area: left;
`;

const ArtCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  border-radius: 5px;
  background-color: #fff;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 12px 16px;
  word-wrap: break-word;
  word-break: break-word;
`;

const CardBackground = styled.div`
  background: url("/images/card-bg.svg");
  background-position: center;
  background-size: 462px;
  height: 54px;
  margin: -12px -12px 0;
`;

const Photo = styled.div`
  box-shadow: none;
  background: url(${(props) => props.photoUrl});
  width: 72px;
  height: 72px;
  box-sizing: border-box;
  background-clip: content-box;
  background-color: #fff;
  background-position: center;
  background-repeat: no-repeat;
  border: 2px solid white;
  margin: -38px auto 12px;
  border-radius: 50%;
`;

const Link = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
`;

function Left(props) {
  let photoUrl = props.user?.photoURL ?? "/images/photo.svg";
  return (
    <Container>
      <ArtCard>
        <UserInfo>
          <CardBackground />
          <a>
            <Photo photoUrl={photoUrl} />
            <Link>
              Welcome, {props.user ? props.user.displayName : "there"}!
            </Link>
          </a>
        </UserInfo>
      </ArtCard>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(Left);
