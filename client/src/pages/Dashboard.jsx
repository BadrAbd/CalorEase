import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { counts } from "../utils/data";
import CountsCard from "../components/cards/CountsCard";
import WeeklyStatCard from "../components/cards/WeeklyStatCard";
import CategoryChart from "../components/cards/CategoryChart";
import AddWorkout from "../components/AddWorkout";
import WorkoutCard from "../components/cards/WorkoutCard";
import { addWorkout, getDashboardDetails, getWorkouts } from "../api";
import { motion } from "framer-motion";
import { fadeIn, slideUp, staggerContainer, listAnimation, listItemAnimation, scaleUp } from "../utils/animations";
import { CircularProgress } from "@mui/material";

// Styled components with enhanced design
const Container = styled(motion.div)`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 30px 0px;
  overflow-y: auto;
  position: relative;
  z-index: 2;
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.03);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary + '40'};
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.primary + '70'};
  }
`;

const Wrapper = styled(motion.div)`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 0 20px;
  position: relative;
  
  @media (max-width: 768px) {
    gap: 20px;
    padding: 0 16px;
  }
`;

const PageHeader = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Title = styled(motion.h1)`
  font-size: 32px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 700;
  margin: 0;
  padding: 0px 16px;
  position: relative;
  display: inline-block;
  
  /* Gradient underline effect */
  &::after {
    content: '';
    position: absolute;
    left: 16px;
    bottom: -8px;
    width: 40px;
    height: 4px;
    border-radius: 2px;
    background: ${({ theme }) => theme.primaryGradient};
  }
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 24px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
  margin: 0;
  padding: 0px 16px;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const FlexWrap = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24px;
  padding: 0px 16px;
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const Section = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0px 16px;
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const CardWrapper = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  margin-bottom: 100px;
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 20px;
  color: ${({ theme }) => theme.text_secondary};
`;

const LoadingText = styled(motion.div)`
  font-size: 18px;
  font-weight: 500;
  margin-top: 16px;
  background: ${({ theme }) => theme.primaryGradient};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const EmptyState = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: ${({ theme }) => theme.cardGlass.background};
  backdrop-filter: ${({ theme }) => theme.cardGlass.backdropFilter};
  border: ${({ theme }) => theme.cardGlass.border};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  line-height: 1.6;
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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [workout, setWorkout] = useState(`#Legs
-Back Squat
-5 setsX15 reps
-30 kg
-10 min`);

  const dashboardData = async () => {
    setLoading(true);
    const token = localStorage.getItem("calorease-app-token");
    await getDashboardDetails(token).then((res) => {
      setData(res.data);
      setLoading(false);
    }).catch(err => {
      console.error("Error fetching dashboard data:", err);
      setLoading(false);
    });
  };
  
  const getTodaysWorkout = async () => {
    const token = localStorage.getItem("calorease-app-token");
    await getWorkouts(token, "").then((res) => {
      setTodaysWorkouts(res?.data?.todaysWorkouts || []);
    }).catch(err => {
      console.error("Error fetching today's workouts:", err);
    });
  };

  const addNewWorkout = async () => {
    setButtonLoading(true);
    const token = localStorage.getItem("calorease-app-token");
    await addWorkout(token, { workoutString: workout })
      .then((res) => {
        dashboardData();
        getTodaysWorkout();
        setButtonLoading(false);
      })
      .catch((err) => {
        console.error("Error adding workout:", err);
        setButtonLoading(false);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await dashboardData();
      await getTodaysWorkout();
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <LoadingContainer>
          <motion.div
            animate={{ 
              rotate: 360,
              transition: { duration: 1.5, repeat: Infinity, ease: "linear" }
            }}
          >
            <CircularProgress size={60} thickness={4} color="primary" />
          </motion.div>
          <LoadingText
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Loading your fitness data...
          </LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container
      variants={fadeIn}
      animate="visible"
    >
      <Wrapper variants={containerVariants}>
        <PageHeader variants={itemVariants}>
          <Title>Dashboard</Title>
        </PageHeader>
        
        <FlexWrap
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="visible"
        >
          {counts.map((item, index) => (
            <motion.div 
              key={item.key}
              variants={scaleUp}
              custom={index}
              style={{ flex: 1, minWidth: '200px' }}
            >
              <CountsCard item={item} data={data} />
            </motion.div>
          ))}
        </FlexWrap>

        <FlexWrap
          variants={staggerContainer(0.15)}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={slideUp} style={{ flex: 1, minWidth: '300px' }}>
            <WeeklyStatCard data={data} />
          </motion.div>
          <motion.div variants={slideUp} style={{ flex: 1, minWidth: '300px' }}>
            <CategoryChart data={data} />
          </motion.div>
          <motion.div variants={slideUp} style={{ flex: 1, minWidth: '300px' }}>
            <AddWorkout
              workout={workout}
              setWorkout={setWorkout}
              addNewWorkout={addNewWorkout}
              buttonLoading={buttonLoading}
            />
          </motion.div>
        </FlexWrap>

        <Section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <SectionTitle variants={itemVariants}>Today's Workouts</SectionTitle>
          
          {todaysWorkouts.length > 0 ? (
            <CardWrapper
              variants={listAnimation}
              initial="hidden"
              animate="visible"
            >
              {todaysWorkouts.map((workout, index) => (
                <motion.div 
                  key={workout._id || index}
                  variants={listItemAnimation}
                  style={{ width: '300px' }}
                >
                  <WorkoutCard workout={workout} />
                </motion.div>
              ))}
            </CardWrapper>
          ) : (
            <EmptyState
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                You haven't added any workouts today.
                <br />
                Add your first workout to start tracking your progress!
              </motion.p>
            </EmptyState>
          )}
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
