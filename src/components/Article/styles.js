import styled from "styled-components";

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

export const ArticleContainer = styled(CommonBox)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

export const SharedActor = styled.div`
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  display: flex;
  align-items: center;

  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;

    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;

      span {
        text-align: left;

        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: #000;
        }

        &:nth-child(n + 2) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    top: 0;
    right: 12px;
    border: none;
    outline: none;
    background: transparent;
  }
`;

export const Description = styled.div`
  margin-top: 15px;
  padding: 0 16px;
  overflow: hidden;
  font-size: 14px;
  text-align: left;
`;

export const SharedImage = styled.div`
  margin: 8px 16px 0;
  background-color: #f9fafb;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const SocialCount = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9efdf;
  color: rgba(0, 0, 0, 0.6);
  list-style: none;

  li {
    margin-right: 5px;
    font-size: 12px;

    button {
      display: flex;
      border: none;
      color: rgba(0, 0, 0, 0.6);
      background: transparent;

      span {
        padding-left: 5px;
      }
    }
  }
`;

export const SocialActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 4px 12px;
  min-height: 40px;
  padding-bottom: 5px;
  gap: 5px;

  button {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    padding: 8px;
    border: none;
    background: transparent;
    border-radius: 8px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    span {
      margin-left: 4px;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
    }
  }

  button.active {
    span {
      color: #0a66c2;
      font-weight: 600;
    }

    svg {
      fill: #0a66c2;
    }
  }
`;
