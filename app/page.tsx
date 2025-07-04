"use client";

import {
  Layout,
  Card,
  Row,
  Col,
  Typography,
  Button,
  Space,
  Divider,
} from "antd";
import {
  BookOutlined,
  TrophyOutlined,
  ReadOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

export default function HomePage() {
  return (
    <Layout
      className="min-h-screen"
      style={{ overflowY: "auto", height: "100vh" }}
    >
      <Header className="bg-white shadow-sm dark:bg-dark-surface dark:border-b dark:border-dark-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Title level={3} className="m-0 text-blue-600">
            <BookOutlined className="mr-2" />
            Learning Site
          </Title>
          <Space size="middle" style={{marginLeft: 16}}>
            <ThemeToggle />
          </Space>
        </div>
      </Header>

      <Content className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
          <div className="text-center mb-12">
            <Title level={1}>Frontend Development Learning Hub</Title>
            <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive learning resources and roadmaps for frontend
              developers, from junior to senior level expertise.
            </Paragraph>
          </div>

          {/* Main Learning Paths */}
          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} md={12} lg={8}>
              <Card
                hoverable
                className="h-full"
                cover={
                  <div className="p-8 text-center bg-gradient-to-br from-purple-50 to-purple-100">
                    <ReadOutlined className="text-5xl text-purple-500" />
                  </div>
                }
                actions={[
                  <Link key="view" href="/basic-knowledge">
                    <Button type="primary" size="large">
                      View Knowledge
                    </Button>
                  </Link>,
                ]}
              >
                <div className="card-content-wrapper">
                  <Card.Meta
                    title="Basic Knowledge"
                    description="Foundational concepts and personal learning notes covering various programming topics and technologies."
                  />
                  <div className="mt-4 flex-grow">
                    <Space direction="vertical" size="small">
                      <span>• Advanced JavaScript</span>
                      <span>• Core Programming Concepts</span>
                      <span>• Fundamental Best Practices</span>
                    </Space>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} md={12} lg={8}>
              <Card
                hoverable
                className="h-full"
                cover={
                  <div className="p-8 text-center bg-gradient-to-br from-green-50 to-green-100">
                    <TrophyOutlined className="text-5xl text-green-500" />
                  </div>
                }
                actions={[
                  <Link key="view" href="/to-be-senior">
                    <Button type="primary" size="large">
                      Advance Skills
                    </Button>
                  </Link>,
                ]}
              >
                <div className="card-content-wrapper">
                  <Card.Meta
                    title="To Be Senior Engineer"
                    description="Advanced topics and deep-dive content for developers aiming to reach senior-level expertise."
                  />
                  <div className="mt-4 flex-grow">
                    <Space direction="vertical" size="small">
                      <span>• Advanced JavaScript & TypeScript</span>
                      <span>• React Ecosystem Mastery</span>
                      <span>• Architecture & Leadership</span>
                      <span>• Security & Best Practices</span>
                    </Space>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} md={12} lg={8}>
              <Card
                hoverable
                className="h-full"
                cover={
                  <div className="p-8 text-center bg-gradient-to-br from-blue-50 to-blue-100">
                    <DatabaseOutlined className="text-5xl text-blue-500" />
                  </div>
                }
                actions={[
                  <Link key="view" href="/backend-for-frontend">
                    <Button type="primary" size="large">
                      Learn Backend
                    </Button>
                  </Link>,
                ]}
              >
                <div className="card-content-wrapper">
                  <Card.Meta
                    title="Backend for Frontend"
                    description="Essential backend knowledge for frontend developers, covering databases, APIs, and server-side concepts."
                  />
                  <div className="mt-4 flex-grow">
                    <Space direction="vertical" size="small">
                      <span>• Database Fundamentals</span>
                      <span>• API Design & Integration</span>
                      <span>• Server-Side Architecture</span>
                      <span>• Authentication & Security</span>
                    </Space>
                  </div>
                </div>
              </Card>
            </Col>

          </Row>
        </div>
      </Content>

      <Footer className="text-center bg-white dark:bg-dark-surface">
        <Paragraph className="mb-0 text-gray-600 dark:text-dark-text-secondary">
          Personal Learning Site © 2024 - Built with Next.js & Ant Design
        </Paragraph>
      </Footer>
    </Layout>
  );
}
