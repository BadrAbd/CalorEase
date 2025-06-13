import React, { useState } from "react";
import styled from "styled-components";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedBackground from "../components/AnimatedBackground";
import { FitnessCenter } from "@mui/icons-material";
import LogoImage from "../utils/Images/Logo.png";
import AuthImage from "../utils/Images/AuthImage.jpg";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.bgLight};
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Left = styled(motion.div)`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 30%;
  }
`;

const Right = styled(motion.div)`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.bgLight};
  box-shadow: ${({ theme }) => theme.shadows.card};
  position: relative;
  z-index: 2;
  
  /* Glassmorphism effect - scoped only to this component */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  @media (max-width: 768px) {
    width: 100%;
    height: 70%;
    box-shadow: 0px -20px 25px -5px rgba(0, 0, 0, 0.1);
    border-radius: 25px 25px 0 0;
  }
`;

const AuthCard = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  background: ${({ theme }) => theme.cardGlass.background};
  backdrop-filter: ${({ theme }) => theme.cardGlass.backdropFilter};
  border: ${({ theme }) => theme.cardGlass.border};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border-radius: 24px;
  padding: 40px;
  
  @media (max-width: 768px) {
    background: transparent;
    backdrop-filter: none;
    border: none;
    box-shadow: none;
    padding: 20px 0;
  }
`;

const Text = styled(motion.div)`
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 16px;
  line-height: 1.5;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

const TextButton = styled(motion.span)`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.default};
  font-weight: 600;
  position: relative;
  
  /* Underline effect */
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background: ${({ theme }) => theme.primaryGradient};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

// Background blobs
const Blob = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.2;
  z-index: -1;
  
  &:nth-child(1) {
    width: 300px;
    height: 300px;
    background: ${({ theme }) => theme.primaryLight};
    top: -100px;
    right: -50px;
  }
  
  &:nth-child(2) {
    width: 250px;
    height: 250px;
    background: ${({ theme }) => theme.secondaryLight};
    bottom: -50px;
    left: 20%;
  }
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.3
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2
    }
  }
};

const Authentication = () => {
  const [login, setLogin] = useState(false);
  
  return (
    <Container>
      <AnimatedBackground />
      
      <Left
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img 
          src={LogoImage} 
          alt="Logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            width: '120px',
            marginBottom: '20px',
            filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.15))'
          }}
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            width: '80%',
            height: '400px',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
            margin: '20px 0'
          }}
        >
          <motion.img 
            src={AuthImage} 
            alt="Authentication"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              transition: 'transform 0.5s ease'
            }}
            whileHover={{ scale: 1.05 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
          />
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '30px 20px 20px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
              color: 'white',
              textAlign: 'center'
            }}
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              style={{ margin: 0, fontSize: '22px', fontWeight: 600 }}
            >
              Track Your Fitness Journey
            </motion.h3>
          </motion.div>
        </motion.div>
      </Left>
      
      <Right
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {!login ? (
            <motion.div
              key="signin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <SignIn />
              <Text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Don't have an account?{" "}
                <TextButton 
                  onClick={() => setLogin(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </TextButton>
              </Text>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <SignUp />
              <Text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Already have an account?{" "}
                <TextButton 
                  onClick={() => setLogin(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </TextButton>
              </Text>
            </motion.div>
          )}
        </AnimatePresence>
      </Right>
    </Container>
  );
};

export default Authentication;
