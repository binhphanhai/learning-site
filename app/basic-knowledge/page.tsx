"use client";

import {
  Layout,
  Card,
  Row,
  Col,
  Typography,
  Button,
  Progress,
  Breadcrumb,
} from "antd";
import {
  HomeOutlined,
  CodeOutlined,
  DatabaseOutlined,
  SafetyOutlined,
  TeamOutlined,
  BookOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useEffect, useState } from "react";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

interface ContentItem {
  slug: string;
  title: string;
  description: string;
}

// Icon mapping based on content type/keywords
const getIconForContent = (title: string, description: string) => {
  const text = `${title} ${description}`.toLowerCase();

  if (
    text.includes("javascript") ||
    text.includes("typescript") ||
    text.includes("js")
  ) {
    return <CodeOutlined />;
  }
  if (
    text.includes("algorithm") ||
    text.includes("data structure") ||
    text.includes("oop")
  ) {
    return <DatabaseOutlined />;
  }
  if (text.includes("react") || text.includes("next")) {
    return <TeamOutlined />;
  }
  if (text.includes("html") || text.includes("css") || text.includes("web")) {
    return <SafetyOutlined />;
  }

  return <ReadOutlined />;
};

// Color mapping
const getColorForContent = (index: number) => {
  const colors = [
    "#722ed1", // purple
    "#52c41a", // green
    "#1890ff", // blue
    "#f5222d", // red
    "#fa8c16", // orange
    "#13c2c2", // cyan
    "#eb2f96", // magenta
  ];
  return colors[index % colors.length];
};

// For now, we'll filter content that belongs to basic knowledge
const basicKnowledgeContent = ["advanced-javascript"];

export default function BasicKnowledgePage() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContentList = async () => {
      try {
        const response = await fetch("/api/content-list");
        const data = await response.json();
        // Filter only basic knowledge content
        const filteredData = data.filter((item: ContentItem) =>
          basicKnowledgeContent.includes(item.slug)
        );
        setContentItems(filteredData);
      } catch (error) {
        console.error("Failed to fetch content list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContentList();
  }, []);

  if (loading) {
    return (
      <Layout
        className="min-h-screen"
        style={{ overflowY: "auto", height: "100vh" }}
      >
        <Header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Title level={3} className="m-0 text-purple-600">
              <ReadOutlined className="mr-2" />
              Basic Knowledge
            </Title>
            <Link href="/">
              <Button type="text" icon={<HomeOutlined />}>
                Home
              </Button>
            </Link>
          </div>
        </Header>
        <Content className="flex-1 bg-gray-50 flex items-center justify-center">
          <div>Loading content...</div>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout
      className="min-h-screen"
      style={{ overflowY: "auto", height: "100vh" }}
    >
      <Header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Title level={3} className="m-0 text-purple-600">
            <ReadOutlined className="mr-2" />
            Basic Knowledge
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
            <Breadcrumb.Item>Basic Knowledge</Breadcrumb.Item>
          </Breadcrumb>

          <div className="mb-8">
            <Title level={1}>Foundational Programming Knowledge</Title>
            <Paragraph className="text-lg text-gray-600">
              Explore fundamental programming concepts, languages, and
              technologies. Each section includes comprehensive learning
              materials, practical examples, and hands-on exercises to build
              your foundation.
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {contentItems.map((item, index) => {
              const icon = getIconForContent(item.title, item.description);
              const color = getColorForContent(index);

              return (
                <Col key={item.slug} xs={24} lg={12}>
                  <Card
                    hoverable
                    className="h-full"
                    title={
                      <div className="flex items-center">
                        <span className="mr-3 text-2xl" style={{ color }}>
                          {icon}
                        </span>
                        {item.title}
                      </div>
                    }
                    extra={
                      <Progress
                        type="circle"
                        size={40}
                        percent={0}
                        strokeColor={color}
                      />
                    }
                    actions={[
                      <Link key="learn" href={`/basic-knowledge/${item.slug}`}>
                        <Button
                          type="primary"
                          style={{ backgroundColor: color, borderColor: color }}
                        >
                          Start Learning
                        </Button>
                      </Link>,
                    ]}
                  >
                    <Paragraph className="text-gray-600 mb-4">
                      {item.description}
                    </Paragraph>

                    <div className="text-sm text-gray-500">
                      <div className="flex justify-between mb-2">
                        <span>Progress:</span>
                        <span>0% Complete</span>
                      </div>
                      <Progress percent={0} size="small" strokeColor={color} />
                    </div>
                  </Card>
                </Col>
              );
            })}

            {/* Placeholder cards for upcoming content */}
            {[
              "Algorithms & Data Structures",
              "React Fundamentals",
              "HTML & CSS Basics",
              "TypeScript Essentials",
              "Next.js Basics",
              "OOP & Design Patterns",
            ].map((title, index) => (
              <Col key={title} xs={24} lg={12}>
                <Card
                  className="h-full opacity-60"
                  title={
                    <div className="flex items-center">
                      <span className="mr-3 text-2xl text-gray-400">
                        <BookOutlined />
                      </span>
                      {title}
                    </div>
                  }
                  extra={
                    <div className="text-sm text-gray-400 bg-gray-100 px-2 py-1 rounded">
                      Coming Soon
                    </div>
                  }
                >
                  <Paragraph className="text-gray-400 mb-4">
                    This content is being prepared and will be available soon.
                  </Paragraph>
                  <div className="text-sm text-gray-400">
                    <div className="flex justify-between mb-2">
                      <span>Status:</span>
                      <span>In Development</span>
                    </div>
                    <Progress percent={0} size="small" strokeColor="#d9d9d9" />
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
}
