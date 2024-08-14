import React from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1600px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Title = styled.div`
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

const VideoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const VideoFrame = styled.iframe`
  width: 100%;
  max-width: 560px;
  height: 315px;
  border: none;
  border-radius: 8px;
`;

const Tutorials = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Tutorials</Title>
        <VideoWrapper>
          {/* Replace the `src` attributes with the actual YouTube video URLs */}
          <VideoFrame src="https://www.youtube.com/embed/M4K0s792wAU?si=wcWGE76XkPqma3wB" title="Workout Video 1" />
          <VideoFrame src="https://www.youtube.com/embed/heYJRQ3EAo0?si=mFwsZTf2FCB5lesX" title="Diet Video 1" />
          <VideoFrame src="https://www.youtube.com/embed/YwYa9UuEhqg?si=Mjcnuy8cKP1ALpaE" title="Workout Video 2" />
          <VideoFrame src="https://www.youtube.com/embed/AzV3EA-1-yM?si=T2nRanrUQLUnAMwZ" title="Diet Video 2" />
          <VideoFrame src="https://www.youtube.com/embed/ItuhDytDOYE?si=lmL1VTyys1ZNlDUK" title="Workout Video 3" />
          <VideoFrame src="https://www.youtube.com/embed/Ws7qOur3Tr0?si=KzOoIHj7JEqNW9vi" title="Diet Video 3" />
          <VideoFrame src="https://www.youtube.com/embed/1f8yoFFdkcY?si=brF51dh2tVETVMbo" title="Workout Video 4" />
          <VideoFrame src="https://www.youtube.com/embed/Q89St6BTxIQ?si=qwfmwQkxYmzU7hvn" title="Diet Video 4" />
          <VideoFrame src="https://www.youtube.com/embed/nidwcguLHL8?si=mYb7GSkOLmauob-D" title="Workout Video 5" />
          <VideoFrame src="https://www.youtube.com/embed/z_3S2_41_FE?si=QnCmqhF11IuJvTKK" title="Diet Video 5" />
        </VideoWrapper>
      </Wrapper>
    </Container>
  );
};

export default Tutorials;
