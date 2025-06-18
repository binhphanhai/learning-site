'use client';

import { Layout, Typography, Card, Row, Col, Button, Breadcrumb, Steps, Tag } from 'antd';
import { HomeOutlined, RocketOutlined, TrophyOutlined, CodeOutlined, DatabaseOutlined, BugOutlined, TeamOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;
const { Step } = Steps;

const juniorSkills = [
  {
    title: 'Core Frontend Skills',
    description: 'JavaScript/TypeScript basics, React fundamentals, component styling',
    icon: <CodeOutlined />,
    skills: [
      'JavaScript/TypeScript basics',
      'React fundamentals',
      'Building and styling components',
      'Using Ant Design or similar UI libraries',
      'Responsive design basics'
    ]
  },
  {
    title: 'Backend & API Basics',
    description: 'Node.js, RESTful APIs, basic authentication',
    icon: <DatabaseOutlined />,
    skills: [
      'Node.js and TypeScript basics',
      'RESTful API concepts and usage',
      'Basic authentication (OAuth2, JWT)'
    ]
  },
  {
    title: 'Database Fundamentals',
    description: 'SQL basics and simple query writing',
    icon: <DatabaseOutlined />,
    skills: [
      'SQL basics',
      'Simple query writing'
    ]
  },
  {
    title: 'Version Control & CI/CD',
    description: 'Git basics and understanding CI/CD pipelines',
    icon: <RocketOutlined />,
    skills: [
      'Git basics',
      'Understanding CI/CD pipelines'
    ]
  },
  {
    title: 'Testing & Debugging',
    description: 'Basic troubleshooting and unit testing',
    icon: <BugOutlined />,
    skills: [
      'Basic troubleshooting and debugging',
      'Writing simple unit tests'
    ]
  },
  {
    title: 'Communication & Collaboration',
    description: 'Working with teams and technical documentation',
    icon: <TeamOutlined />,
    skills: [
      'Code reviews',
      'Writing clear technical documentation',
      'Working with product/design teams',
      'Communicating with technical and non-technical members'
    ]
  }
];

const seniorSkills = [
  {
    title: 'Advanced Frontend Engineering',
    description: 'Deep JavaScript/TypeScript expertise, advanced React patterns',
    icon: <CodeOutlined />,
    skills: [
      'Deep JavaScript/TypeScript expertise',
      'Advanced React (hooks, context, performance)',
      'State management (Redux, Zustand, React Query)',
      'Building libraries and frameworks',
      'Responsive and cross-platform design'
    ]
  },
  {
    title: 'Performance & Optimization',
    description: 'Web performance best practices and optimization techniques',
    icon: <RocketOutlined />,
    skills: [
      'Web performance best practices',
      'Code splitting, lazy loading, and optimization'
    ]
  },
  {
    title: 'Tooling & Architecture',
    description: 'Build tools, CI/CD, and containerization',
    icon: <DatabaseOutlined />,
    skills: [
      'Webpack, build tools, and custom configurations',
      'CI/CD for large teams',
      'Docker for frontend'
    ]
  },
  {
    title: 'Testing Mastery',
    description: 'Comprehensive testing strategies and debugging',
    icon: <BugOutlined />,
    skills: [
      'Unit, integration, and E2E testing',
      'Debugging complex issues'
    ]
  },
  {
    title: 'Security & Best Practices',
    description: 'Web security and secure authentication',
    icon: <TrophyOutlined />,
    skills: [
      'Web security (XSS, CSRF, CORS, etc.)',
      'Secure authentication and data handling'
    ]
  },
  {
    title: 'Leadership & Ownership',
    description: 'Code reviews, mentoring, and project leadership',
    icon: <TeamOutlined />,
    skills: [
      'Leading code reviews',
      'Mentoring team members',
      'Defining technical requirements with stakeholders',
      'Driving projects independently'
    ]
  }
];

export default function FrontendLearningRoadmapPage() {
  return (
    <Layout className="min-h-screen">
      <Header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Title level={3} className="m-0 text-blue-600">
            Frontend Learning Roadmap
          </Title>
          <Link href="/">
            <Button type="text" icon={<HomeOutlined />}>
              Home
            </Button>
          </Link>
        </div>
      </Header>
      
      <Content className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
          <Breadcrumb className="mb-6">
            <Breadcrumb.Item>
              <Link href="/">Home</Link>  
            </Breadcrumb.Item>
            <Breadcrumb.Item>Frontend Learning Roadmap</Breadcrumb.Item>
          </Breadcrumb>
          
          <div className="text-center mb-12">
            <Title level={1}>Frontend Engineer Learning Roadmap</Title>
            <Paragraph className="text-lg text-gray-600 max-w-3xl mx-auto">
              A comprehensive roadmap to guide your journey from junior to senior frontend engineer. 
              Follow this structured path to build the skills and knowledge needed for each level.
            </Paragraph>
          </div>
          
          <div className="mb-12">
            <Steps
              direction="vertical"
              current={-1}
              items={[
                {
                  title: 'Junior Level',
                  description: 'Build foundational skills in frontend development',
                  icon: <RocketOutlined />
                },
                {
                  title: 'Senior Level', 
                  description: 'Master advanced concepts and leadership skills',
                  icon: <TrophyOutlined />
                }
              ]}
            />
          </div>
          
          <div className="mb-16">
            <div className="text-center mb-8">
              <Title level={2} className="text-blue-600">
                <RocketOutlined className="mr-3" />
                Junior Level
              </Title>
              <Paragraph className="text-lg text-gray-600">
                Foundation skills every frontend developer should master
              </Paragraph>
            </div>
            
            <Row gutter={[24, 24]}>
              {juniorSkills.map((skill, index) => (
                <Col key={index} xs={24} lg={12}>
                  <Card
                    className="h-full"
                    title={
                      <div className="flex items-center">
                        <span className="mr-3 text-xl text-blue-500">
                          {skill.icon}
                        </span>
                        {skill.title}
                      </div>
                    }
                  >
                    <Paragraph className="text-gray-600 mb-4">
                      {skill.description}
                    </Paragraph>
                    
                    <div className="space-y-2">
                      {skill.skills.map((item, idx) => (
                        <div key={idx} className="flex items-center">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          
          <div className="mb-16">
            <div className="text-center mb-8">
              <Title level={2} className="text-green-600">
                <TrophyOutlined className="mr-3" />
                Senior Level
              </Title>
              <Paragraph className="text-lg text-gray-600">
                Advanced skills for senior frontend engineers and technical leaders
              </Paragraph>
            </div>
            
            <Row gutter={[24, 24]}>
              {seniorSkills.map((skill, index) => (
                <Col key={index} xs={24} lg={12}>
                  <Card
                    className="h-full"
                    title={
                      <div className="flex items-center">
                        <span className="mr-3 text-xl text-green-500">
                          {skill.icon}
                        </span>
                        {skill.title}
                      </div>
                    }
                  >
                    <Paragraph className="text-gray-600 mb-4">
                      {skill.description}
                    </Paragraph>
                    
                    <div className="space-y-2">
                      {skill.skills.map((item, idx) => (
                        <div key={idx} className="flex items-center">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></span>
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          
          <div className="text-center">
            <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-0">
              <Title level={3}>Ready to advance your skills?</Title>
              <Paragraph className="text-lg mb-6">
                Dive deeper into senior-level topics with our comprehensive learning materials
              </Paragraph>
              <Link href="/to-be-senior">
                <Button type="primary" size="large" icon={<TrophyOutlined />}>
                  Explore Senior Path
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </Content>
    </Layout>
  );
} 