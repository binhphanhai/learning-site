import { TrophyOutlined } from "@ant-design/icons";
import ContentListPage from "../../components/ContentListPage";

// Import content for to-be-senior section
import advancedJavascriptTypescriptContent from "../../data/to-be-senior/advanced-javascript-typescript.json";
import reactEcosystemContent from "../../data/to-be-senior/react-ecosystem.json";

// Define content for to-be-senior
const contentMap = {
  "advanced-javascript-typescript": advancedJavascriptTypescriptContent,
  "react-ecosystem": reactEcosystemContent,
};

export default function ToBeSeniorPage() {
  return (
    <ContentListPage
      title="To Be Senior Engineer"
      description="Master advanced concepts and skills required to become a senior frontend engineer. Each section includes comprehensive learning materials and practice tests."
      icon={<TrophyOutlined />}
      iconColor="#1890ff"
      contentMap={contentMap}
      baseRoute="/to-be-senior"
      breadcrumbLabel="To Be Senior"
    />
  );
}
