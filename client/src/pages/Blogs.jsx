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

const BlogsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
`;

const BlogCard = styled.div`
  background-color: ${({ theme }) => theme.bg_secondary};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const BlogContent = styled.div`
  padding: 20px;
`;

const BlogTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 10px;
`;

const BlogDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 15px;
  line-height: 1.5;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const BlogAuthor = styled.span`
  font-weight: 500;
`;

const BlogDate = styled.span``;

const ReadMoreButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.primary_dark};
  }
`;

const blogs = [
  {
    id: 1,
    title: "How to Stay Motivated in Your Fitness Journey",
    description: "Discover effective strategies to maintain motivation and consistency in your fitness routine, even when life gets busy.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    author: "Sarah Johnson",
    date: "May 15, 2025",
  },
  {
    id: 2,
    title: "The Science Behind Calorie Tracking",
    description: "Learn the scientific principles behind calorie tracking and how to use this knowledge to achieve your weight management goals.",
    image: "https://images.unsplash.com/photo-1579722820258-c35e2984bf0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    author: "Dr. Michael Chen",
    date: "May 10, 2025",
  },
  {
    id: 3,
    title: "5 Common Fitness Myths Debunked",
    description: "Separate fact from fiction as we debunk common fitness myths that might be hindering your progress and results.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    author: "James Wilson",
    date: "May 5, 2025",
  },
  {
    id: 4,
    title: "Balancing Nutrition for Optimal Performance",
    description: "Explore the importance of balanced nutrition and how it affects your workout performance and recovery.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    author: "Emma Rodriguez",
    date: "April 28, 2025",
  },
  {
    id: 5,
    title: "The Mental Health Benefits of Regular Exercise",
    description: "Discover how regular physical activity can improve your mental health, reduce stress, and enhance overall well-being.",
    image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    author: "Dr. Lisa Thompson",
    date: "April 20, 2025",
  },
  {
    id: 6,
    title: "Building a Sustainable Fitness Routine",
    description: "Learn how to create a fitness routine that you can maintain long-term without burnout or plateaus.",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    author: "Alex Parker",
    date: "April 15, 2025",
  },
];

const Blogs = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Fitness Blogs</Title>
        <BlogsContainer>
          {blogs.map((blog) => (
            <BlogCard key={blog.id}>
              <BlogImage src={blog.image} alt={blog.title} />
              <BlogContent>
                <BlogTitle>{blog.title}</BlogTitle>
                <BlogDescription>{blog.description}</BlogDescription>
                <ReadMoreButton>Read More</ReadMoreButton>
                <BlogMeta>
                  <BlogAuthor>{blog.author}</BlogAuthor>
                  <BlogDate>{blog.date}</BlogDate>
                </BlogMeta>
              </BlogContent>
            </BlogCard>
          ))}
        </BlogsContainer>
      </Wrapper>
    </Container>
  );
};

export default Blogs;
