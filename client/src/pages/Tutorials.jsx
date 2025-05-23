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

const tutorials = [
  {
    id: 1,
    title: "Proper Form for Squats",
    description: "Learn the correct technique for squats to maximize results and prevent injuries. This comprehensive guide covers everything from foot positioning to proper back alignment.",
    image: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
  },
  {
    id: 2,
    title: "Effective Cardio Workouts",
    description: "Discover the most effective cardio workouts to burn calories and improve cardiovascular health. This tutorial includes various intensity levels suitable for beginners to advanced.",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
  },
  {
    id: 3,
    title: "Meal Planning for Fitness",
    description: "Learn how to create balanced meal plans that support your fitness goals. This guide covers macronutrient ratios, meal timing, and practical tips for meal prep.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 4,
    title: "Strength Training Basics",
    description: "Master the fundamentals of strength training with this comprehensive tutorial. Learn about progressive overload, rest periods, and exercise selection for optimal results.",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
];

const Tutorials = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Fitness Tutorials</Title>
        {tutorials.map((tutorial) => (
          <TutorialCard key={tutorial.id}>
            <TutorialImage src={tutorial.image} alt={tutorial.title} />
            <TutorialTitle>{tutorial.title}</TutorialTitle>
            <TutorialDescription>{tutorial.description}</TutorialDescription>
            <TutorialButton>Watch Tutorial</TutorialButton>
          </TutorialCard>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Tutorials;
