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
    text.includes("react")
  ) {
    return <CodeOutlined />;
  }
  if (
    text.includes("next") ||
    text.includes("ssr") ||
    text.includes("database")
  ) {
    return <DatabaseOutlined />;
  }
  if (text.includes("security") || text.includes("authentication")) {
    return <SafetyOutlined />;
  }
  if (
    text.includes("collaboration") ||
    text.includes("leadership") ||
    text.includes("team")
  ) {
    return <TeamOutlined />;
  }

  return <BookOutlined />;
};

// Color mapping
const getColorForContent = (index: number) => {
  const colors = [
    "#1890ff",
    "#52c41a",
    "#722ed1",
    "#f5222d",
    "#fa8c16",
    "#13c2c2",
    "#eb2f96",
  ];
  return colors[index % colors.length];
};

export default function ToBeSeniorPage() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContentList = async () => {
      try {
        const response = await fetch("/api/content-list");
        const data = await response.json();
        setContentItems(data);
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
      <Layout className="min-h-screen">
        <Header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Title level={3} className="m-0 text-blue-600">
              To Be Senior Engineer
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
    <Layout className="min-h-screen">
      <Header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Title level={3} className="m-0 text-blue-600">
            To Be Senior Engineer
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
            <Breadcrumb.Item>To Be Senior</Breadcrumb.Item>
          </Breadcrumb>

          <div className="mb-8">
            <Title level={1}>Senior Frontend Engineer Path</Title>
            <Paragraph className="text-lg text-gray-600">
              Master advanced concepts and skills required to become a senior
              frontend engineer. Each section includes comprehensive learning
              materials and practice tests.
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
                      <Link key="learn" href={`/to-be-senior/${item.slug}`}>
                        <Button type="primary">Start Learning</Button>
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
          </Row>
        </div>
      </Content>
    </Layout>
  );
}
