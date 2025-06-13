import React, { useState } from "react";
import styled from "styled-components";
import { Visibility, VisibilityOff, CloseRounded, ErrorOutline } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Label = styled(motion.label)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme, error }) => error ? theme.error : theme.text_secondary};
  margin-left: 4px;
  transition: ${({ theme }) => theme.transition.default};
  
  ${({ small }) =>
    small &&
    `
    font-size: 12px;
  `}
`;

const InputWrapper = styled(motion.div)`
  border: 2px solid ${({ theme, focused, error }) => 
    error ? theme.error : focused ? theme.primary : theme.text_secondary + '30'};
  border-radius: 12px;
  padding: 0px 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.card};
  gap: 12px;
  transition: ${({ theme }) => theme.transition.default};
  position: relative;
  overflow: hidden;
  box-shadow: ${({ theme, focused, error }) => 
    error ? `0 0 0 1px ${theme.error}20` : focused ? theme.shadows.inputFocused : 'none'};
  
  /* Glassmorphism effect */
  backdrop-filter: blur(8px);
  
  &:hover {
    border-color: ${({ theme, focused, error }) => 
      error ? theme.error : focused ? theme.primary : theme.text_secondary + '70'};
  }
  
  /* Animation for focus state */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ theme, error }) => error ? theme.error : theme.primaryGradient};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s ease;
  }
  
  ${({ focused }) =>
    focused &&
    `
    &::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  `}
  
  ${({ small }) =>
    small &&
    `
    border-radius: 8px;
    padding: 0px 12px;
  `}
  
  ${({ chipableInput, height }) =>
    chipableInput &&
    `
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 12px;
    min-height: ${height || '80px'};
  `}
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  font-size: 15px;
  flex: 1;
  width: 100%;
  color: ${({ theme }) => theme.text_primary};
  padding: 16px 0px;
  outline: none;
  transition: ${({ theme }) => theme.transition.default};
  
  &::placeholder {
    color: ${({ theme }) => theme.text_secondary + '80'};
    transition: ${({ theme }) => theme.transition.default};
  }
  
  &:focus {
    outline: none;
    
    &::placeholder {
      color: ${({ theme }) => theme.text_secondary + 'B0'};
    }
  }
  
  ${({ small }) =>
    small &&
    `
    font-size: 13px;
    padding: 12px 0px;
  `}
  
  ${({ as }) =>
    as === "textarea" &&
    `
  resize: none;
  min-height: 60px;
  `}
`;

const ErrorMessage = styled(motion.div)`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.error};
  margin-top: 4px;
  margin-left: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  
  ${({ small }) =>
    small &&
    `
    font-size: 10px;
  `}
`;

const IconButton = styled(motion.div)`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme, focused }) => focused ? theme.primary : theme.text_secondary};
  border-radius: 50%;
  padding: 4px;
  transition: ${({ theme }) => theme.transition.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.text_secondary + '20'};
    color: ${({ theme }) => theme.primary};
  }
`;

const LeftIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, focused }) => 
    focused ? theme.primary : theme.text_secondary};
  transition: ${({ theme }) => theme.transition.default};
`;

const ChipWrapper = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  padding: 4px 0;
`;

const Chip = styled(motion.div)`
  padding: 6px 12px;
  border-radius: 20px;
  background: ${({ theme }) => theme.primary + '15'};
  color: ${({ theme }) => theme.primary};
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: default;
  transition: ${({ theme }) => theme.transition.default};
  box-shadow: ${({ theme }) => theme.shadows.chip};
  
  &:hover {
    background: ${({ theme }) => theme.primary + '25'};
  }
  
  svg {
    cursor: pointer;
    font-size: 16px;
    opacity: 0.7;
    transition: ${({ theme }) => theme.transition.default};
    
    &:hover {
      opacity: 1;
      color: ${({ theme }) => theme.error};
    }
  }
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

const inputVariants = {
  focus: { 
    scale: 1.01,
    transition: { duration: 0.2 }
  },
  blur: { 
    scale: 1,
    transition: { duration: 0.2 }
  }
};

const errorVariants = {
  initial: { opacity: 0, y: -10, height: 0 },
  animate: { 
    opacity: 1, 
    y: 0,
    height: 'auto',
    transition: { 
      type: "spring", 
      stiffness: 500, 
      damping: 30 
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    height: 0,
    transition: { duration: 0.2 }
  }
};

const chipVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25
    }
  },
  exit: { 
    scale: 0.8, 
    opacity: 0,
    transition: { duration: 0.2 }
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  }
};

const TextInput = ({
  label,
  placeholder,
  name,
  value,
  error,
  handelChange,
  textArea,
  rows,
  columns,
  chipableInput,
  chipableArray = [],
  removeChip,
  height,
  small,
  popup,
  password,
  leftIcon,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  
  return (
    <Container
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Label 
        small={small} 
        error={error}
        animate={{
          color: error ? props.theme?.error : 
                 focused ? props.theme?.primary : 
                 props.theme?.text_secondary,
          y: focused ? -2 : 0
        }}
      >
        {label}
      </Label>
      
      <InputWrapper 
        focused={focused} 
        error={error}
        small={small}
        chipableInput={chipableInput}
        height={height}
        variants={inputVariants}
        animate={focused ? "focus" : "blur"}
      >
        {chipableInput ? (
          <ChipWrapper layout>
            <AnimatePresence>
              {chipableArray.map((chip, index) => (
                <Chip 
                  key={index}
                  variants={chipVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  whileHover="hover"
                  layout
                >
                  <span>{chip}</span>
                  <CloseRounded
                    onClick={() => removeChip(name, index)}
                  />
                </Chip>
              ))}
            </AnimatePresence>
            <Input
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={(e) => handelChange(e)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              small={small}
              style={{ padding: '8px 0' }}
            />
          </ChipWrapper>
        ) : (
          <>
            {leftIcon && (
              <LeftIconWrapper focused={focused}>
                {leftIcon}
              </LeftIconWrapper>
            )}
            
            <Input
              as={textArea ? "textarea" : "input"}
              name={name}
              rows={rows}
              columns={columns}
              placeholder={placeholder}
              value={value}
              onChange={(e) => handelChange(e)}
              type={password ? (showPassword ? "text" : "password") : "text"}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              small={small}
              {...props}
            />
            
            {password && (
              <IconButton 
                focused={focused}
                onClick={() => setShowPassword(!showPassword)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            )}
          </>
        )}
      </InputWrapper>
      
      <AnimatePresence>
        {error && (
          <ErrorMessage
            variants={errorVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            small={small}
          >
            <ErrorOutline style={{ fontSize: small ? '14px' : '16px' }} />
            {error}
          </ErrorMessage>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default TextInput;
