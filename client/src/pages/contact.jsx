import React from "react";
import styled from "styled-components";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaInstagram } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 600px;
  margin: auto;
  background-color: ${({ theme }) => theme.background_secondary};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ThankYouMessage = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 1.2rem;
`;

const Icon = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.primary};
`;

const SocialMedia = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
`;

const SocialMediaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Contact = () => {
  return (
    <Container>
      <ThankYouMessage>Thank you for reaching out to us. We appreciate your interest and will get back to you soon!</ThankYouMessage>
      <Title>Contact Us</Title>
      <ContactInfo>
        <InfoItem>
          <Icon><FaEnvelope /></Icon>
          <a href="mailto:your-pixel@gmail.com">Team-pixel@gmail.com</a>
        </InfoItem>
        <InfoItem>
          <Icon><FaPhone /></Icon>
          <a href="tel:+1234567890">1234567890</a>
        </InfoItem>
        <InfoItem>
          <Icon><FaMapMarkerAlt /></Icon>
          <span>1234 Pixel Street, Imaginary City, IC 56789</span>
        </InfoItem>
        <SocialMediaContainer>
          <SocialMedia>
            <a href="https://www.facebook.com/virat.kohli?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/mahi7781/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </SocialMedia>
          <span>Follow us on social media</span>
        </SocialMediaContainer>
      </ContactInfo>
    </Container>
  );
};

export default Contact;