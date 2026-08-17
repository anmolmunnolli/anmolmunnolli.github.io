import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
// import { useFrame } from '@react-three/fiber';

// ========== THEME ==========
const theme = {
  bg: '#f6e1d3',
  bgSoft: '#faeee0',
  text: '#2d1810',
  textMuted: '#6b4a35',
  accent: '#6d4c41',
  accentHover: '#c97b5a',
  border: '#e8c9b3',
};

// ========== GLOBAL STYLES ==========
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  html, body {
    background: ${theme.bg};
    color: ${theme.text};
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a { color: inherit; text-decoration: none; }

  ::selection { background: ${theme.accent}; color: ${theme.bg}; }
`;

// ========== LAYOUT ==========
const Shell = styled.div`
  min-height: 100vh;
  background: ${theme.bg};
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  flex: 1;

  @media (max-width: 640px) {
    padding: 0 1.25rem;
  }
`;

// ========== NAV ==========
const NavBar = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(246, 225, 211, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid ${theme.border};
`;

const NavInner = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 640px) {
    padding: 0.875rem 1.25rem;
  }
`;

const Brand = styled.div`
  font-family: 'Fraunces', serif;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  white-space: nowrap;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.75rem;

  @media (max-width: 720px) {
    gap: 1.1rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar { display: none; }
  }
`;

const NavLink = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: ${p => (p.$active ? theme.text : theme.textMuted)};
  font-weight: ${p => (p.$active ? 500 : 400)};
  padding: 0.25rem 0;
  border-bottom: 1.5px solid ${p => (p.$active ? theme.accent : 'transparent')};
  transition: color 0.15s, border-color 0.15s;
  white-space: nowrap;

  &:hover { color: ${theme.text}; }
`;

// ========== HERO ==========
const Hero = styled.section`
  padding: 5rem 0 4rem;
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 3rem;
  align-items: center;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    padding: 3rem 0 2rem;
    gap: 1.5rem;
  }
`;

const HeroText = styled.div``;

