"use client";

import React, { useState } from "react";
import {
  Layout,
  Tabs,
  Typography,
  Button,
  Breadcrumb,
  Menu,
  Card,
  Radio,
  Space,
  Alert,
  Progress,
  Divider,
} from "antd";
import {
  HomeOutlined,
  BookOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { LearningContent, ContentItem } from "../lib/content-loader";

const { Header, Content, Sider } = Layout;
const { Title, Paragraph, Text } = Typography;

interface TestAnswer {
  questionId: number;
  selectedOption: number;
  isCorrect: boolean;
}

// Enhanced code block component with simple but effective syntax highlighting
const CodeBlock = ({
  children,
  language = "javascript",
}: {
  children: string;
  language?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  // Simple but effective syntax highlighting for JavaScript/TypeScript
  const highlightLine = (line: string) => {
    if (
      !language ||
      (!language.includes("javascript") && !language.includes("typescript"))
    ) {
      return <span style={{ color: "#d4d4d4" }}>{line}</span>;
    }

    const parts: JSX.Element[] = [];
    let remaining = line;
    let key = 0;

    // Process the line character by character with pattern matching
    while (remaining.length > 0) {
      let matched = false;

      // Check for comments first (highest priority)
      if (remaining.startsWith("//")) {
        const commentEnd = remaining.length;
        parts.push(
          <span key={key++} style={{ color: "#6a9955" }}>
            {remaining.slice(0, commentEnd)}
          </span>
        );
        remaining = "";
        matched = true;
      }
      // Check for multi-line comments
      else if (remaining.startsWith("/*")) {
        const commentEnd = remaining.indexOf("*/") + 2;
        const commentText =
          commentEnd > 1 ? remaining.slice(0, commentEnd) : remaining;
        parts.push(
          <span key={key++} style={{ color: "#6a9955" }}>
            {commentText}
          </span>
        );
        remaining = remaining.slice(commentText.length);
        matched = true;
      }
      // Check for strings
      else if (remaining.match(/^(['"`])/)) {
        const quote = remaining[0];
        let stringEnd = 1;
        while (stringEnd < remaining.length && remaining[stringEnd] !== quote) {
          if (remaining[stringEnd] === "\\") stringEnd++; // Skip escaped characters
          stringEnd++;
        }
        if (stringEnd < remaining.length) stringEnd++; // Include closing quote

        const stringText = remaining.slice(0, stringEnd);
        parts.push(
          <span key={key++} style={{ color: "#ce9178" }}>
            {stringText}
          </span>
        );
        remaining = remaining.slice(stringEnd);
        matched = true;
      }
      // Check for keywords
      else {
        const keywordMatch = remaining.match(
          /^(const|let|var|function|class|if|else|for|while|return|import|export|from|async|await|try|catch|throw|new|this|super|extends|implements|interface|type|enum|true|false|null|undefined)\b/
        );
        if (keywordMatch) {
          parts.push(
            <span key={key++} style={{ color: "#569cd6" }}>
              {keywordMatch[0]}
            </span>
          );
          remaining = remaining.slice(keywordMatch[0].length);
          matched = true;
        }
        // Check for numbers
        else {
          const numberMatch = remaining.match(/^\d+\.?\d*/);
          if (numberMatch) {
            parts.push(
              <span key={key++} style={{ color: "#b5cea8" }}>
                {numberMatch[0]}
              </span>
            );
            remaining = remaining.slice(numberMatch[0].length);
            matched = true;
          }
          // Check for function names (before parentheses)
          else {
            const functionMatch = remaining.match(
              /^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/
            );
            if (functionMatch) {
              parts.push(
                <span key={key++} style={{ color: "#dcdcaa" }}>
                  {functionMatch[0]}
                </span>
              );
              remaining = remaining.slice(functionMatch[0].length);
              matched = true;
            }
          }
        }
      }

      // If no pattern matched, add single character as normal text
      if (!matched) {
        parts.push(
          <span key={key++} style={{ color: "#d4d4d4" }}>
            {remaining[0]}
          </span>
        );
        remaining = remaining.slice(1);
      }
    }

    return <>{parts}</>;
  };

  const lines = children.split("\n");
  const showLineNumbers = lines.length > 10;

  return (
    <div className="mb-6 relative group">
      {/* Language label and copy button */}
      <div className="flex items-center justify-between bg-gray-800 text-gray-300 px-4 py-2 text-sm font-medium rounded-t-lg border-b border-gray-600">
        <span className="capitalize">{language}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-1 px-2 py-1 rounded text-xs hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100"
          title="Copy code"
        >
          <CopyOutlined />
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>

      {/* Code block */}
      <div className="bg-gray-900 border border-gray-700 border-t-0 rounded-b-lg overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed font-mono">
          <code>
            {showLineNumbers ? (
              <div className="flex">
                <div className="select-none text-gray-500 pr-4 border-r border-gray-700 mr-4 text-right">
                  {lines.map((_, index) => (
                    <div key={index}>
                      {(index + 1).toString().padStart(2, " ")}
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  {lines.map((line, index) => (
                    <div key={index} className="min-h-[1.5rem]">
                      {line.trim() === "" ? "\u00A0" : highlightLine(line)}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                {lines.map((line, index) => (
                  <div key={index} className="min-h-[1.5rem]">
                    {line.trim() === "" ? "\u00A0" : highlightLine(line)}
                  </div>
                ))}
              </div>
            )}
          </code>
        </pre>
      </div>
    </div>
  );
};

interface LearningPageProps {
  content: LearningContent;
  breadcrumbItems?: Array<{ title: string; href?: string }>;
}

export default function LearningPage({
  content,
  breadcrumbItems = [],
}: LearningPageProps) {
  const [selectedSection, setSelectedSection] = useState(
    content.sections[0]?.id || ""
  );
  const [testAnswers, setTestAnswers] = useState<TestAnswer[]>([]);

  const handleTestAnswer = (questionId: number, selectedOption: number) => {
    const question = content.testQuestions.find((q) => q.id === questionId);
    const isCorrect = question?.correctAnswer === selectedOption;

    setTestAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === questionId);
      if (existing) {
        return prev.map((a) =>
          a.questionId === questionId ? { ...a, selectedOption, isCorrect } : a
        );
      }
      return [...prev, { questionId, selectedOption, isCorrect }];
    });
  };

  const getTestScore = () => {
    const totalQuestions = content.testQuestions.length;
    const correctAnswers = testAnswers.filter((a) => a.isCorrect).length;
    return Math.round((correctAnswers / totalQuestions) * 100);
  };

  const renderContent = (contentItems: ContentItem[]) => {
    return contentItems.map((item, index) => {
      switch (item.type) {
        case "heading":
          return (
            <Title
              key={index}
              level={3}
              className="mt-10 mb-6 text-gray-800 border-l-4 border-blue-500 pl-4"
            >
              {item.text}
            </Title>
          );
        case "paragraph":
          return (
            <Paragraph
              key={index}
              className="mb-6 text-base leading-relaxed text-gray-700"
            >
              {item.text}
            </Paragraph>
          );
        case "code":
          return (
            <CodeBlock key={index} language={item.language}>
              {item.text || ""}
            </CodeBlock>
          );
        case "list":
          return (
            <div key={index} className="mb-6">
              <ul className="space-y-3 ml-6">
                {item.items?.map((listItem: string, listIndex: number) => (
                  <li
                    key={listIndex}
                    className="text-gray-700 leading-relaxed relative"
                  >
                    <span className="absolute -left-6 top-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                    {listItem}
                  </li>
                ))}
              </ul>
            </div>
          );
        default:
          return null;
      }
    });
  };

  const currentSection = content.sections.find((s) => s.id === selectedSection);

  const tabItems = [
    {
      key: "learning",
      label: (
        <span className="flex items-center space-x-2 px-2">
          <BookOutlined />
          <span>Learning Content</span>
        </span>
      ),
      children: (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full">
          <Layout className="bg-white h-full">
            <Sider
              width={350}
              className="bg-gray-50 border-r border-gray-200"
              style={{
                height: "100%",
                overflow: "auto",
                backgroundColor: "#f9fafb",
              }}
            >
              <div className="p-4 border-b border-gray-200 bg-white">
                <Title level={4} className="m-0 text-gray-800">
                  Table of Contents
                </Title>
              </div>
              <Menu
                mode="inline"
                selectedKeys={[selectedSection]}
                onClick={({ key }) => setSelectedSection(key as string)}
                className="border-0"
                style={{
                  backgroundColor: "#f9fafb",
                  height: "calc(100% - 100px)",
                  borderRight: "none",
                  padding: "12px",
                }}
              >
                {content.sections.map((section, index) => (
                  <Menu.Item
                    key={section.id}
                    className={`rounded-lg mb-2 transition-all duration-200 ${
                      selectedSection === section.id
                        ? "bg-blue-100 border-blue-300 shadow-sm"
                        : "hover:bg-blue-50 hover:shadow-sm"
                    }`}
                    style={{
                      backgroundColor:
                        selectedSection === section.id
                          ? "#dbeafe"
                          : "transparent",
                      margin: "0 0 8px 0",
                      height: "auto",
                      lineHeight: "1.4",
                      padding: "16px",
                      border:
                        selectedSection === section.id
                          ? "1px solid #93c5fd"
                          : "1px solid transparent",
                      borderRadius: "8px",
                      minHeight: "60px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div className="w-full">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            selectedSection === section.id
                              ? "bg-blue-500 text-white"
                              : "bg-gray-300 text-gray-600"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className={`font-medium text-sm leading-tight ${
                              selectedSection === section.id
                                ? "text-blue-800"
                                : "text-gray-700"
                            }`}
                          >
                            {section.title}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Menu.Item>
                ))}
              </Menu>
            </Sider>

            <Content
              className="bg-white"
              style={{ height: "80vh", overflow: "auto" }}
            >
              <div className="p-8 max-w-4xl">
                {currentSection && (
                  <div>
                    <div className="mb-8">
                      <Title level={1} className="text-gray-900 mb-3">
                        {currentSection.title}
                      </Title>
                      <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                    <div className="prose prose-lg max-w-none">
                      {renderContent(currentSection.content)}
                    </div>
                  </div>
                )}
              </div>
            </Content>
          </Layout>
        </div>
      ),
    },
  ];

  // Add test tab only if there are test questions
  if (content.testQuestions && content.testQuestions.length > 0) {
    tabItems.push({
      key: "test",
      label: (
        <span className="flex items-center space-x-2 px-2">
          <QuestionCircleOutlined />
          <span>Practice Test ({content.testQuestions.length} Questions)</span>
        </span>
      ),
      children: (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-6">
            {/* Progress Card */}
            {testAnswers.length > 0 && (
              <Card className="mb-8 shadow-sm border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Text strong className="text-lg text-gray-800">
                      Your Progress
                    </Text>
                    <div className="text-gray-600">
                      {testAnswers.length} of {content.testQuestions.length}{" "}
                      questions completed
                    </div>
                    {testAnswers.length === content.testQuestions.length && (
                      <div className="mt-4">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl font-bold text-blue-600">
                            {getTestScore()}%
                          </div>
                          <div className="text-gray-600">
                            {getTestScore() >= 80
                              ? "🎉 Excellent!"
                              : getTestScore() >= 60
                              ? "👍 Good job!"
                              : "💪 Keep practicing!"}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <Progress
                    type="circle"
                    percent={Math.round(
                      (testAnswers.length / content.testQuestions.length) * 100
                    )}
                    size={100}
                    strokeColor={{
                      "0%": "#3b82f6",
                      "100%": "#8b5cf6",
                    }}
                  />
                </div>
              </Card>
            )}

            {/* Instructions */}
            <Card className="mb-8 shadow-sm border-0 bg-white">
              <div className="text-center py-4">
                <Title level={2} className="text-gray-800 mb-4">
                  Practice Test
                </Title>
                <Text className="text-gray-600 text-lg">
                  Test your knowledge with these carefully crafted questions.
                  Each question includes detailed explanations to help you
                  learn.
                </Text>
              </div>
            </Card>

            {/* Questions */}
            <div className="space-y-8">
              {content.testQuestions.map((question, index) => {
                const userAnswer = testAnswers.find(
                  (a) => a.questionId === question.id
                );
                const isAnswered = userAnswer !== undefined;
                const isCorrect = userAnswer?.isCorrect;

                return (
                  <Card
                    key={question.id}
                    className={`shadow-sm border-2 transition-all duration-300 ${
                      isAnswered
                        ? isCorrect
                          ? "border-green-200 bg-green-50"
                          : "border-red-200 bg-red-50"
                        : "border-gray-200 bg-white hover:border-blue-200"
                    }`}
                    title={
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                            {index + 1}
                          </div>
                          <span className="text-lg font-medium text-gray-800">
                            Question {index + 1}
                          </span>
                        </div>
                        {isAnswered && (
                          <div className="flex items-center space-x-2">
                            {isCorrect ? (
                              <>
                                <CheckCircleOutlined className="text-green-500 text-xl" />
                                <span className="text-green-600 font-medium">
                                  Correct
                                </span>
                              </>
                            ) : (
                              <>
                                <CloseCircleOutlined className="text-red-500 text-xl" />
                                <span className="text-red-600 font-medium">
                                  Incorrect
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    }
                  >
                    <div className="space-y-6">
                      {/* Question */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <Text
                          strong
                          className="text-lg text-gray-800 leading-relaxed"
                        >
                          {question.question}
                        </Text>
                      </div>

                      {/* Options */}
                      <Radio.Group
                        value={userAnswer?.selectedOption}
                        onChange={(e) =>
                          handleTestAnswer(question.id, e.target.value)
                        }
                        className="w-full"
                      >
                        <div className="space-y-3">
                          {question.options.map((option, optionIndex) => (
                            <Radio
                              key={optionIndex}
                              value={optionIndex}
                              className={`w-full p-4 rounded-lg border transition-all duration-200 ${
                                isAnswered &&
                                optionIndex === question.correctAnswer
                                  ? "border-green-400 bg-green-50 text-green-700 font-medium"
                                  : isAnswered &&
                                    optionIndex ===
                                      userAnswer?.selectedOption &&
                                    !isCorrect
                                  ? "border-red-400 bg-red-50 text-red-700"
                                  : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                              }`}
                              style={{
                                height: "auto",
                                alignItems: "flex-start",
                                padding: "12px 16px",
                              }}
                            >
                              <span className="text-base leading-relaxed ml-2">
                                {option}
                              </span>
                            </Radio>
                          ))}
                        </div>
                      </Radio.Group>

                      {/* Explanation */}
                      {isAnswered && (
                        <>
                          <Divider />
                          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center mt-0.5">
                                <span className="text-white text-sm font-bold">
                                  i
                                </span>
                              </div>
                              <div>
                                <Text strong className="text-blue-800">
                                  Explanation:
                                </Text>
                                <div className="mt-2 text-blue-700 leading-relaxed">
                                  {question.explanation}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Final Score Summary */}
            {testAnswers.length === content.testQuestions.length && (
              <Card className="mt-12 shadow-lg border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="text-center py-8">
                  <Title level={2} className="text-white mb-4">
                    🎊 Test Completed!
                  </Title>
                  <div className="text-3xl font-bold mb-4">
                    Your Score: {getTestScore()}%
                  </div>
                  <div className="text-lg opacity-90">
                    You answered {testAnswers.filter((a) => a.isCorrect).length}{" "}
                    out of {content.testQuestions.length} questions correctly
                  </div>
                  {getTestScore() >= 80 && (
                    <div className="mt-4 text-lg">
                      🌟 Outstanding performance! You've mastered this topic.
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      ),
    });
  }

  return (
    <Layout style={{ height: "100vh" }}>
      <Header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
          <div className="flex items-center space-x-4">
            <Title level={3} className="m-0 text-gray-800">
              {content.title}
            </Title>
          </div>
          <Space size="middle">
            {breadcrumbItems.map((item, index) => (
              <Link key={index} href={item.href || "#"}>
                <Button
                  type="text"
                  className="text-gray-600 hover:text-blue-600"
                >
                  {item.title}
                </Button>
              </Link>
            ))}
            <Link href="/">
              <Button
                type="text"
                icon={<HomeOutlined />}
                className="text-gray-600 hover:text-blue-600"
              >
                Home
              </Button>
            </Link>
          </Space>
        </div>
      </Header>

      <Content className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto h-full">
          <div className="h-full">
            <Tabs
              defaultActiveKey="learning"
              size="large"
              items={tabItems}
              className="h-full"
              tabBarStyle={{
                marginBottom: 0,
                borderBottom: "2px solid #f0f0f0",
                paddingLeft: "0",
              }}
            />
          </div>
        </div>
      </Content>
    </Layout>
  );
}
