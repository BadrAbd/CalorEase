import React, { useState } from "react";
import styled from "styled-components";
import { Close } from "@mui/icons-material";

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

const BlogsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
`;

const BlogCard = styled.div`
  background-color: ${({ theme }) => theme.bg_secondary};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const BlogContent = styled.div`
  padding: 20px;
`;

const BlogTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 10px;
`;

const BlogDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 15px;
  line-height: 1.5;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const BlogAuthor = styled.span`
  font-weight: 500;
`;

const BlogDate = styled.span``;

const ReadMoreButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.primary_dark};
  }
`;

const BlogModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
`;

const BlogModalContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`;

const BlogModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: ${({ theme }) => theme.bg_secondary};
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 20};
`;

const BlogModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  transition: all 0.3s ease;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const BlogModalContent = styled.div`
  padding: 20px;
  overflow-y: auto;
`;

const BlogModalImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const BlogModalText = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
`;

const BlogModalMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding-top: 15px;
  border-top: 1px solid ${({ theme }) => theme.text_secondary + 20};
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const BlogModalAuthor = styled.span`
  font-weight: 500;
`;

const BlogModalDate = styled.span``;

const blogs = [
  {
    id: 1,
    title: "How to Stay Motivated in Your Fitness Journey",
    description: "Discover effective strategies to maintain motivation and consistency in your fitness routine, even when life gets busy.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    author: "Sarah Johnson",
    date: "May 15, 2025",
    content: `<p>Maintaining motivation throughout your fitness journey can be challenging, especially when life gets busy or results seem slow. However, with the right strategies and mindset, you can stay consistent and achieve your fitness goals.</p>

<h3>Set Clear, Realistic Goals</h3>
<p>One of the most important aspects of staying motivated is having clear, achievable goals. Instead of vague objectives like "get fit" or "lose weight," set specific, measurable targets such as "run a 5K in under 30 minutes" or "do 10 push-ups without stopping." Break larger goals into smaller milestones that you can celebrate along the way.</p>

<h3>Find Your 'Why'</h3>
<p>Understanding the deeper reason behind your fitness journey can be a powerful motivator. Are you exercising to improve your health, set a good example for your children, or boost your confidence? When motivation wanes, reconnecting with your 'why' can help you push through difficult moments.</p>

<h3>Create a Routine That Works for You</h3>
<p>The best fitness routine is one that you can stick to consistently. Consider your schedule, preferences, and lifestyle when planning your workouts. If you're not a morning person, don't force yourself to wake up at 5 AM to exercise. Instead, find a time that works better for you, whether it's during lunch breaks or in the evening.</p>

<h3>Track Your Progress</h3>
<p>Keeping track of your workouts, measurements, and how you feel can provide tangible evidence of your progress. Use a fitness app, journal, or take regular photos to document your journey. On days when motivation is low, looking back at how far you've come can reignite your drive.</p>

<h3>Find Accountability</h3>
<p>Having someone to hold you accountable can significantly increase your chances of sticking to your fitness routine. This could be a workout buddy, personal trainer, or even an online community. Sharing your goals and progress with others creates a sense of responsibility and support.</p>

<h3>Mix It Up</h3>
<p>Doing the same workouts repeatedly can lead to boredom and plateaus. Keep your routine fresh by trying new exercises, classes, or activities. This not only challenges your body in different ways but also keeps your mind engaged and excited about fitness.</p>

<h3>Celebrate Small Wins</h3>
<p>Don't wait until you've reached your ultimate goal to celebrate. Acknowledge and reward yourself for consistent effort and small improvements along the way. These celebrations reinforce positive behavior and make the journey more enjoyable.</p>

<h3>Be Kind to Yourself</h3>
<p>Everyone has setbacks and off days. Instead of beating yourself up when you miss a workout or indulge in unhealthy foods, practice self-compassion. Learn from these moments, then refocus and move forward with renewed determination.</p>

<p>Remember, motivation isn't constant—it ebbs and flows. By implementing these strategies and focusing on consistency rather than perfection, you can maintain long-term motivation and make fitness a sustainable part of your lifestyle.</p>`
  },
  {
    id: 3,
    title: "5 Common Fitness Myths Debunked",
    description: "Separate fact from fiction as we debunk common fitness myths that might be hindering your progress and results.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    author: "James Wilson",
    date: "May 5, 2025",
    content: `<p>In the world of fitness, misinformation spreads quickly and can lead people astray from their goals. Let's examine five persistent fitness myths and reveal the truth behind them.</p>

<h3>Myth #1: No Pain, No Gain</h3>
<p>The belief that exercise must be painful to be effective is not only false but potentially dangerous. While challenging yourself is important, pain is your body's warning signal that something is wrong. Effective workouts should feel challenging but not painful. Discomfort and muscle fatigue are normal, but sharp pain, especially in joints, is not. Pushing through pain can lead to injuries that set back your progress significantly.</p>

<h3>Myth #2: Cardio Is the Best Way to Lose Weight</h3>
<p>Many people believe endless hours of cardio is the key to weight loss. In reality, a combination of strength training and cardio typically yields better results. Strength training builds muscle, which increases your resting metabolic rate, meaning you burn more calories even when not exercising. Additionally, diet plays a much larger role in weight loss than exercise alone—you cannot outrun a poor diet.</p>

<h3>Myth #3: You Can Spot-Reduce Fat</h3>
<p>The idea that you can target fat loss from specific body areas by exercising those parts (like doing crunches to lose belly fat) is one of the most persistent myths. When your body burns fat, it does so systemically—from the entire body—not just from the area being exercised. Genetics largely determines where you lose fat first and last. A comprehensive fitness program and proper nutrition are the keys to overall fat loss.</p>

<h3>Myth #4: Women Will Get Bulky from Lifting Weights</h3>
<p>Many women avoid strength training due to fears of developing a bulky, masculine physique. This fear is unfounded. Women typically have lower testosterone levels than men, making it much harder to build significant muscle mass. What strength training will do for women is create a toned, defined appearance, improve bone density, and enhance overall health. Building substantial muscle requires specific training, nutrition, and sometimes years of dedicated effort.</p>

<h3>Myth #5: More Exercise Is Always Better</h3>
<p>The "more is better" approach can actually hinder progress. Your body needs adequate recovery time to repair and strengthen. Overtraining can lead to decreased performance, increased injury risk, hormonal imbalances, and mental burnout. Quality and consistency matter more than quantity. Strategic rest days are essential components of effective fitness programs, not setbacks or signs of laziness.</p>

<p>By understanding the science behind these common misconceptions, you can make more informed decisions about your fitness routine and set realistic expectations for your journey. Remember that sustainable fitness is about finding what works for your body and lifestyle, not following rigid rules based on myths.</p>`
  },
  {
    id: 4,
    title: "Balancing Nutrition for Optimal Performance",
    description: "Explore the importance of balanced nutrition and how it affects your workout performance and recovery.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    author: "Emma Rodriguez",
    date: "April 28, 2025",
    content: `<p>Proper nutrition is the foundation of athletic performance and fitness progress. What you eat directly impacts your energy levels, recovery time, and overall results. Let's explore how to balance your nutrition for optimal performance.</p>

<h3>Understanding Macronutrients</h3>
<p>The three macronutrients—protein, carbohydrates, and fats—each play vital roles in your body's functioning and athletic performance.</p>

<h4>Protein</h4>
<p>Protein is essential for muscle repair and growth. After exercise, your muscles develop micro-tears that require protein to rebuild stronger than before. For active individuals, aim for 1.2-2.0 grams of protein per kilogram of body weight daily, spread throughout the day. Good sources include lean meats, fish, eggs, dairy, legumes, and plant-based options like tofu and tempeh.</p>

<h4>Carbohydrates</h4>
<p>Carbohydrates are your body's primary energy source, especially for high-intensity activities. They fuel your workouts and replenish glycogen stores afterward. Complex carbohydrates like whole grains, fruits, vegetables, and legumes provide sustained energy and important nutrients. The timing of carbohydrate consumption can be strategic—higher amounts before and after intense workouts, and moderate amounts on rest days.</p>

<h4>Fats</h4>
<p>Healthy fats support hormone production, vitamin absorption, and provide energy for lower-intensity activities. Include sources of unsaturated fats like avocados, nuts, seeds, and olive oil in your diet. Even saturated fats have their place in a balanced diet, though they should be consumed in moderation.</p>

<h3>Micronutrients Matter</h3>
<p>Vitamins and minerals might be needed in smaller quantities, but they're crucial for energy production, oxygen transport, bone health, and immune function. A diet rich in colorful fruits and vegetables, whole grains, and quality protein sources typically provides adequate micronutrients. Pay special attention to:</p>

<ul>
<li><strong>Iron:</strong> Essential for oxygen transport, especially important for female athletes</li>
<li><strong>Calcium and Vitamin D:</strong> Critical for bone health and muscle function</li>
<li><strong>B vitamins:</strong> Important for energy metabolism</li>
<li><strong>Magnesium:</strong> Supports muscle function and recovery</li>
</ul>

<h3>Hydration: The Overlooked Nutrient</h3>
<p>Even mild dehydration can significantly impair performance. Water regulates body temperature, lubricates joints, and transports nutrients. Aim to drink water consistently throughout the day, not just during workouts. For longer or more intense sessions, consider electrolyte replacement, especially if you're sweating heavily.</p>

<h3>Nutrient Timing</h3>
<p>When you eat can be almost as important as what you eat:</p>

<h4>Pre-workout</h4>
<p>Eat a balanced meal 2-3 hours before exercise, or a smaller snack 30-60 minutes before. Focus on easily digestible carbohydrates with moderate protein and low fat to fuel your workout without causing digestive discomfort.</p>

<h4>During workout</h4>
<p>For sessions lasting longer than 60-90 minutes, consuming carbohydrates during exercise can help maintain energy levels and performance.</p>

<h4>Post-workout</h4>
<p>The recovery window (within 30-60 minutes after exercise) is ideal for consuming protein and carbohydrates to jumpstart muscle repair and glycogen replenishment.</p>

<h3>Individualization Is Key</h3>
<p>While these guidelines provide a starting point, nutrition needs vary based on your specific goals, body type, activity level, and even genetics. Pay attention to how your body responds to different foods and adjust accordingly. Consider working with a registered dietitian who specializes in sports nutrition for personalized guidance.</p>

<p>Remember that nutrition is not about perfection but consistency. The occasional indulgence won't derail your progress, just as one perfect meal won't instantly transform your performance. Focus on developing sustainable eating habits that support both your fitness goals and overall health.</p>`
  },
  {
    id: 5,
    title: "The Mental Health Benefits of Regular Exercise",
    description: "Discover how regular physical activity can improve your mental health, reduce stress, and enhance overall well-being.",
    image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    author: "Dr. Lisa Thompson",
    date: "April 20, 2025",
    content: `<p>While the physical benefits of exercise are well-documented, the profound impact of regular physical activity on mental health is equally significant. Exercise isn't just about building muscle or losing weight—it's a powerful tool for improving mood, reducing anxiety, and enhancing overall psychological well-being.</p>

<h3>The Science Behind Exercise and Mental Health</h3>
<p>When you exercise, your body releases a cascade of biochemical reactions that directly affect your brain and mood:</p>

<h4>Endorphins and Mood Enhancement</h4>
<p>Physical activity stimulates the production of endorphins, often referred to as "feel-good" neurotransmitters. These natural chemicals create feelings of happiness and euphoria, which explains the phenomenon known as "runner's high." Even moderate exercise can trigger this response, providing immediate mood elevation.</p>

<h4>Stress Reduction</h4>
<p>Exercise reduces levels of the body's stress hormones, such as adrenaline and cortisol. Simultaneously, it stimulates the production of endorphins, which act as natural painkillers and mood elevators. This combination helps alleviate tension and promote relaxation.</p>

<h4>Brain Structure and Function</h4>
<p>Regular physical activity promotes neuroplasticity—the brain's ability to form new neural connections. Exercise increases the production of brain-derived neurotrophic factor (BDNF), a protein that supports the growth of new neurons and helps existing brain cells survive. These changes can improve cognitive function and protect against neurodegenerative diseases.</p>

<h3>Exercise as Treatment for Mental Health Conditions</h3>

<h4>Depression</h4>
<p>Multiple studies have shown that exercise can be as effective as medication for mild to moderate depression. A consistent exercise routine helps combat depressive symptoms by increasing serotonin (which helps regulate mood) and stimulating neural growth. For some individuals, exercise serves as a valuable complement to traditional treatments like therapy and medication.</p>

<h4>Anxiety</h4>
<p>Physical activity reduces anxiety sensitivity—the fear of anxiety-related sensations. During exercise, you experience increased heart rate, sweating, and rapid breathing—similar to anxiety symptoms—but in a controlled, positive context. This helps your body learn that these sensations aren't dangerous, potentially reducing panic reactions in other situations.</p>

<h4>ADHD</h4>
<p>Exercise immediately boosts dopamine, norepinephrine, and serotonin levels—affecting focus and attention. For people with ADHD, regular physical activity can help improve concentration, motivation, memory, and mood.</p>

<h3>Psychological Benefits Beyond Clinical Conditions</h3>

<h4>Improved Self-Esteem and Confidence</h4>
<p>Setting and achieving fitness goals—whether it's running a mile without stopping, mastering a yoga pose, or lifting a heavier weight—creates a sense of accomplishment. These achievements, combined with improved physical appearance and health, can significantly boost self-confidence and body image.</p>

<h4>Better Sleep</h4>
<p>Regular exercise helps regulate your sleep patterns, leading to deeper, more restful sleep. Quality sleep is crucial for mental health, affecting everything from emotional regulation to cognitive function.</p>

<h4>Social Connection</h4>
<p>Many forms of exercise provide opportunities for social interaction—whether it's joining a running club, taking a group fitness class, or playing team sports. These social connections combat feelings of isolation and loneliness, which are risk factors for depression and anxiety.</p>

<h3>Finding Your Mental Health Exercise Prescription</h3>
<p>The type of exercise that benefits your mental health most is the one you enjoy and will do consistently. Consider these guidelines:</p>

<ul>
<li><strong>Aim for regularity:</strong> Consistency matters more than intensity. Even short, moderate sessions can provide mental health benefits.</li>
<li><strong>Mix it up:</strong> Combine cardiovascular exercise, strength training, and flexibility work for comprehensive benefits.</li>
<li><strong>Mind-body exercises:</strong> Activities like yoga, tai chi, and Pilates incorporate mindfulness, which offers additional stress-reduction benefits.</li>
<li><strong>Outdoor activity:</strong> Exercising in natural settings can amplify mental health benefits through exposure to nature.</li>
</ul>

<p>Remember that exercise is not a panacea for serious mental health conditions, but rather an important component of a comprehensive approach to mental wellness. If you're struggling with mental health issues, consider consulting with healthcare professionals who can help you develop an appropriate treatment plan that may include physical activity.</p>

<p>By making regular exercise a priority, you're not just investing in your physical health—you're nurturing your mind and emotional well-being for a more balanced, fulfilling life.</p>`
  },
  {
    id: 6,
    title: "Building a Sustainable Fitness Routine",
    description: "Learn how to create a fitness routine that you can maintain long-term without burnout or plateaus.",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    author: "Alex Parker",
    date: "April 15, 2025",
    content: `<p>Creating a fitness routine that stands the test of time requires more than just motivation—it demands a strategic approach that balances effectiveness with sustainability. Many people start fitness journeys with enthusiasm only to abandon them weeks later due to burnout, boredom, or unrealistic expectations. Let's explore how to build a fitness routine that you can maintain for years to come.</p>

<h3>Start Where You Are, Not Where You Want to Be</h3>
<p>One of the biggest mistakes in fitness is trying to do too much, too soon. If you're new to exercise or returning after a break, begin with manageable workouts that match your current fitness level. This might mean starting with just 10-15 minutes of activity a few times a week. As your body adapts, gradually increase duration, frequency, and intensity. This progressive approach builds confidence and reduces injury risk.</p>

<h3>Align Your Routine with Your Lifestyle</h3>
<p>The most effective fitness routine is one that fits seamlessly into your life. Consider your schedule, preferences, and constraints when designing your plan:</p>

<ul>
<li><strong>Time availability:</strong> Be realistic about how much time you can consistently dedicate to exercise. Three 30-minute sessions you actually complete are better than five 60-minute workouts you regularly skip.</li>
<li><strong>Energy patterns:</strong> Schedule workouts when your energy naturally peaks. If you're a morning person, early workouts might be ideal. Night owls might perform better with evening sessions.</li>
<li><strong>Logistics:</strong> Consider commute times, shower facilities, and other practical factors that affect your ability to stick with a routine.</li>
</ul>

<h3>Embrace Variety Within Structure</h3>
<p>A sustainable routine balances consistency with variety. Having a regular schedule creates habits, while incorporating different activities prevents boredom and reduces overuse injuries.</p>

<h4>Consider a framework like this:</h4>
<ul>
<li><strong>Monday:</strong> Strength training (upper body)</li>
<li><strong>Tuesday:</strong> Cardiovascular exercise (moderate intensity)</li>
<li><strong>Wednesday:</strong> Active recovery (yoga, walking)</li>
<li><strong>Thursday:</strong> Strength training (lower body)</li>
<li><strong>Friday:</strong> High-intensity interval training</li>
<li><strong>Saturday:</strong> Recreational activity (hiking, cycling, sports)</li>
<li><strong>Sunday:</strong> Rest or gentle movement</li>
</ul>

<p>Within this structure, you can vary the specific exercises, routes, durations, or intensities to keep things fresh while maintaining the overall pattern.</p>

<h3>Focus on Enjoyment and Intrinsic Motivation</h3>
<p>Sustainable fitness routines incorporate activities you genuinely enjoy. While some discomfort during challenging workouts is normal, your overall experience shouldn't be miserable. Experiment with different types of exercise until you find options that feel rewarding.</p>

<p>Similarly, identify intrinsic motivators—reasons for exercising beyond external factors like appearance. These might include increased energy, stress reduction, better sleep, pride in accomplishment, or simply feeling good during and after activity. Intrinsic motivation proves more durable than extrinsic goals over time.</p>

<h3>Build in Recovery and Flexibility</h3>
<p>Rest and recovery aren't just physical necessities—they're essential components of a sustainable routine. Schedule regular rest days and deload weeks (periods of reduced intensity) to prevent overtraining and mental burnout.</p>

<p>Additionally, build flexibility into your plan to accommodate life's inevitable disruptions. Have backup options for days when your original workout isn't possible: shorter sessions, home workouts, or alternative activities. This prevents all-or-nothing thinking that can derail consistency.</p>

<h3>Track Progress Meaningfully</h3>
<p>Sustainable routines include ways to measure progress that go beyond the scale. Consider tracking:</p>

<ul>
<li>Performance metrics (strength, endurance, flexibility)</li>
<li>Consistency (workouts completed)</li>
<li>Energy levels and mood</li>
<li>Sleep quality</li>
<li>Daily activities that have become easier</li>
</ul>

<p>Celebrating these various forms of progress helps maintain motivation when certain metrics plateau, as they inevitably will.</p>

<h3>Create Systems, Not Just Goals</h3>
<p>While goals provide direction, systems—the processes and habits that support your fitness routine—determine long-term success. Focus on developing systems like:</p>

<ul>
<li>Preparing workout clothes the night before</li>
<li>Scheduling exercise sessions in your calendar</li>
<li>Having contingency plans for common obstacles</li>
<li>Establishing pre-workout routines that trigger exercise behavior</li>
</ul>

<p>These systems make consistency easier by reducing the daily decision-making and willpower required.</p>

<h3>Seek Community and Support</h3>
<p>Few factors predict exercise adherence better than social support. Consider finding workout partners, joining classes or clubs, or participating in online communities that share your fitness interests. These connections provide accountability, encouragement, and make exercise more enjoyable.</p>

<p>Remember that sustainable fitness isn't about perfection—it's about creating a flexible, enjoyable routine that evolves with you over time. By focusing on consistency rather than intensity, enjoyment rather than obligation, and process rather than outcomes, you can build a fitness practice that enhances your life for years to come.</p>`
  },
];

