import { NextResponse } from "next/server";
import { getAllContent } from "../../../lib/content-loader";

export async function GET() {
  try {
    const allContent = getAllContent();

    const contentList = allContent.map(({ slug, content }) => ({
      slug,
      title: content.title,
      description: content.description,
    }));

    return NextResponse.json(contentList);
  } catch (error) {
    console.error("Error fetching content list:", error);
    return NextResponse.json(
      { error: "Failed to fetch content list" },
      { status: 500 }
    );
  }
}
