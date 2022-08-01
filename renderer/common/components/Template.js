import React from "react";
import styled from "styled-components";

// TODO :  mui로 바꾸기

const Template = ({ children }) => {
  return (
    <MainBox>
      <Main>{children}</Main>
    </MainBox>
  );
};

const MainBox = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--main);
`;

const Main = styled.main`
  position: relative;
  background-color: white;
  width: 100%;
  height: calc(100vh - 50px);
  max-width: 28rem;
  margin-top: 1.5rem;
  border-radius: 20px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.6);
`;

export default Template;