const Blogs = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  
  const openBlogModal = (blog) => {
    setSelectedBlog(blog);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };
  
  const closeBlogModal = () => {
    setSelectedBlog(null);
    // Restore scrolling when modal is closed
    document.body.style.overflow = 'auto';
  };
  
  return (
    <Container>
      <Wrapper>
        <Title>Fitness Blogs</Title>
        <BlogsContainer>
          {blogs.map((blog) => (
            <BlogCard key={blog.id}>
              <BlogImage src={blog.image} alt={blog.title} />
              <BlogContent>
                <BlogTitle>{blog.title}</BlogTitle>
                <BlogDescription>{blog.description}</BlogDescription>
                <ReadMoreButton onClick={() => openBlogModal(blog)}>Read More</ReadMoreButton>
                <BlogMeta>
                  <BlogAuthor>{blog.author}</BlogAuthor>
                  <BlogDate>{blog.date}</BlogDate>
                </BlogMeta>
              </BlogContent>
            </BlogCard>
          ))}
        </BlogsContainer>
        
        {selectedBlog && (
          <BlogModal onClick={closeBlogModal}>
            <BlogModalContainer onClick={(e) => e.stopPropagation()}>
              <BlogModalHeader>
                <BlogModalTitle>{selectedBlog.title}</BlogModalTitle>
                <CloseButton onClick={closeBlogModal}>
                  <Close />
                </CloseButton>
              </BlogModalHeader>
              <BlogModalContent>
                <BlogModalImage src={selectedBlog.image} alt={selectedBlog.title} />
                <BlogModalText dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />
                <BlogModalMeta>
                  <BlogModalAuthor>{selectedBlog.author}</BlogModalAuthor>
                  <BlogModalDate>{selectedBlog.date}</BlogModalDate>
                </BlogModalMeta>
              </BlogModalContent>
            </BlogModalContainer>
          </BlogModal>
        )}
      </Wrapper>
    </Container>
  );
};

export default Blogs;
