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

interface ContentListPageProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  contentMap: Record<string, any>;
  baseRoute: string;
  breadcrumbLabel: string;
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

export default function ContentListPage({
  title,
  description,
  icon,
  iconColor,
  contentMap,
  baseRoute,
  breadcrumbLabel,
}: ContentListPageProps) {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
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
        setContentItems(contentList);
      } catch (error) {
        console.error("Failed to load content:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [contentMap]);

  if (loading) {
    return (
      <Layout
        className="min-h-screen"
        style={{ overflowY: "auto", height: "100vh" }}
      >
        <Header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Title level={3} className="m-0" style={{ color: iconColor }}>
              {icon}
              <span className="ml-2">{title}</span>
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
          <Title level={3} className="m-0" style={{ color: iconColor }}>
            {icon}
            <span className="ml-2">{title}</span>
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
            <Breadcrumb.Item>{breadcrumbLabel}</Breadcrumb.Item>
          </Breadcrumb>

          <div className="mb-8">
            <Title level={1}>{title}</Title>
            <Paragraph className="text-lg text-gray-600">
              {description}
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {contentItems.map((item, index) => {
              const contentIcon = getIconForContent(
                item.title,
                item.description
              );
              const color = getColorForContent(index);

              return (
                <Col key={item.slug} xs={24} lg={12}>
                  <Card
                    hoverable
                    className="h-full"
                    title={
                      <div className="flex items-center">
                        <span className="mr-3 text-2xl" style={{ color }}>
                          {contentIcon}
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
                      <Link key="learn" href={`${baseRoute}/${item.slug}`}>
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
          </Row>
        </div>
      </Content>
    </Layout>
  );
}
