import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userSlice";
import { Menu, Close, FitnessCenter } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const Container = styled(motion.div)`
  width: 100%;
  height: 70px;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  
  /* Glassmorphism effect */
  background: ${({ theme, scrolled }) => 
    scrolled 
      ? theme.navbarGlass.background
      : 'rgba(36, 43, 63, 0.5)'};
  backdrop-filter: ${({ theme }) => theme.navbarGlass.backdropFilter};
  box-shadow: ${({ theme, scrolled }) => 
    scrolled 
      ? theme.navbarGlass.boxShadow
      : 'none'};
  border-bottom: ${({ theme, scrolled }) => 
    scrolled 
      ? theme.navbarGlass.border
      : 'none'};
  
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    height: 60px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 30px;
  @media (max-width: 768px) {
    padding: 0px 16px;
  }
`;

const Logo = styled(motion.div)`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.menu_primary_text};
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  letter-spacing: 0.5px;
  
  /* Text gradient effect */
  background: ${({ theme }) => theme.primaryGradient};
  /* gradient text cross-browser */
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  
  /* Text shadow for better visibility */
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const LogoImage = styled(motion.div)`
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: ${({ theme }) => theme.primaryGradient};
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-right: 8px;
  color: white;
  
  @media (max-width: 768px) {
    height: 32px;
    width: 32px;
  }
`;

const MenuIcon = styled(motion.div)`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    color: ${({ theme }) => theme.menu_primary_text};
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
  }
`;

const NavItems = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(motion.div)`
  position: relative;
  color: ${({ theme, active }) =>
    active ? theme.menu_primary_text : theme.menu_secondary_text};
  font-weight: ${({ active }) => (active ? "600" : "500")};
  cursor: pointer;
  padding: 6px 2px;
  transition: ${({ theme }) => theme.transition.default};
  
  &:hover {
    color: ${({ theme }) => theme.menu_primary_text};
  }
  
  /* Active indicator */
  ${({ active, theme }) => active && `
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 3px;
      background: ${theme.primaryGradient};
      border-radius: 4px;
    }
  `}
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background: ${({ theme }) => theme.popupGlass.background};
  backdrop-filter: ${({ theme }) => theme.popupGlass.backdropFilter};
  border-left: ${({ theme }) => theme.popupGlass.border};
  box-shadow: ${({ theme }) => theme.popupGlass.boxShadow};
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 30px 24px;
  z-index: 100;
`;

const CloseIcon = styled(motion.div)`
  position: absolute;
  top: 20px;
  right: 20px;
  color: ${({ theme }) => theme.menu_primary_text};
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme.transition.default};
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }
`;

const MobileMenuItems = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 50px;
`;

const MobileMenuItem = styled(motion.div)`
  color: ${({ theme, active }) =>
    active ? theme.menu_primary_text : theme.menu_secondary_text};
  font-weight: ${({ active }) => (active ? "600" : "500")};
  cursor: pointer;
  padding: 12px 16px;
  border-radius: 12px;
  transition: ${({ theme }) => theme.transition.default};
  background: ${({ active, theme }) => 
    active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  
  &:hover {
    color: ${({ theme }) => theme.menu_primary_text};
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(5px);
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 99;
`;

const LogoutButton = styled(motion.div)`
  color: ${({ theme }) => theme.menu_primary_text};
  font-weight: 500;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 30px;
  background: ${({ theme }) => theme.redGradient};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: ${({ theme }) => theme.transition.default};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
    transform: translateY(-2px);
  }
`;

// Animation variants
const mobileMenuVariants = {
  closed: { x: "100%", opacity: 0 },
  open: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30 
    }
  },
  exit: { 
    x: "100%", 
    opacity: 0,
    transition: { 
      duration: 0.3, 
      ease: "easeInOut" 
    }
  }
};

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
  exit: { opacity: 0 }
};

const menuItemVariants = {
  closed: { x: 20, opacity: 0 },
  open: i => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  })
};

const Navbar = ({ currentUser }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("calorease-app-token");
  };

  const menuItems = [
    { path: "/", name: "Dashboard" },
    { path: "/workouts", name: "Workouts" },
    { path: "/tutorials", name: "Tutorials" },
    { path: "/blogs", name: "Blogs" },
    { path: "/contact", name: "Contact" },
  ];

  return (
    <Container
      scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }}
    >
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Logo
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <LogoImage
              whileHover={{ rotate: 5, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FitnessCenter />
            </LogoImage>
            CalorEase
          </Logo>
        </Link>
        
        <MenuIcon 
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Menu />
        </MenuIcon>
        
        <NavItems>
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path} style={{ textDecoration: "none" }}>
              <NavItem 
                active={location.pathname === item.path}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.name}
              </NavItem>
            </Link>
          ))}
          
          <LogoutButton 
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </LogoutButton>
        </NavItems>
        
        <AnimatePresence>
          {open && (
            <>
              <Overlay 
                onClick={() => setOpen(false)}
                variants={overlayVariants}
                initial="closed"
                animate="open"
                exit="exit"
              />
              
              <MobileMenu
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="exit"
              >
                <CloseIcon 
                  onClick={() => setOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Close />
                </CloseIcon>
                
                <MobileMenuItems
                  initial="closed"
                  animate="open"
                >
                  {menuItems.map((item, i) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      style={{ textDecoration: "none" }}
                      onClick={() => setOpen(false)}
                    >
                      <MobileMenuItem 
                        active={location.pathname === item.path}
                        custom={i}
                        variants={menuItemVariants}
                      >
                        {item.name}
                      </MobileMenuItem>
                    </Link>
                  ))}
                  
                  <MobileMenuItem 
                    onClick={handleLogout}
                    custom={menuItems.length}
                    variants={menuItemVariants}
                    style={{ 
                      background: "rgba(239, 68, 68, 0.2)",
                      color: "#EF4444"
                    }}
                  >
                    Logout
                  </MobileMenuItem>
                </MobileMenuItems>
              </MobileMenu>
            </>
          )}
        </AnimatePresence>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
