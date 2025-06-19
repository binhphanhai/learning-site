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
  ApartmentOutlined,
  BookOutlined,
  TrophyOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useEffect, useState } from "react";

// Import content directly
import advancedJavascriptContent from "../data/advanced-javascript.json";
import advancedJavascriptTypescriptContent from "../data/advanced-javascript-typescript.json";
import reactEcosystemContent from "../data/react-ecosystem.json";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

interface ContentItem {
  slug: string;
  title: string;
  description: string;
}

// Define all available content
const contentMap = {
  "advanced-javascript": advancedJavascriptContent,
  "advanced-javascript-typescript": advancedJavascriptTypescriptContent,
  "react-ecosystem": reactEcosystemContent,
};

export default function HomePage() {
  const [availableContent, setAvailableContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load content directly from imported JSON files
    const loadContent = () => {
      try {
        const contentList = Object.entries(contentMap).map(
          ([slug, content]) => ({
            slug,
            title: content.title,
            description: content.description,
          })
        );
        setAvailableContent(contentList);
      } catch (error) {
        console.error("Failed to load content:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  return (
    <Layout
      className="min-h-screen"
      style={{ overflowY: "auto", height: "100vh" }}
    >
      <Header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center">
          <Title level={3} className="m-0 text-blue-600">
            <BookOutlined className="mr-2" />
            Learning Site
          </Title>
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
                <Card.Meta
                  title="Basic Knowledge"
                  description="Foundational concepts and personal learning notes covering various programming topics and technologies."
                />
                <div className="mt-4">
                  <Space direction="vertical" size="small">
                    <span>• Advanced JavaScript & TypeScript</span>
                    <span>• React & React Native</span>
                    <span>• Algorithms & Data Structures</span>
                    <span>• HTML/CSS & Next.js</span>
                  </Space>
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
                <Card.Meta
                  title="To Be Senior Engineer"
                  description="Advanced topics and deep-dive content for developers aiming to reach senior-level expertise."
                />
                <div className="mt-4">
                  <Space direction="vertical" size="small">
                    <span>• Advanced JavaScript & TypeScript</span>
                    <span>• React Ecosystem Mastery</span>
                    <span>• Architecture & Leadership</span>
                    <span>• Security & Best Practices</span>
                  </Space>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Card
                hoverable
                className="h-full"
                cover={
                  <div className="p-8 text-center bg-gradient-to-br from-blue-50 to-blue-100">
                    <ApartmentOutlined className="text-5xl text-blue-500" />
                  </div>
                }
                actions={[
                  <Link key="view" href="/frontend-learning-roadmap">
                    <Button type="primary" size="large">
                      Start Learning
                    </Button>
                  </Link>,
                ]}
              >
                <Card.Meta
                  title="Frontend Learning Roadmap"
                  description="Complete roadmap from junior to senior frontend engineer, covering all essential skills and technologies."
                />
                <div className="mt-4">
                  <Space direction="vertical" size="small">
                    <span>• Core Frontend Skills</span>
                    <span>• Backend & API Integration</span>
                    <span>• Testing & Debugging</span>
                    <span>• Performance Optimization</span>
                  </Space>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>

      <Footer className="text-center bg-white">
        <Paragraph className="mb-0 text-gray-600">
          Personal Learning Site © 2024 - Built with Next.js & Ant Design
        </Paragraph>
      </Footer>
    </Layout>
  );
}
