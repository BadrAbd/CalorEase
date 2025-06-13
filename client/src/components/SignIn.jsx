import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignIn } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";
import { motion } from "framer-motion";
import { LockOutlined, EmailOutlined } from "@mui/icons-material";

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

const ForgotPassword = styled(motion.div)`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: right;
  margin-top: -12px;
  cursor: pointer;
  font-weight: 500;
  transition: ${({ theme }) => theme.transition.default};
  
  &:hover {
    text-decoration: underline;
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

const SignIn = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateInputs = () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    
    setError("");
    return true;
  };

  const handelSignIn = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      try {
        const response = await UserSignIn({ email, password });
        
        // Check if response exists and has data property
        if (response && response.data) {
          // Store token in localStorage
          localStorage.setItem("calorease-app-token", response.data.token);
          dispatch(loginSuccess(response.data));
        } else {
          // Handle case where response exists but doesn't have expected structure
          console.error("Invalid response format:", response);
          setError("Sign in successful, but there was an issue with the server response.");
        }
      } catch (err) {
        console.error("Sign in error:", err);
        // Safely access error message if available
        const errorMessage = err.response?.data?.message || "An error occurred during sign in. Please try again.";
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
        <Title>Welcome Back <span role="img" aria-label="wave">👋</span></Title>
        <Span>Please enter your details to sign in</Span>
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
          <ForgotPassword whileHover={{ scale: 1.03 }}>
            Forgot password?
          </ForgotPassword>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            text="Sign In"
            onClick={handelSignIn}
            isLoading={loading}
            isDisabled={buttonDisabled}
            full
          />
        </motion.div>
      </FormContainer>
    </Container>
  );
};

export default SignIn;
