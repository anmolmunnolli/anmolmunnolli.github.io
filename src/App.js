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
  min-height: 100vh; /* Changed from height */
  background: #f6e1d3;
  position: relative;
  padding: 0px 5px 0px 0px; /* Add top padding */
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
flex: 1;
min-width: 320px;
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
  font-size: 2rem;
  color: #333;
  margin: 0;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const IntroText = styled.p`
  font-size: 0.82rem;
  color: #000;
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
  color: #000;
  background: rgba(255, 255, 255, 0.7);
  padding: 5px 10px;
  border-radius: 5px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem 0;
`;



const AboutSection = styled.div`
  flex: 1;
  min-width: 320px;
`;

const AboutText = styled.p`
  font-size: 0.82rem;
  line-height: 1.6;
  color: #000;
  white-space: pre-line;
  background: rgba(255, 255, 255, 0.7);
  padding: 1rem;
  border-radius: 10px;
`;




// Sections data
const sections = [
  {
    title: 'Education',
    description: 'Indiana University, Bloomington, USA',
    image: '/images/iu.png',
    details: ['Masters of Science - Data Science','(Specialization: Big Data Systems)','GPA: 3.95', 'Graduation: May 2026', 'Relevant Coursework:', 'Introduction to Statistics', 'Advanced Database Concepts', 'Applied machine learning', 'Applied Database Technologies','Data Mining','Information Visualization','Big Data Applications','Statistical Analysis for Effective Decision making','Introduction to Intelligent Systems']
  },
  {
    title: 'Education',
    description: 'Cambridge Institute of Technology, Bangalore, India',
    image: '/images/cambridge.png',
    details: ['Bachelor of Engineering - Information Science', '2019 - 2023', 'GPA : 3.8', 'Achievements : Best Academic Achiever']
  },
  {
    title: 'Work Experience',
    description: 'Data Science Club',
    image: '/images/dsc.png',
    details: ['Technical Lead', 'October 2024 - Present', 'Hosted guest talks on data operations, helping peers understand the fundamentals and best practices in building scalable data solutions','Conducted the Luddy hackathon for students and professionals, eager to solve real world problems with cutting edge tools.','Collaborated with events and marketing teams, to deliver out-of-classroom learning and skill development.']
  },
  {
    title: 'Work Experience',
    description: 'ergLocale',
    image: '/images/erglocale.png',
    details: ['Data Engineer', 'April 2024 - July 2024', "Built real-time ETL pipeline using Kafka & Airflow to ingest 5000 EV sensor logs/min into Snowflake for analytics.",
    "Designed PySpark DAGs to impute ~8% missing data; optimized with partitioning & parallelism, reducing processing time by 47%.",
    "Created Snowflake star schema & SQL procedures for KPIs; developed Tableau dashboards for real-time operations insights.",
    "Orchestrated ETL pipeline with AWS Glue, EMR & Fivetran to ingest EV charging station data every 5 mins into MongoDB & S3.",
    "Built S3-based multi-tier data lake (Bronze, Silver, Gold) handling 2M+ records; ensured MongoDB consistency.",
    "Streamlined PySpark transformations on EMR; stored cleaned Parquet data in Silver layer for analytics.",
    "Computed KPIs in Gold layer & integrated with ergOS API to show real-time charger availability in mobile app."]
  },
  {
    title: 'Work Experience',
    description: 'Powerplay',
    image: '/images/powerplay.png',
    details: ['Data Engineer', 'June 2023 - March 2024',     "Built a Python-Selenium scraper with rotating proxies to collect 200K+ leads from 10+ sources, reducing CAC by $58K/year.",
      "Designed scalable AWS architecture with source-based partitioning & version control for centralized lead data management.",
      "Engineered PySpark workflows on EMR for cleaning, normalization, deduplication & phone validation, boosting accuracy by 20%.",
      "Integrated cleaned data with Meta, Google Ads & WhatsApp APIs for targeted marketing campaigns.",
      "Developed financial pipeline using BigQuery, Segment & PySpark to integrate transactions from Zoho & Razorpay APIs.",
      "Optimized GCS storage with Parquet + GZIP & partitioning by source/date/lead ID in the silver layer for faster queries.",
      "Calculated revenue & lead expenses in gold layer; visualized MRR, ARR & retention metrics in Mixpanel dashboard."]
  },
  {
    title: 'Work Experience',
    description: 'MavenAI Technologies',
    image: '/images/mavenAI.png',
    details: ['Machine Learning Engineer', 'September 2021 - April 2022',     "Enhanced ML app to imprint tattoo patterns on guitars using data preprocessing, XGANs & neural style transfer; achieved 0.83 precision.",
      "Applied NeRF to convert 360° video into high-res 3D models with 34 dB PSNR, enabling photorealistic reconstructions for analysis."]
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
    description: 'Nomads Nest - Agentic Travel Buddy',
    image: '',
    details: ['Built an end to end travel planner tool using Multi Agentic System (MAS) to assist users to select, plan and manage their travel destinations.','Integrated multiple AI Agents like place_recommender, User_personality_interpreter, weather_forecaster, itenerary_generator, fact_checker, bag_packing_assistant which implemented AI functionalities like text summarisation, Recommendation systems, forecasting and sentiment analysis.'],
    github: 'https://github.com/madhumitha-gv/Agent-Alchemysts'
  },
  {
    title: 'Projects',
    description: 'Startup buddy - Startup Decision Support System',
    image: '',
    details: ['- Developed a robust data solution to track KPI performance for startups, personalized to its industry.','Enabled comparisons between industry specific KPI performances fueled by LLMs like Llama and BERT.','Graphed forecasted results and statistics for detailed coverage of KPIs tracked.','Added sentiment analysis and time series forecasting to drive better business decision making'],
    github: 'https://github.com/anmolmunnolli/startup_buddy.git'
  },
  {
    title: 'Projects',
    description: 'clinical data analysis of a pharmaceutical company',
    image: '',
    details: ['Engineered a robust and scalable data pipeline to ingest clinical trial data and perform comprehensive analysis at regular intervals.','Implemented a Power BI dashboard that integrates and visualizes key metrics, including sales performance, customer analytics, operational efficiency, and financial analysis. This resulted in improved decision-making, a 15% increase in forecast accuracy, a 20% enhancement in targeted marketing, a 10% reduction in operational costs, and more effective budget planning.'],
    github: 'https://github.com/anmolmunnolli/clinical_data_analysis'
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
    github: 'https://www.credly.com/badges/1d7c9461-20e6-40c4-a552-4878c680fce5/public_url'
  },
  {
    title: 'Certifications',
    description: 'Microsoft Certified: Power Platform Fundamentals',
    image: '',
    details: ['December 2022 - Present'],
    github: 'https://www.credly.com/badges/16bebf6c-1a6b-417c-9542-b954af196f0d'
  },
  {
    title: 'Certifications',
    description: 'Introduction to Snowflake',
    image: '',
    details: ['February 2025 - Present'],
    github: 'https://drive.google.com/file/d/1D0y81hMX0S4uljsa5S_ZHFzOKp1vmsOS/view?usp=sharing'
  },
  {
    title: 'Certifications',
    description: 'Introduction to SQL',
    image: '',
    details: ['January 2025 - Present'],
    github: 'https://drive.google.com/file/d/13rbXaoawdkEnuMKIEBiG6F7g-AoSYh9n/view?usp=sharing'
  },
  {
    title: 'Certifications',
    description: 'Joining data in SQL',
    image: '',
    details: ['February 2025 - Present'],
    github: 'https://drive.google.com/file/d/1WKYxnVBGUix1czUaHdeFL6V7iYUxKCEJ/view?usp=sharing'
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
    description: 'Power BI',
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
          <FlexContainer>
            {/* LEFT SIDE */}
            <HeaderContent>
              <ProfilePicture src="/images/profile.jpeg" alt="Profile Picture" />
              <TextSection>
                <Name>Anmol Munnolli</Name>
                <IntroText>Data Engineering and analytics | Machine Learning</IntroText>
                <IntroText>
                  Masters of Science - Data Science (Specialization: Big Data Systems) <br />
                  Indiana University Bloomington, USA (Graduating: Summer 2026)
                </IntroText>
                <IntroText>
                  Data Science graduate student with over two years of experience in building data pipelines seeking opportunities in a fast-paced startup.
                </IntroText>
                <SocialLinks>
                  <a href="https://www.linkedin.com/in/anmolmunnolli/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="https://github.com/anmolmunnolli" target="_blank" rel="noopener noreferrer">Github</a>
                  <a>amunnol@iu.edu</a>
                  <a>+1(930)2153025</a>
                </SocialLinks>
                <ResumeButton href="https://drive.google.com/file/d/1ALuKg0oVuBjAXjlZ0j3i-5OgCG7Nq2vI/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  Resume
                </ResumeButton>
              </TextSection>
            </HeaderContent>

            {/* RIGHT SIDE */}
            <AboutSection>
              <AboutText>
                🚀 As a Data Science graduate student with 2+ years of experience in data engineering, I specialize in building scalable pipelines that transform raw data into real-time insights. From electric vehicles to finance and construction tech, I’ve delivered systems that drive business outcomes.

                {"\n\n"}🤖 What value do I bring?
                {"\n"}I design robust, production-grade data workflows that improve processing speed, reduce costs, and enable better decision-making.

                {"\n\n"}🤖 What problems have I solved?
                {"\n"}I’ve built real-time pipelines for EV telemetry, automated lead gen systems saving $58K/year, and financial data lakes driving KPI visibility.

                {"\n\n"}🤖 What tools do I use?
                {"\n"}Proficient in PySpark, Kafka, Airflow, Snowflake, dbt, AWS, GCP, and BI tools like Tableau & Power BI.

                {"\n\n"}🤖 What sets me apart?
                {"\n"}I pair engineering rigor with product thinking—focusing on clean architecture, reusability, and business-aligned outcomes.

                {"\n\n"}🤖 How do I collaborate?
                {"\n"}As Technical Head of IU’s Data Science Club, I mentor peers and lead hands-on sessions solving practical data challenges.

                {"\n\n"}I’m currently seeking Data Science Summer Internship and Co-op opportunities where I can contribute to impactful projects and continue learning.
              </AboutText>
            </AboutSection>
          </FlexContainer>
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