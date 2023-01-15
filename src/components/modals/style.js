import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 11;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s ease;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 552px;
  max-height: 90%;
  background-color: #fff;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

export const Header = styled.div`
  padding: 10px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 20px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-weight: 400;
  }
  button {
    cursor: pointer;
    width: 40px;
    height: 40px;
    min-width: auto;
    border: none;
    outline: none;
    background: transparent;
    img,
    svg {
      pointer-events: none;
    }
  }
`;

export const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 5px 12px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 24px;
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border-radius: 50%;
    border: 2px solid transparent;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

export const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 24px 10px 16px;
`;

export const AttachAsset = styled.div`
  display: flex;
  align-items: center;
`;

export const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  width: 40px;
  cursor: pointer;
  min-width: auto;
  margin-right: 8px;
  border-radius: 50%;
  border: none;
  outline: none;
  justify-content: center;
  background: transparent;
  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }
`;

export const PostButton = styled.button`
  cursor: pointer;
  min-width: 60px;
  padding: 0 25px;
  border-radius: 15px;
  min-height: 40px;
  background: ${(props) => (props.disabled ? "#b8b8b8" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "#5a5a5a" : "#fff")};
  font-size: 16px;
  letter-spacing: 1.1px;
  border: none;
  outline: none;
  &:hover {
    background: ${(props) => (props.disabled ? "#b8b8b8" : "#004182")};
  }
`;

export const Editor = styled.div`
  display: flex;
  flex-direction: column;

  textarea {
    border-radius: 5px;
    font-family: Arial, sans-serif;
    min-height: 100px;
    resize: none;
    padding: 10px;
    margin-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
  }
  input {
    padding: 10px 15px;
    outline: none;
    border-radius: 5px;
    border-width: 1px;

    &:first-child {
      margin-bottom: 10px;
    }
  }
`;

export const UploadImage = styled.div`
  text-align: center;

  img {
    width: 100%;
    border: 1px solid rgba(169, 169, 169, 0.5);
    border-radius: 8px;
  }

  p {
    border-radius: 8px;
    padding: 5px 10px;
    border: 1px dashed darkgrey;
    display: flex;
    align-items: center;
    justify-content: center;

    label {
      padding: 10px 0;
      display: block;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
`;
