import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  background: ${({ theme }) => theme.bgGradient};
  opacity: 0.4; /* Further reduced opacity to make content more visible */
`;

const Blob = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.4;
  transition: all 10s ease-in-out;
  
  &:nth-child(1) {
    width: 400px;
    height: 400px;
    background: ${({ theme }) => theme.primaryLight};
    top: -100px;
    right: -100px;
    animation: float1 25s infinite alternate;
  }
  
  &:nth-child(2) {
    width: 300px;
    height: 300px;
    background: ${({ theme }) => theme.secondaryLight};
    bottom: -50px;
    left: -50px;
    animation: float2 20s infinite alternate;
  }
  
  &:nth-child(3) {
    width: 200px;
    height: 200px;
    background: ${({ theme }) => theme.greenLight};
    top: 40%;
    left: 30%;
    animation: float3 15s infinite alternate;
  }
  
  @keyframes float1 {
    0% {
      transform: translate(0, 0) scale(1);
    }
    50% {
      transform: translate(-50px, 50px) scale(1.1);
    }
    100% {
      transform: translate(50px, -30px) scale(0.9);
    }
  }
  
  @keyframes float2 {
    0% {
      transform: translate(0, 0) scale(1);
    }
    50% {
      transform: translate(60px, -40px) scale(1.1);
    }
    100% {
      transform: translate(-30px, 60px) scale(0.9);
    }
  }
  
  @keyframes float3 {
    0% {
      transform: translate(0, 0) scale(1);
    }
    50% {
      transform: translate(-40px, -30px) scale(1.1);
    }
    100% {
      transform: translate(40px, 30px) scale(0.9);
    }
  }
`;

const Grid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: 50px 50px;
  background-image: 
    linear-gradient(to right, ${({ theme }) => theme.shadow} 1px, transparent 1px),
    linear-gradient(to bottom, ${({ theme }) => theme.shadow} 1px, transparent 1px);
  opacity: 0.03;
`;

const AnimatedBackground = () => {
  return (
    <BackgroundContainer>
      <Blob />
      <Blob />
      <Blob />
      <Grid />
    </BackgroundContainer>
  );
};

export default AnimatedBackground;
