import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const ButtonContainer = styled(motion.button)`
  border-radius: 12px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.default};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: min-content;
  padding: 16px 28px;
  border: none;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
  
  /* Default gradient background */
  background: ${({ theme, type }) => 
    type === "secondary" ? theme.secondaryGradient : theme.primaryGradient};
  
  /* Modern shadow effect */
  box-shadow: ${({ theme, outlined }) => 
    outlined ? 'none' : theme.shadows.button};
  
  /* Responsive adjustments */
  @media (max-width: 600px) {
    padding: 14px 20px;
    font-size: 14px;
  }

  /* Button types */
  ${({ type, theme, outlined }) =>
    outlined && type === "secondary"
      ? `
      background: transparent;
      color: ${theme.secondary};
      border: 2px solid ${theme.secondary};
      box-shadow: none;
      `
      : outlined
      ? `
      background: transparent;
      color: ${theme.primary};
      border: 2px solid ${theme.primary};
      box-shadow: none;
      `
      : ''
  }

  /* Disabled state */
  ${({ isDisabled, isLoading }) =>
    (isDisabled || isLoading) &&
    `
    opacity: 0.7;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  `}
  
  /* Layout variants */
  ${({ flex }) =>
    flex &&
    `
    flex: 1;
  `}

  ${({ small }) =>
    small &&
    `
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 10px;
  `}
  
  ${({ full }) =>
    full &&
    `
    width: 100%;
  `}
  
  /* Hover effect - gradient shift */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.1)
    );
    transition: left 0.8s ease;
    z-index: 1;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  /* Content positioning */
  & > * {
    position: relative;
    z-index: 2;
  }
`;

const LoadingDots = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
`;

const Dot = styled(motion.span)`
  width: 4px;
  height: 4px;
  background-color: currentColor;
  border-radius: 50%;
  margin: 0 2px;
`;

// Button animation variants
const buttonVariants = {
  hover: { 
    scale: 1.03,
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.97,
    transition: { duration: 0.1 }
  },
  disabled: {
    scale: 1,
    opacity: 0.7
  }
};

// Loading dots animation
const dotsVariants = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const dotVariants = {
  initial: { y: 0, opacity: 0.5 },
  animate: { 
    y: [-3, 0, -3],
    opacity: [0.5, 1, 0.5],
    transition: { 
      repeat: Infinity, 
      duration: 0.8
    }
  }
};

const Button = ({
  text,
  isLoading,
  isDisabled,
  rightIcon,
  leftIcon,
  type,
  onClick,
  flex,
  small,
  outlined,
  full,
}) => {
  return (
    <ButtonContainer
      as={motion.button}
      onClick={() => !isDisabled && !isLoading && onClick()}
      isDisabled={isDisabled}
      type={type}
      isLoading={isLoading}
      flex={flex}
      small={small}
      outlined={outlined}
      full={full}
      variants={buttonVariants}
      whileHover={!isDisabled && !isLoading ? "hover" : "disabled"}
      whileTap={!isDisabled && !isLoading ? "tap" : "disabled"}
      initial={"initial"}
      animate={isDisabled || isLoading ? "disabled" : "initial"}
    >
      {isLoading && (
        <CircularProgress
          size={small ? 16 : 20}
          thickness={4}
          style={{ color: "inherit" }}
        />
      )}
      {leftIcon && !isLoading && leftIcon}
      {text}
      {isLoading && (
        <LoadingDots
          variants={dotsVariants}
          initial="initial"
          animate="animate"
        >
          <Dot variants={dotVariants} />
          <Dot variants={dotVariants} />
          <Dot variants={dotVariants} />
        </LoadingDots>
      )}
      {rightIcon && !isLoading && rightIcon}
    </ButtonContainer>
  );
};

export default Button;
