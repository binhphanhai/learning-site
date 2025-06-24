import { notFound } from "next/navigation";
import {
  getContentBySlug,
  getAvailableContent,
} from "../../../lib/content-loader";
import LearningPage from "../../../components/LearningPage";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAvailableContent();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default function BackendForFrontendPage({ params }: PageProps) {
  const content = getContentBySlug(params.slug);

  if (!content) {
    notFound();
  }

  const breadcrumbItems = [
    { title: "Back to Backend for Frontend", href: "/backend-for-frontend" },
  ];

  return <LearningPage content={content} breadcrumbItems={breadcrumbItems} />;
}

export async function generateMetadata({ params }: PageProps) {
  const content = getContentBySlug(params.slug);

  if (!content) {
    return {
      title: "Content Not Found",
    };
  }

  return {
    title: content.title,
    description: content.description,
  };
  } 