import { TrophyOutlined } from "@ant-design/icons";
import ContentListPage from "../../components/ContentListPage";
import advancedSystemArchitectureContent from "../../data/to-be-senior/advanced-system-architecture.json";
import advancedReactEcosystemContent from "../../data/to-be-senior/advanced-react-ecosystem.json";
import enterpriseTypescriptContent from "../../data/to-be-senior/enterprise-typescript.json";
import performanceEngineeringContent from "../../data/to-be-senior/performance-engineering.json";
import advancedTestingQaContent from "../../data/to-be-senior/advanced-testing-qa.json";
import devopsInfrastructureContent from "../../data/to-be-senior/devops-infrastructure.json";
import technicalLeadershipContent from "../../data/to-be-senior/technical-leadership.json";
import advancedSecurityComplianceContent from "../../data/to-be-senior/advanced-security-compliance.json";
import innovationEmergingTechnologiesContent from "../../data/to-be-senior/innovation-emerging-technologies.json";
import businessProductStrategyContent from "../../data/to-be-senior/business-product-strategy.json";
import mentorshipKnowledgeLeadershipContent from "../../data/to-be-senior/mentorship-knowledge-leadership.json";
import advancedProblemSolvingContent from "../../data/to-be-senior/advanced-problem-solving.json";


// Define content for to-be-senior
const contentMap = {
  "advanced-system-architecture": advancedSystemArchitectureContent,
  "advanced-react-ecosystem": advancedReactEcosystemContent,
  "enterprise-typescript": enterpriseTypescriptContent,
  "performance-engineering": performanceEngineeringContent,
  "advanced-testing-qa": advancedTestingQaContent,
  "devops-infrastructure": devopsInfrastructureContent,
  "technical-leadership": technicalLeadershipContent,
  "advanced-security-compliance": advancedSecurityComplianceContent,
  "innovation-emerging-technologies": innovationEmergingTechnologiesContent,
  "business-product-strategy": businessProductStrategyContent,
  "mentorship-knowledge-leadership": mentorshipKnowledgeLeadershipContent,
  "advanced-problem-solving": advancedProblemSolvingContent,
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
