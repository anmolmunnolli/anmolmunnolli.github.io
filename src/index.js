import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Globe from './components/Globe';
import InfoDisplay from './components/InfoDisplay';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Global Styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Boulder:wght@400;700&display=swap');
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f6e1d3;
  font-family: 'Roboto', sans-serif;
`;

const LandingPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f6e1d3;
  position: relative;
  padding: 10px;
  overflow: hidden;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column; /* Changed to column */
  align-items: center; /* Center align items */
  justify-content: center;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center align text */
  text-align: center;
  margin-bottom: 20px;
`;

const Name = styled.h1`
  font-family: 'Boulder', sans-serif;
  font-size: 3rem;
  color: #333;
  margin: 0;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const IntroText = styled.p`
  font-size: 1rem;
  color: #666;
  margin-top: 10px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.02);
  }
`;

const ProfilePicture = styled.img`
  width: 200px;
  height: 250px;
  border-radius: 10px;
  border: 5px solid #FFDBBB;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px; /* Margin below picture */
`;

const HighlightIntro = styled.p`
  font-size: 18px;
  color: #666;
  margin-top: 20px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.02);
  }
`;

const SocialLinks = styled.div`
  margin-top: 20px;
  a {
    color: #6d4c41;
    text-decoration: none;
    margin: 0 5px;
    font-size: 15px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ResumeButton = styled.a`
  display: inline-block;
  background-color: #6d4c41;
  color: #fff;
  font-size: 1rem;
  padding: 10px 20px;
  margin-top: 20px;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #5a3e2c;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column; /* Stack graph and info section */
  background: #f6e1d3;
  padding: 10px;
  overflow: auto; /* Make the main content scrollable */
  height: 100vh; /* Ensure the main content takes the full viewport height */
  @media (min-width: 768px) {
    flex-direction: row; /* For larger screens, use row layout */
    overflow: hidden; /* Remove scroll on larger screens */
  }
`;

const GraphContainer = styled.div`
  width: 100%;
  height: 60vh; /* Adjust height as needed */
  position: relative;
  margin-bottom: 20px; /* Margin below graph */
  @media (min-width: 768px) {
    width: 30vw;
    height: 80vh;
    margin-bottom: 0; /* Remove margin on larger screens */
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  min-height: 40vh; /* Ensure minimum height */
  padding: 10px;
  background-color: #f6e1d3;
  overflow-y: auto;
  @media (min-width: 768px) {
    width: 70vw;
  }
`;

const RotateInstruction = styled.p`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1rem;
  color: #666;
  background: rgba(255, 255, 255, 0.7);
  padding: 5px 10px;
  border-radius: 5px;
`;


// Sections data
const sections = [
  {
    title: 'Education',
    description: 'Indiana University, Bloomington, USA',
    image: '/images/iu.png',
    details: ['Masters of Science - Data Science', 'Graduation: May 2026', 'Relevant Coursework:', 'Introduction to Statistics', 'Advanced Database Concepts', 'Applied machine learning']
  },
  {
    title: 'Education',
    description: 'Cambridge Institute of Technology, Bangalore, India',
    image: '/images/cambridge.png',
    details: ['Bachelor of Engineering - Information Science', '2019 - 2023', 'GPA : 3.8', 'Achievements : Best Academic Achiever']
  },
  {
    title: 'Work Experience',
    description: 'ergLocale',
    image: '/images/erglocale.png',
    details: ['Data Engineer', 'April 2024 - July 2024', 'Orchestrated a near-real-time data funnel to accumulate event logs in a data lake.','Implemented a custom live dashboard using Streamlit, ensuring optimal query performance and cost-saving measures.']
  },
  {
    title: 'Work Experience',
    description: 'Powerplay',
    image: '/images/powerplay.png',
    details: ['Data Engineer', 'June 2023 - March 2024', 'Collaborative efforts with marketing team to provide scaled leads','Data pipelines and data lakes on AWS, GCP']
  },
  {
    title: 'Work Experience',
    description: 'MavenAI Technologies',
    image: '/images/mavenAI.png',
    details: ['Machine Learning Engineer', 'September 2021 - April 2022', 'Worked on GANs and Computer Vision Projects, trained on AWS instances.','Performed Data Preprocessing, Transformation and Feature Engineering']
  },
  {
    title: 'Projects',
    description: 'E-commerce event logs analytics pipeline',
    image: '',
    details: ['Built a scalable analytics pipeline for e-commerce event logs using Snowflake and Apache Airflow, significantly enhancing data processing speed and enabling real-time insights to drive business decisions.','Developed and optimized 4 data models in dbt Core and dbt Cloud- Session Analysis, Retention Analysis, Traffic Revenue, and User Cart Value, to analyze user behavior and revenue, generating over 20 actionable insights and achieving 98% data accuracy. Integrated data into a Tableau dashboard for comprehensive visualization of key metrics.'],
    github: 'https://github.com/anmolmunnolli/website_logs_analysis_pipeline.git'
  },
  {
    title: 'Projects',
    description: 'Crop Yield Estimation with Real-Time Object Detection and regression analysis using Drone footage and web Interface',
    image: '',
    details: ['Sponsored by KSCST, Indian Institute of Science, Bangalore', 'To accurately predict crop yield in a given land using the drone footage and deep learning techniques at real-time.', 'Provides enhanced results with Faster-RCNN object detection and regression analysis'],
    github: 'https://github.com/anmolmunnolli/Crop-Yield-Estimation-from-drone-footage-using-Deep-learning.git'
  },
  {
    title: 'Projects',
    description: 'Safar MLOps',
    image: '',
    details: ['Safar is a solution to improving customer experience and travel recommendations by leveraging various AI techniques.','This ride sharing platform connects rides with drivers for safe, reliable, and affordable transportation.','Bagged first place at Global AI HackFest 2023 | Travel, Logistics & Supply chain'],
    github: 'https://wandb.ai/anmolmunnolli/mlops_Safar/reports/Safar-MLOps--Vmlldzo0NjY3Njgy'
  },
  {
    title: 'Projects',
    description: 'Exploratory data analysis on Amazon Bestseller books',
    image: '',
    details: ['Exploratory Data Analysis on the best seller books using plotly.','Dataset taken from Kaggle'],
    github: 'https://github.com/anmolmunnolli/project-AI---EDA-on-Amazon-Bestseller-books.git'
  },
  {
    title: 'Certifications',
    description: 'Microsoft Certified: Azure AI Fundamentals',
    image: '',
    details: ['December 2022 - Present'],
    github: 'https://www.credly.com/earner/earned/badge/1d7c9461-20e6-40c4-a552-4878c680fce5'
  },
  {
    title: 'Certifications',
    description: 'Microsoft Certified: Power Platform Fundamentals',
    image: '',
    details: ['December 2022 - Present'],
    github: 'https://www.credly.com/badges/16bebf6c-1a6b-417c-9542-b954af196f0d'
  },
  {
    title: 'Contact Info',
    description: 'Email',
    image: '',
    details: ['amunnol@iu.edu','anmolmunnolli@gmail.com'],
  },
  {
    title: 'Contact Info',
    description: 'Phone',
    image: '',
    details: ['+1 (930) 215-3025'],
  },
  {
    title: 'Contact Info',
    description: 'LinkedIn',
    image: '',
    details: ['https://www.linkedin.com/in/anmolmunnolli/'],
  },
  {
    title: 'Contact Info',
    description: 'Github',
    image: '',
    details: ['https://github.com/anmolmunnolli'],
  },
  {
    title: 'Skills',
    description: 'Apache Spark',
    image: '',
    details: ['Intermediate']
  },
  {
    title: 'Skills',
    description: 'Python',
    image: '',
    details: ['Advanced']
  },
  {
    title: 'Skills',
    description: 'SQL',
    image: '',
    details: ['Advanced']
  },
  {
    title: 'Skills',
    description: 'Extract, Load and Transform',
    image: '',
    details: ['Intermediate']
  },
  {
    title: 'Skills',
    description: 'Snowflake',
    image: '',
    details: ['Intermediate']
  },
  {
    title: 'Skills',
    description: 'dbt core',
    image: '',
    details: ['Intermediate']
  },
  {
    title: 'Skills',
    description: 'dbt cloud',
    image: '',
    details: ['Intermediate']
  },
  {
    title: 'Skills',
    description: 'Apache airflow',
    image: '',
    details: ['Intermediate']
  },
  {
    title: 'Skills',
    description: 'Docker',
    image: '',
    details: ['Intermediate']
  },
  {
    title: 'Skills',
    description: 'Databricks',
    image: '',
    details: ['Intermediate']
  },
  {
    title: 'Skills',
    description: 'Tableau',
    image: '',
    details: ['Intermediate']
  },
  {
    title: 'Skills',
    description: 'Machine learning',
    image: '',
    details: ['Intermediate']
  },
  {
    title: 'Skills',
    description: 'AWS',
    image: '',
    details: ['Advanced']
  },
  {
    title: 'Skills',
    description: 'Linux',
    image: '',
    details: ['Intermediate']
  },
  {
    title: 'Skills',
    description: 'Data visualisation',
    image: '',
    details: ['Intermediate']
  }
  // Add more sections as needed
];
function App() {
  const [selectedNode, setSelectedNode] = useState(null);

  // Ensure filterSection is set correctly
  const filterSection = selectedNode ? selectedNode.section : '';

  return (
    <AppContainer>
      <GlobalStyle />
      <LandingPage>
        <HeaderContent>
          <ProfilePicture src="/images/profile.jpeg" alt="Profile Picture" />
          <TextSection>
            <Name>Anmol Munnolli</Name>
            <IntroText>Data Architecture and Engineering | Machine Learning</IntroText>
            <IntroText>Masters of Science - Data Science at Indiana University, USA<br />Class of 2026</IntroText>
            <IntroText>Delivering robust data-driven solutions to manifest better decision making.<br />
              Passionate about leveraging data to drive innovation and business growth.</IntroText>
            <SocialLinks>
              <a href="https://www.linkedin.com/in/anmolmunnolli/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com/anmolmunnolli" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a>amunnol@iu.edu</a>
              <a>anmolmunnolli@gmail.com</a>
            </SocialLinks>
            <ResumeButton href="https://drive.google.com/file/d/1v2rzUwyRFwf5IMY1GDtcIP31sAZvbcxf/view?usp=sharing" target="_blank" rel="noopener noreferrer">Resume</ResumeButton> {/* Resume Button */}
          </TextSection>
        </HeaderContent>
      </LandingPage>
      <MainContent>
        <GraphContainer>
          <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Globe setSelectedNode={setSelectedNode} />
            <OrbitControls
              enableRotate={true}
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          </Canvas>
          <RotateInstruction>Rotate to scroll</RotateInstruction> {/* Instruction text */}
        </GraphContainer>
        <InfoContainer>
          <InfoDisplay sections={sections} filterSection={filterSection} />
        </InfoContainer>
      </MainContent>
    </AppContainer>
  );
}

export default App;