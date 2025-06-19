import fs from "fs";
import path from "path";

export interface ContentItem {
  type: "heading" | "paragraph" | "code" | "list";
  text?: string;
  language?: string;
  items?: string[];
}

export interface ContentSection {
  id: string;
  title: string;
  content: ContentItem[];
}

export interface TestQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LearningContent {
  title: string;
  description: string;
  sections: ContentSection[];
  testQuestions: TestQuestion[];
}

export function getAvailableContent(): string[] {
  const dataDirectory = path.join(process.cwd(), "data");
  const sections = ["basic-knowledge", "to-be-senior", "frontend-roadmap"];
  const allContent: string[] = [];

  sections.forEach((section) => {
    const sectionPath = path.join(dataDirectory, section);
    if (fs.existsSync(sectionPath)) {
      const filenames = fs.readdirSync(sectionPath);
      const jsonFiles = filenames
        .filter((name) => name.endsWith(".json"))
        .map((name) => name.replace(".json", ""));
      allContent.push(...jsonFiles);
    }
  });

  return allContent;
}

export function getContentBySlug(slug: string): LearningContent | null {
  try {
    const dataDirectory = path.join(process.cwd(), "data");
    const sections = ["basic-knowledge", "to-be-senior", "frontend-roadmap"];

    for (const section of sections) {
      const fullPath = path.join(dataDirectory, section, `${slug}.json`);
      if (fs.existsSync(fullPath)) {
        const fileContents = fs.readFileSync(fullPath, "utf8");
        return JSON.parse(fileContents);
      }
    }

    return null;
  } catch (error) {
    console.error(`Error loading content for slug: ${slug}`, error);
    return null;
  }
}

export function getAllContent(): { slug: string; content: LearningContent }[] {
  const slugs = getAvailableContent();
  return slugs
    .map((slug) => ({
      slug,
      content: getContentBySlug(slug)!,
    }))
    .filter((item) => item.content !== null);
}
