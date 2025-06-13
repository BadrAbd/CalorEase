import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignUp } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";
import { motion } from "framer-motion";
import { LockOutlined, EmailOutlined, PersonOutline } from "@mui/icons-material";

const Container = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const HeaderContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled(motion.h1)`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
  position: relative;
  display: inline-block;
  
  /* Gradient text effect */
  background: ${({ theme }) => theme.primaryGradient};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Span = styled(motion.p)`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const FormContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TermsText = styled(motion.div)`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  margin-top: -8px;
  line-height: 1.5;
  
  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    font-weight: 600;
    transition: ${({ theme }) => theme.transition.default};
    
    &:hover {
      text-decoration: underline;
    }
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

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

const SignUp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateInputs = () => {
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    
    // Password strength validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    
    setError("");
    return true;
  };

  const handelSignUp = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      try {
        const response = await UserSignUp({ name, email, password });
        
        // Check if response exists and has data property
        if (response && response.data) {
          // Store token in localStorage
          localStorage.setItem("calorease-app-token", response.data.token);
          dispatch(loginSuccess(response.data));
        } else {
          // Handle case where response exists but doesn't have expected structure
          console.error("Invalid response format:", response);
          setError("Sign up successful, but there was an issue with the server response. Please try logging in.");
        }
      } catch (err) {
        console.error("Sign up error:", err);
        // Safely access error message if available
        const errorMessage = err.response?.data?.message || "An error occurred during sign up. Please try again.";
        setError(errorMessage);
      } finally {
        setLoading(false);
        setButtonDisabled(false);
      }
    } else {
      setLoading(false);
      setButtonDisabled(false);
    }
  };
  
  return (
    <Container
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <HeaderContainer variants={itemVariants}>
        <Title>Create New Account <span role="img" aria-label="wave">👋</span></Title>
        <Span>Please enter your details to get started</Span>
      </HeaderContainer>
      
      <FormContainer variants={containerVariants}>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              color: "#EF4444",
              fontSize: "14px",
              fontWeight: 500
            }}
          >
            {error}
          </motion.div>
        )}
        
        <motion.div variants={itemVariants}>
          <TextInput
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            handelChange={(e) => setName(e.target.value)}
            leftIcon={<PersonOutline style={{ color: '#94A3B8', fontSize: 20 }} />}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <TextInput
            label="Email Address"
            placeholder="Enter your email address"
            value={email}
            handelChange={(e) => setEmail(e.target.value)}
            leftIcon={<EmailOutlined style={{ color: '#94A3B8', fontSize: 20 }} />}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <TextInput
            label="Password"
            placeholder="Enter your password"
            password
            value={password}
            handelChange={(e) => setPassword(e.target.value)}
            leftIcon={<LockOutlined style={{ color: '#94A3B8', fontSize: 20 }} />}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <TermsText>
            By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
          </TermsText>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            text="Sign Up"
            onClick={handelSignUp}
            isLoading={loading}
            isDisabled={buttonDisabled}
            full
          />
        </motion.div>
      </FormContainer>
    </Container>
  );
};

export default SignUp;
