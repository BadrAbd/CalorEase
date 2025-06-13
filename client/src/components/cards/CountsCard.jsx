import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { cardHover } from "../../utils/animations";

const Card = styled(motion.div)`
  flex: 1;
  min-width: 200px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  display: flex;
  gap: 12px;
  z-index: 1;
  
  /* Enhanced Glassmorphism effect for better visibility */
  background: ${({ theme }) => theme.cardGlass.background};
  backdrop-filter: ${({ theme }) => theme.cardGlass.backdropFilter};
  border: ${({ theme }) => theme.cardGlass.border};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: ${({ theme }) => theme.transition.default};
  
  /* Stronger gradient overlay for better visibility */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    opacity: 0.85;
    background: ${({ gradient, theme }) => gradient || theme.cardGradient};
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 0.95;
  }
  
  /* Enhanced border glow on hover */
  &:hover {
    box-shadow: ${({ theme, color }) => theme.shadows.glow(color || theme.primary)};
    transform: translateY(-5px);
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 2;
  @media (max-width: 600px) {
    gap: 8px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme, color }) => color || theme.primary};
  letter-spacing: 0.5px;
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const Value = styled.div`
  font-weight: 700;
  font-size: 32px;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const Unit = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
  opacity: 0.8;
  font-weight: 500;
`;

const Span = styled(motion.div)`
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  @media (max-width: 600px) {
    font-size: 12px;
  }

  ${({ positive, theme }) =>
    positive
      ? `
  color: ${theme.green};
  background: ${theme.greenLight};
  `
      : `
  color: ${theme.red};
  background: ${theme.redLight};
  `}
  
  padding: 2px 8px;
  border-radius: 12px;
`;

const Icon = styled(motion.div)`
  height: fit-content;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: ${({ theme }) => theme.transition.default};
  
  ${({ color, bg, theme }) => `
  background: ${bg || theme.primaryLight};
  color: ${color || theme.primary};
  `}
`;

const Desc = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 6px;
  line-height: 1.4;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

// Subtle background pattern
const Pattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.03;
  background-image: radial-gradient(${({ theme }) => theme.text_primary} 1px, transparent 1px);
  background-size: 20px 20px;
`;

const CountsCard = ({ item, data = {} }) => {
  const valueRaw = data[item.key];
  const value = typeof valueRaw === "number" ? valueRaw.toFixed(2) : valueRaw ?? "--";
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={cardHover}
      color={item.color}
      gradient={item.gradient}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Pattern />
      <Left>
        <Title color={item.color}>{item.name}</Title>
        <Value>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              delay: 0.1 
            }}
          >
            {value}
          </motion.span>
          <Unit>{item.unit}</Unit>
          <Span 
            positive 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            +10%
          </Span>
        </Value>
        <Desc>{item.desc}</Desc>
      </Left>
      <Icon 
        animate={isHovered ? { 
          scale: 1.1, 
          rotate: [0, 5, -5, 0],
          transition: { duration: 0.5 }
        } : { scale: 1 }}
        color={item.color} 
        bg={item.lightColor}
      >
        {item.icon}
      </Icon>
    </Card>
  );
};

export default CountsCard;
