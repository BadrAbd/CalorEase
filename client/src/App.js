import { ThemeProvider, styled, createGlobalStyle } from "styled-components";
import { lightTheme } from "./utils/Themes";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Authentication from "./pages/Authentication";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Tutorials from "./pages/Tutorials";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import AnimatedBackground from "./components/AnimatedBackground";
import { AnimatePresence, motion } from "framer-motion";
import { pageTransition } from "./utils/animations";

// Global styles for scrollbars and other UI enhancements
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }
  
  body {
    overflow-x: hidden;
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text_primary};
  }
  
  /* Modern scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary + '50'};
    border-radius: 10px;
    transition: all 0.3s ease;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.primary + '80'};
  }
  
  /* Improved text selection */
  ::selection {
    background: ${({ theme }) => theme.primary + '40'};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const Container = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  position: relative;
  z-index: 1; /* Ensure container is above background */
  transition: ${({ theme }) => theme.transition.default};
`;

const PageContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
`;

// AnimatePresence wrapper for page transitions
const AnimatedRoutes = ({ children }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <PageContainer
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
      >
        {children}
      </PageContainer>
    </AnimatePresence>
  );
};

function App() {
  const { currentUser } = useSelector((state) => state.user);
  
  // Preload fonts
  useEffect(() => {
    // Load Inter font
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <AnimatedBackground />
        {currentUser ? (
          <Container
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar currentUser={currentUser} />
            <AnimatedRoutes>
              <Routes>
                <Route path="/" exact element={<Dashboard />} />
                <Route path="/workouts" exact element={<Workouts />} />
                <Route path="/tutorials" exact element={<Tutorials />} />
                <Route path="/blogs" exact element={<Blogs />} />
                <Route path="/contact" exact element={<Contact />} />
              </Routes>
            </AnimatedRoutes>
          </Container>
        ) : (
          <Container
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Authentication />
          </Container>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
