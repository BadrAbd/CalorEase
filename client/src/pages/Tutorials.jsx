import React, { useState } from "react";
import styled from "styled-components";
import { Close } from "@mui/icons-material";

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
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 0 20px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
`;

const TutorialCard = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.bg_secondary};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
  }
`;

const TutorialTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 10px;
`;

const TutorialDescription = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 15px;
  line-height: 1.5;
`;

const TutorialImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const TutorialButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.primary_dark};
  }
`;

const VideoModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const VideoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: ${({ theme }) => theme.bg_secondary};
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 20};
`;

const VideoTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  transition: all 0.3s ease;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const VideoFrame = styled.iframe`
  width: 100%;
  height: 500px;
  border: none;
  display: block;
  
  @media (max-width: 768px) {
    height: 350px;
  }
  
  @media (max-width: 480px) {
    height: 250px;
  }
`;

const tutorials = [
  {
    id: 1,
    title: "Proper Form for Squats",
    description: "Learn the correct technique for squats to maximize results and prevent injuries. This comprehensive guide covers everything from foot positioning to proper back alignment.",
    image: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    videoUrl: "https://www.youtube.com/embed/U3HlEF_E9fo",
    duration: "8:24",
    instructor: "Alex Fitness"
  },
  {
    id: 2,
    title: "Effective Cardio Workouts",
    description: "Discover the most effective cardio workouts to burn calories and improve cardiovascular health. This tutorial includes various intensity levels suitable for beginners to advanced.",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    videoUrl: "https://www.youtube.com/embed/50kH47ZztHs",
    duration: "12:35",
    instructor: "Sarah Cardio"
  },
  {
    id: 3,
    title: "Meal Planning for Fitness",
    description: "Learn how to create balanced meal plans that support your fitness goals. This guide covers macronutrient ratios, meal timing, and practical tips for meal prep.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    videoUrl: "https://www.youtube.com/embed/zJgHbifIx-Q",
    duration: "13:20",
    instructor: "Dr. Mike Nutrition"
  },
  {
    id: 4,
    title: "Strength Training Basics",
    description: "Master the fundamentals of strength training with this comprehensive tutorial. Learn about progressive overload, rest periods, and exercise selection for optimal results.",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    videoUrl: "https://www.youtube.com/embed/AeOh18mWWzg",
    duration: "10:15",
    instructor: "Mike Strength"
  },
];

const Tutorials = () => {
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  
  const openVideoModal = (tutorial) => {
    setSelectedTutorial(tutorial);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };
  
  const closeVideoModal = () => {
    setSelectedTutorial(null);
    // Restore scrolling when modal is closed
    document.body.style.overflow = 'auto';
  };
  
  return (
    <Container>
      <Wrapper>
        <Title>Fitness Tutorials</Title>
        {tutorials.map((tutorial) => (
          <TutorialCard key={tutorial.id}>
            <TutorialImage src={tutorial.image} alt={tutorial.title} />
            <TutorialTitle>{tutorial.title}</TutorialTitle>
            <TutorialDescription>{tutorial.description}</TutorialDescription>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TutorialButton onClick={() => openVideoModal(tutorial)}>Watch Tutorial</TutorialButton>
              <div style={{ color: '#666', fontSize: '14px' }}>
                <span style={{ marginRight: '10px' }}><strong>Duration:</strong> {tutorial.duration}</span>
                <span><strong>Instructor:</strong> {tutorial.instructor}</span>
              </div>
            </div>
          </TutorialCard>
        ))}
        
        {selectedTutorial && (
          <VideoModal onClick={closeVideoModal}>
            <VideoContainer onClick={(e) => e.stopPropagation()}>
              <VideoHeader>
                <VideoTitle>{selectedTutorial.title}</VideoTitle>
                <CloseButton onClick={closeVideoModal}>
                  <Close />
                </CloseButton>
              </VideoHeader>
              <VideoFrame 
                src={selectedTutorial.videoUrl} 
                title={selectedTutorial.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </VideoContainer>
          </VideoModal>
        )}
      </Wrapper>
    </Container>
  );
};

export default Tutorials;
