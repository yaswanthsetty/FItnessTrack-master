import React from 'react';
import styled from 'styled-components';

// Sample blog data with images
const blogPosts = [
  {
    id: 1,
    title: "The Benefits of Daily Exercise",
    content: "Daily exercise is essential for maintaining good health. It helps reduce the risk of chronic diseases, improves mental health, and boosts overall well-being. Incorporating various forms of exercise into your routine can lead to a healthier and more fulfilling life.",
    author: "John Doe",
    date: "August 15, 2024",
    image: "https://th.bing.com/th/id/OIP.w0wwF-0ZroZJwRncPn948wHaE8?w=256&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7", // Placeholder image URL
  },
  {
    id: 2,
    title: "How to Create a Balanced Workout Plan",
    content: "Creating a balanced workout plan involves combining different types of exercises, such as strength training, cardiovascular workouts, and flexibility exercises. It's important to tailor your plan to your fitness goals and ensure that you include rest days to prevent overtraining.",
    author: "Jane Smith",
    date: "August 10, 2024",
    image: "https://th.bing.com/th/id/OIP.5AnmhlLXLpLLHE35QOzlFgHaEK?w=303&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7", // Placeholder image URL
  },
  {
    id: 3,
    title: "Nutrition Tips for Fitness Enthusiasts",
    content: "Proper nutrition is crucial for supporting your fitness goals. Eating a balanced diet that includes adequate protein, healthy fats, and complex carbohydrates can help you build muscle, recover faster, and maintain energy levels. Hydration is also key to optimal performance.",
    author: "Emily Johnson",
    date: "August 5, 2024",
    image: "https://th.bing.com/th/id/OIP.ajq1lr8ghPy0rY4y5cyZEgHaE8?w=192&h=180&c=7&r=0&o=5&dpr=1.7&pid=1.7", // Placeholder image URL
  },
  {
    id: 4,
    title: "Effective Stress Management Techniques",
    content: "Stress management is crucial for maintaining mental health. Techniques such as mindfulness, meditation, and regular physical activity can help reduce stress levels and improve overall well-being. Finding the right methods for you can lead to a more balanced and fulfilling life.",
    author: "Michael Brown",
    date: "August 20, 2024",
    image: "https://community.thriveglobal.com/wp-content/uploads/2019/08/stress-managment-in-your-life.jpg", // Placeholder image URL
  },
  {
    id: 5,
    title: "Understanding the Role of Sleep in Fitness",
    content: "Sleep plays a vital role in fitness and overall health. Adequate rest helps the body recover from workouts, supports muscle growth, and maintains energy levels. Understanding the importance of sleep and implementing good sleep habits can enhance your fitness progress.",
    author: "Sarah Lee",
    date: "August 25, 2024",
    image: "https://th.bing.com/th/id/OIP.TVGuu4BwiuGGs4G1APTxfwHaHG?rs=1&pid=ImgDetMain", // Placeholder image URL
  },
];

// Styled Components

const Container = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: auto;
  background: ${({ theme }) => theme.bg_secondary};
  color: ${({ theme }) => theme.text_primary};
  overflow-y: auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 30px;
`;

const Post = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 10px;
  background: ${({ theme }) => theme.bg};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const PostTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 15px;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primaryHover};
  }
`;

const PostImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

const PostImage = styled.img`
  width: 80%; /* Decreased size of the image */
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s ease, opacity 0.3s ease;

  /* Initial zoom-out effect */
  transform: scale(0.95);

  &:hover {
    transform: scale(1.05); /* Zoom-in effect */
    opacity: 0.8; /* Slightly dim image on hover */
  }
`;

const PostContent = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const PostFooter = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

// Blog Component

const Blog = () => {
  return (
    <Container>
      <Title>Blog</Title>
      {blogPosts.map(post => (
        <Post key={post.id}>
          <PostImageWrapper>
            <PostImage src={post.image} alt={post.title} />
          </PostImageWrapper>
          <PostTitle>{post.title}</PostTitle>
          <PostContent>{post.content}</PostContent>
          <PostFooter>
            <span>By {post.author}</span>
            <span>{post.date}</span>
          </PostFooter>
        </Post>
      ))}
    </Container>
  );
};

export default Blog;