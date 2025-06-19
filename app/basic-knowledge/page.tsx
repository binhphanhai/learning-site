import { ReadOutlined } from "@ant-design/icons";
import ContentListPage from "../../components/ContentListPage";

// Import content for basic knowledge section
import advancedJavascriptContent from "../../data/basic-knowledge/advanced-javascript.json";
import typescriptContent from "../../data/basic-knowledge/typescript.json";
import algorithmsContent from "../../data/basic-knowledge/algorithms.json";
import algorithmExercisesContent from "../../data/basic-knowledge/algorithm-exercises.json";

// Define content for basic knowledge
const contentMap = {
  "advanced-javascript": advancedJavascriptContent,
  typescript: typescriptContent,
  algorithms: algorithmsContent,
  "algorithm-exercises": algorithmExercisesContent,
};

export default function BasicKnowledgePage() {
  return (
    <ContentListPage
      title="Basic Knowledge"
      description="Explore fundamental programming concepts, languages, and technologies. Each section includes comprehensive learning materials, practical examples, and hands-on exercises to build your foundation."
      icon={<ReadOutlined />}
      iconColor="#722ed1"
      contentMap={contentMap}
      baseRoute="/basic-knowledge"
      breadcrumbLabel="Basic Knowledge"
    />
  );
}
