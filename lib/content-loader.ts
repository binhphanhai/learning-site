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
  const filenames = fs.readdirSync(dataDirectory);
  return filenames
    .filter((name) => name.endsWith(".json"))
    .map((name) => name.replace(".json", ""));
}

export function getContentBySlug(slug: string): LearningContent | null {
  try {
    const dataDirectory = path.join(process.cwd(), "data");
    const fullPath = path.join(dataDirectory, `${slug}.json`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    return JSON.parse(fileContents);
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