const Eyebrow = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: ${theme.textMuted};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-family: 'Fraunces', serif;
  font-size: clamp(2.25rem, 5.5vw, 3.5rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin-bottom: 1.25rem;
`;

const Tagline = styled.p`
  font-size: 1.02rem;
  line-height: 1.55;
  color: ${theme.textMuted};
  max-width: 46ch;
  margin-bottom: 1.75rem;
`;

const CTARow = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  align-items: center;
`;

const PrimaryBtn = styled.a`
  background: ${theme.accent};
  color: ${theme.bg};
  padding: 0.625rem 1.25rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background 0.15s;
  &:hover { background: #5a3e2c; }
`;

const GhostBtn = styled.a`
  padding: 0.625rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  color: ${theme.text};
  border: 1px solid ${theme.border};
  transition: border-color 0.15s, color 0.15s;
  &:hover { border-color: ${theme.accent}; color: ${theme.accent}; }
`;

// // ========== SIMPLIFIED GLOBE ==========
// const GlobeWrap = styled.div`
//   width: 100%;
//   height: 260px;

//   @media (max-width: 800px) {
//     height: 200px;
//     max-width: 260px;
//     margin: 0 auto;
//   }
// `;
const ProfileImg = styled.img`
  width: 100%;
  max-width: 220px;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 10px;
  border: 4px solid #FFDBBB;
  box-shadow: 0 6px 24px rgba(45, 24, 16, 0.12);
  display: block;
  margin: 0 auto;
`;

const HeroAside = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
// function SpinningWireframe() {
//   const ref = useRef();
//   useFrame((_, delta) => {
//     if (ref.current) {
//       ref.current.rotation.y += delta * 0.18;
//       ref.current.rotation.x += delta * 0.05;
//     }
//   });
//   return (
//     <mesh ref={ref}>
//       <icosahedronGeometry args={[1.4, 2]} />
//       <meshBasicMaterial color={theme.accent} wireframe />
//     </mesh>
//   );
// }

// ========== SECTION SHELLS ==========
const Section = styled.section`
  padding: 2.5rem 0 4rem;
`;

const SectionHead = styled.div`
  margin-bottom: 2.5rem;
`;

const SectionEyebrow = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: ${theme.textMuted};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Fraunces', serif;
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: -0.01em;
`;

const Prose = styled.p`
  font-size: 1rem;
  line-height: 1.65;
  color: ${theme.text};
  max-width: 62ch;
  margin-bottom: 1rem;
`;

const ProseMuted = styled(Prose)`
  color: ${theme.textMuted};
  font-size: 0.95rem;
`;

// ========== TIMELINE (WORK / EDU) ==========
const TimelineItem = styled.article`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 2rem;
  padding: 2rem 0;
  border-top: 1px solid ${theme.border};

  &:last-child { border-bottom: 1px solid ${theme.border}; }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const TimelineMeta = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: ${theme.textMuted};
  line-height: 1.6;
`;

const TimelineBody = styled.div``;

const RoleTitle = styled.h3`
  font-family: 'Fraunces', serif;
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  letter-spacing: -0.005em;
`;

const RoleCompany = styled.div`
  font-size: 0.9rem;
  color: ${theme.textMuted};
  margin-bottom: 1rem;
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Bullet = styled.li`
  font-size: 0.925rem;
  line-height: 1.55;
  padding: 0.375rem 0 0.375rem 1.25rem;
  position: relative;
  color: ${theme.text};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.85rem;
    width: 8px;
    height: 1px;
    background: ${theme.accent};
  }
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 1rem;
`;

const Tag = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  padding: 0.25rem 0.55rem;
  background: rgba(109, 76, 65, 0.08);
  color: ${theme.accent};
  border-radius: 3px;
`;

// ========== PROJECTS ==========
const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.a`
  display: block;
  padding: 1.5rem;
  border: 1px solid ${theme.border};
  border-radius: 8px;
  background: ${theme.bgSoft};
  transition: border-color 0.15s, transform 0.15s;

  &:hover {
    border-color: ${theme.accent};
    transform: translateY(-2px);
  }
`;

const ProjectName = styled.h3`
  font-family: 'Fraunces', serif;
  font-size: 1.15rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const ProjectDesc = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${theme.textMuted};
`;

// ========== SKILLS ==========
const SkillGroup = styled.div`
  margin-bottom: 1.75rem;
`;

const SkillGroupTitle = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: ${theme.textMuted};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
`;

const SkillRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillChip = styled.span`
  font-size: 0.85rem;
  padding: 0.35rem 0.75rem;
  border: 1px solid ${theme.border};
  border-radius: 20px;
  color: ${theme.text};
  background: ${theme.bgSoft};
`;

// ========== CONTACT ==========
const ContactList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ContactItem = styled.a`
  padding: 1.25rem;
  border: 1px solid ${theme.border};
  border-radius: 8px;
  display: block;
  background: ${theme.bgSoft};
  transition: border-color 0.15s;
  &:hover { border-color: ${theme.accent}; }
`;

const ContactLabel = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: ${theme.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.375rem;
`;

const ContactValue = styled.div`
  font-size: 0.95rem;
`;

// ========== FOOTER ==========
const Footer = styled.footer`
  padding: 2rem 0;
  border-top: 1px solid ${theme.border};
  font-size: 0.8rem;
  color: ${theme.textMuted};
  text-align: center;
`;

// ========== DATA ==========
const WORK = [
  {
    role: 'Data Engineer',
    company: 'IU Luddy Autonomous Racing Team',
    location: 'Indianapolis, IN',
    period: 'Oct 2025 — May 2026',
    bullets: [
      'Shipped low-latency (<100 ms) trackside dashboards used live by race managers to optimize pit-stop mechanical adjustments.',
      'Built fault-tolerant, widget-based UI with drag-and-drop field pivots across sensor and video streams.',
      'Enabled on-the-fly creation of trend, temporal, and tracking visuals for split-second race-day calls.',
    ],
    tags: ['Python', 'ROS2', 'UDP', 'Real-time systems'],
  },
  {
    role: 'Data Scientist',
    company: 'Project 990',
    location: 'Remote — Washington, DC',
    period: 'Apr 2025 — Present',
    bullets: [
      'Built OCR + ML pipeline reading 990-PF tax forms; converted structured fields to embeddings for claim prediction and similarity scoring.',
      'Led a clustering model matching nonprofits to likely grantors — engineered features for grant lag, geo distance, category match, and behavior volatility.',
      'Refactored grant pipelines handling 10M+ records; hardened against evolving API schemas with masked-field and missing-value imputation.',
      'Scraped 200K foundations → 120K verified leads via Google Maps → Mistral-filtered website resolution → Wikipedia / social fallback.',
    ],
    tags: ['Python', 'ML', 'Alteryx', 'Selenium', 'Mistral'],
  },
  {
    role: 'Research Assistant — Amazon Research Award 2025',
    company: 'Indiana University Bloomington',
    location: 'Neuro-Spatial Analytics in VR',
    period: 'May 2025 — Jul 2026',
    bullets: [
      'Built end-to-end pipeline correlating EEG, speech, and visual data from VR walkthroughs — helps architects tune spaces for human movement.',
      'Fine-tuned ViT-Base for room classification on AWS Trainium SageMaker; boosted accuracy via KNN spatial-proximity smoothing.',
      'Generated trajectory paths, spatial heatmaps, and mood-over-time overlays (MNE + seaborn) for interpretable design feedback.',
      'Work published in peer-reviewed journal; presented at conference in Germany.',
    ],
    tags: ['PyTorch', 'ViT', 'AWS Trainium', 'SageMaker', 'MNE', 'Unreal'],
  },
  {
    role: 'Data Engineer — ergOS (EV Fleet Management)',
    company: 'ergLocale',
    location: 'Bengaluru, India',
    period: 'Apr 2024 — Jul 2024',
    bullets: [
      'Led data engineering for ergOS charging control unit — ingested 5,000 sensor logs/min via protobuf → Redis → S3.',
      'Built real-time transformations feeding in-app charging-station availability, nearest-charger routing, and vehicle-health dashboards.',
      'Automated weekly Google Maps scraping for charger metadata (type, status) — cut API spend vs paid endpoints.',
      'Worked directly with CEO on GTM automation and investor-facing dashboards (Power BI, Streamlit).',
    ],
    tags: ['Python', 'Protobuf', 'Redis', 'AWS', 'Power BI'],
  },
  {
    role: 'Data Engineer',
    company: 'Powerplay',
    location: 'Bengaluru, India',
    period: 'Jun 2023 — Mar 2024',
    bullets: [
      'Migrated MongoDB → GCP → AWS; built Bronze/Silver/Gold S3 data lake with PySpark on EMR + Glue catalogs.',
      'Partitioned BigQuery tables during transition — cut dashboard query latency and storage cost.',
      'Built lead-gen scraper across 3 verified sources (rotating proxies, Scrapy, Selenium + BS4) → 80K qualified leads with WhatsApp validity checks.',
      'Cut CAC dramatically — saved 60K USD annually. Pipeline still in production.',
      'Streamlined financial pipeline linking Razorpay + Mixpanel + Zoho for fault-tolerant revenue reporting.',
    ],
    tags: ['PySpark', 'AWS EMR', 'BigQuery', 'MongoDB', 'Scrapy'],
  },
  {
    role: 'Machine Learning Engineer',
    company: 'MavenAI Technologies',
    location: 'Remote — Dubai, UAE',
    period: 'Sept 2021 — Apr 2022',
    bullets: [
      'Trained vehicle damage assessment model on labeled body-part / damage-severity annotations; shipped to consumer app for insurance-claim estimation.',
      'Built 3D vehicle reconstruction from multi-perspective imagery using NeRF + CUDA optimization — enabled 360° customer interaction.',
      'Prototyped guitar-tattoo style transfer via XGANs → neural style transfer for pre-purchase visualization.',
    ],
    tags: ['PyTorch', 'NeRF', 'CUDA', 'Neural Style Transfer'],
  },
];

const PROJECTS = [
  {
    name: 'AI-powered pantry management system - recommendation engine',
    desc: 'Reduced household food waste and improved meal planning efficiency by building an AI-powered pantry management system that used TiDB vector search for recipe recommendations, automated ingredient deduction after cooking, and LLM-based multi-agent workflows to parse unstructured recipes, normalize units and match pantry inventory Topics',
    url: 'https://github.com/anmolmunnolli/tidb_hack',
  },
  {
    name: 'Nomads Nest — Agentic Travel Buddy',
    desc: 'Multi-agent travel planner: place recommender, personality interpreter, weather forecaster, itinerary generator, fact checker, packing assistant.',
    url: 'https://github.com/madhumitha-gv/Agent-Alchemysts',
  },
  {
    name: 'E-commerce Event Logs Analytics',
    desc: 'Scalable Snowflake + Airflow pipeline. Four dbt models (session, retention, traffic revenue, cart value) surfaced 20+ insights at 98% accuracy.',
    url: 'https://github.com/anmolmunnolli/website_logs_analysis_pipeline.git',
  },
  {
    name: 'Startup Buddy — KPI Decision Support',
    desc: 'Industry-specific KPI tracker for startups. LLM-powered comparisons (Llama, BERT), time-series forecasting, sentiment analysis.',
    url: 'https://github.com/anmolmunnolli/startup_buddy.git',
  },
  {
    name: 'Crop Yield Estimation from Drone Footage',
    desc: 'KSCST-sponsored (IISc Bangalore). Real-time object detection (Faster-RCNN) + regression on drone imagery.',
    url: 'https://github.com/anmolmunnolli/Crop-Yield-Estimation-from-drone-footage-using-Deep-learning.git',
  },
  {
    name: 'Safar — MLOps for Ride Sharing',
    desc: 'AI-driven ride matching for safer, more affordable travel. 1st place, Global AI HackFest 2023 (Travel & Logistics).',
    url: 'https://wandb.ai/anmolmunnolli/mlops_Safar/reports/Safar-MLOps--Vmlldzo0NjY3Njgy',
  },
];

const SKILLS = {
  Languages: ['Python', 'SQL', 'Bash', 'JavaScript'],
  'Data & ML': ['PySpark', 'pandas', 'PyTorch', 'HuggingFace', 'scikit-learn', 'MNE'],
  Infrastructure: ['AWS (S3, EMR, Glue, SageMaker, Trainium)', 'GCP (BigQuery, GCS)', 'Docker', 'Airflow'],
  Storage: ['Snowflake', 'MongoDB', 'Redis', 'Parquet', 'Protobuf'],
  'Frontend & Viz': ['Streamlit', 'Power BI', 'Tableau', 'React'],
};

const CONTACT = [
  { label: 'Email', value: 'anmolmunnolli01@gmail.com', href: 'mailto:anmolmunnolli01@gmail.com' },
  { label: 'Phone', value: '+1 (930) 215-3025', href: 'tel:+19302153025' },
  { label: 'LinkedIn', value: '/in/anmolmunnolli', href: 'https://www.linkedin.com/in/anmolmunnolli/' },
  { label: 'GitHub', value: '/anmolmunnolli', href: 'https://github.com/anmolmunnolli' },
];

const EDUCATION = [
  {
    school: 'Indiana University, Bloomington',
    degree: 'M.S. Data Science — Specialization in AI and Big Data Systems',
    period: '2024 — May 2026',
    note: 'GPA 3.9',
  },
  {
    school: 'Visvesvaraya Technological University, Bangalore',
    degree: 'B.E. Computer Science',
    period: '2019 — 2023',
    note: 'GPA 4.0 · Best Academic Achiever',
  },
];

const TABS = ['About', 'Work', 'Projects', 'Research', 'Skills', 'Contact'];

// ========== APP ==========
function App() {
  const [tab, setTab] = useState('About');

  return (
    <Shell>
      <GlobalStyle />
      <NavBar>
        <NavInner>
          <Brand>Anmol Munnolli</Brand>
          <NavLinks>
            {TABS.map(t => (
              <NavLink key={t} $active={tab === t} onClick={() => setTab(t)}>
                {t}
              </NavLink>
            ))}
          </NavLinks>
        </NavInner>
      </NavBar>

      <Container>
        {tab === 'About' && <AboutTab />}
        {tab === 'Work' && <WorkTab />}
        {tab === 'Projects' && <ProjectsTab />}
        {tab === 'Research' && <ResearchTab />}
        {tab === 'Skills' && <SkillsTab />}
        {tab === 'Contact' && <ContactTab />}
      </Container>

      <Footer>
        <Container>© 2026 Anmol Munnolli · Denver, CO</Container>
      </Footer>
    </Shell>
  );
}

function AboutTab() {
  return (
    <>
      <Hero>
        <HeroText>
          <Eyebrow>Data Engineer · ML · Denver, CO</Eyebrow>
          <Title>I build data systems and AI solutions that turn signal into decisions.</Title>
          <Tagline>
            Three years across EV telemetry, construction tech, Finance, and now motorsport.
            M.S. Data Science, IU Bloomington. Looking for full-time Data, Analytics or Machine learning roles.
          </Tagline>
          <CTARow>
            <PrimaryBtn
              href="https://drive.google.com/file/d/1ALuKg0oVuBjAXjlZ0j3i-5OgCG7Nq2vI/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </PrimaryBtn>
            <GhostBtn href="https://www.linkedin.com/in/anmolmunnolli/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </GhostBtn>
            <GhostBtn href="https://github.com/anmolmunnolli" target="_blank" rel="noopener noreferrer">
              GitHub
            </GhostBtn>
            <GhostBtn href="mailto:anmolmunnolli01@gmail.com">Email</GhostBtn>
          </CTARow>
        </HeroText>
        <HeroAside>
          <ProfileImg src="/images/profile2.jpeg" alt="Anmol Munnolli" />
          {/* <GlobeWrap style={{ height: 140 }}>
            <Canvas camera={{ position: [0, 0, 4] }}>
              <SpinningWireframe />
            </Canvas>
          </GlobeWrap> */}
        </HeroAside>
      </Hero>

      <Section>
        <SectionHead>
          <SectionEyebrow>About</SectionEyebrow>
          <SectionTitle>What I care about</SectionTitle>
        </SectionHead>
        <Prose>
          Pipelines that survive schema drift. Dashboards that hold up when someone needs an answer in seconds.
          ML that connects to a real decision on the other end. I like being the person who owns a system end-to-end 
          from ingest to the moment a stakeholder acts on it.
        </Prose>
        <Prose>
          Recently: trackside telemetry for IU's autonomous racing team, grant-matching ML for nonprofits at Project 990,
          and neuro-spatial VR research on AWS Trainium (Amazon Research Award 2025).
        </Prose>
      </Section>

      <Section>
        <SectionHead>
          <SectionEyebrow>Education</SectionEyebrow>
          <SectionTitle>Education</SectionTitle>
        </SectionHead>
        {EDUCATION.map(e => (
          <TimelineItem key={e.school}>
            <TimelineMeta>
              {e.period}
              <br />
              <span style={{ opacity: 0.75 }}>{e.note}</span>
            </TimelineMeta>
            <TimelineBody>
              <RoleTitle>{e.degree}</RoleTitle>
              <RoleCompany>{e.school}</RoleCompany>
            </TimelineBody>
          </TimelineItem>
        ))}
      </Section>
    </>
  );
}

function WorkTab() {
  return (
    <Section>
      <SectionHead>
        <SectionEyebrow>Experience — 3+ years</SectionEyebrow>
        <SectionTitle>Work</SectionTitle>
      </SectionHead>
      {WORK.map(w => (
        <TimelineItem key={w.company + w.period}>
          <TimelineMeta>
            {w.period}
            <br />
            <span style={{ opacity: 0.75 }}>{w.location}</span>
          </TimelineMeta>
          <TimelineBody>
            <RoleTitle>{w.role}</RoleTitle>
            <RoleCompany>{w.company}</RoleCompany>
            <BulletList>
              {w.bullets.map((b, i) => (
                <Bullet key={i}>{b}</Bullet>
              ))}
            </BulletList>
            <TagRow>
              {w.tags.map(t => (
                <Tag key={t}>{t}</Tag>
              ))}
            </TagRow>
          </TimelineBody>
        </TimelineItem>
      ))}
    </Section>
  );
}

function ProjectsTab() {
  return (
    <Section>
      <SectionHead>
        <SectionEyebrow>Selected — {PROJECTS.length}</SectionEyebrow>
        <SectionTitle>Projects</SectionTitle>
      </SectionHead>
      <ProjectGrid>
        {PROJECTS.map(p => (
          <ProjectCard key={p.name} href={p.url} target="_blank" rel="noopener noreferrer">
            <ProjectName>{p.name}</ProjectName>
            <ProjectDesc>{p.desc}</ProjectDesc>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </Section>
  );
}

function ResearchTab() {
  return (
    <Section>
      <SectionHead>
        <SectionEyebrow>Amazon Research Award 2025</SectionEyebrow>
        <SectionTitle>Neuro-spatial analytics in VR</SectionTitle>
      </SectionHead>
      <Prose>
        A research pipeline for architects and interior designers to see how people actually move through
        a space — before it's built.
      </Prose>
      <ProseMuted>
        Subjects walk through a virtual Unreal Engine environment wearing an EEG headset and a VR headset. We capture
        brainwaves, speech, and video. A ViT-Base model (fine-tuned on AWS Trainium SageMaker) classifies rooms
        frame-by-frame; a KNN pass over spatial proximity denoises the predictions. Output: trajectory paths,
        spatial heatmaps of time-spent density, mood-over-time overlays from EEG, and speech-derived context on
        why objects sit where they do.
      </ProseMuted>
      <ProseMuted>
        Interactive dashboards built with MNE and seaborn. Work published in a peer-reviewed journal;
        presented at conference in Germany.
      </ProseMuted>
      <TagRow style={{ marginTop: '1.5rem' }}>
        {['PyTorch', 'ViT-Base', 'AWS Trainium', 'SageMaker', 'MNE', 'Unreal Engine', 'KNN'].map(t => (
          <Tag key={t}>{t}</Tag>
        ))}
      </TagRow>
    </Section>
  );
}

function SkillsTab() {
  return (
    <Section>
      <SectionHead>
        <SectionEyebrow>Toolkit</SectionEyebrow>
        <SectionTitle>Skills</SectionTitle>
      </SectionHead>
      {Object.entries(SKILLS).map(([group, items]) => (
        <SkillGroup key={group}>
          <SkillGroupTitle>{group}</SkillGroupTitle>
          <SkillRow>
            {items.map(s => (
              <SkillChip key={s}>{s}</SkillChip>
            ))}
          </SkillRow>
        </SkillGroup>
      ))}
    </Section>
  );
}

function ContactTab() {
  return (
    <Section>
      <SectionHead>
        <SectionEyebrow>Reach out</SectionEyebrow>
        <SectionTitle>Contact</SectionTitle>
      </SectionHead>
      <Prose>
        Open to full-time roles (DS / ML / DE) starting summer 2026. F-1 with STEM OPT eligibility.
      </Prose>
      <ContactList>
        {CONTACT.map(c => (
          <ContactItem
            key={c.label}
            href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
          >
            <ContactLabel>{c.label}</ContactLabel>
            <ContactValue>{c.value}</ContactValue>
          </ContactItem>
        ))}
      </ContactList>
    </Section>
  );
}

export default App;