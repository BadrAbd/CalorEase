import React, { useState } from "react";
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

const ContactContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContactInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContactForm = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: ${({ theme }) => theme.bg_secondary};
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background-color: ${({ theme }) => theme.bg_secondary};
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const InfoValue = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  border-radius: 5px;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  background-color: ${({ theme }) => theme.bg};
  outline: none;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  border-radius: 5px;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  background-color: ${({ theme }) => theme.bg};
  outline: none;
  transition: border-color 0.3s ease;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
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
  
  &:disabled {
    background-color: ${({ theme }) => theme.text_secondary + 50};
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  padding: 15px;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const MapIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <Container>
      <Wrapper>
        <Title>Contact Us</Title>
        <ContactContainer>
          <ContactInfo>
            <InfoItem>
              <InfoIcon>📍</InfoIcon>
              <InfoText>
                <InfoTitle>Our Location</InfoTitle>
                <InfoValue>123 Fitness Street, Health City, CA 94103</InfoValue>
              </InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon>📞</InfoIcon>
              <InfoText>
                <InfoTitle>Phone Number</InfoTitle>
                <InfoValue>+1 (555) 123-4567</InfoValue>
              </InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon>✉️</InfoIcon>
              <InfoText>
                <InfoTitle>Email Address</InfoTitle>
                <InfoValue>support@calorease.com</InfoValue>
              </InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon>⏰</InfoIcon>
              <InfoText>
                <InfoTitle>Working Hours</InfoTitle>
                <InfoValue>Monday - Friday: 9AM - 6PM</InfoValue>
              </InfoText>
            </InfoItem>
          </ContactInfo>
          
          <ContactForm onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor="name">Your Name</Label>
              <Input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
                placeholder="Enter your full name"
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="email">Email Address</Label>
              <Input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required 
                placeholder="Enter your email address"
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="subject">Subject</Label>
              <Input 
                type="text" 
                id="subject" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required 
                placeholder="Enter message subject"
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required 
                placeholder="Type your message here..."
              />
            </InputGroup>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </SubmitButton>
            {isSubmitted && (
              <SuccessMessage>
                Your message has been sent successfully! We'll get back to you soon.
              </SuccessMessage>
            )}
          </ContactForm>
        </ContactContainer>
        
        <MapContainer>
          <MapIframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.95047235377!2d-122.43760255802945!3d37.75769481909747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1684932776752!5m2!1sen!2s" 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </MapContainer>
      </Wrapper>
    </Container>
  );
};

export default Contact;
