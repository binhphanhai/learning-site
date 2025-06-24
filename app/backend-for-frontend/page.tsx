import { DatabaseOutlined } from "@ant-design/icons";
import ContentListPage from "../../components/ContentListPage";
import ClientWrapper from "../../components/ClientWrapper";

// Import all backend-for-frontend content files in order
import databaseFundamentalsContent from "../../data/backend-for-frontend/database-fundamentals.json";
import apiDesignIntegrationContent from "../../data/backend-for-frontend/api-design-integration.json";
import authenticationAuthorizationContent from "../../data/backend-for-frontend/authentication-authorization.json";
import cachingStrategiesContent from "../../data/backend-for-frontend/caching-strategies.json";
import microservicesArchitectureContent from "../../data/backend-for-frontend/microservices-architecture.json";
import performanceScalabilityContent from "../../data/backend-for-frontend/performance-scalability.json";
import devopsDeploymentContent from "../../data/backend-for-frontend/devops-deployment.json";
import securityConsiderationsContent from "../../data/backend-for-frontend/security-considerations.json";
import messageQueuesEventsContent from "../../data/backend-for-frontend/message-queues-events.json";
import dataProcessingAnalyticsContent from "../../data/backend-for-frontend/data-processing-analytics.json";
import thirdPartyIntegrationsContent from "../../data/backend-for-frontend/third-party-integrations.json";
import designSystemsApiDesignContent from "../../data/backend-for-frontend/design-systems-api-design.json";
import errorHandlingMonitoringContent from "../../data/backend-for-frontend/error-handling-monitoring.json";
import testingBackendServicesContent from "../../data/backend-for-frontend/testing-backend-services.json";

// Define content for backend for frontend in correct order
const contentMap = {
  "database-fundamentals": databaseFundamentalsContent,
  "api-design-integration": apiDesignIntegrationContent,
  "authentication-authorization": authenticationAuthorizationContent,
  "caching-strategies": cachingStrategiesContent,
  "microservices-architecture": microservicesArchitectureContent,
  "performance-scalability": performanceScalabilityContent,
  "devops-deployment": devopsDeploymentContent,
  "security-considerations": securityConsiderationsContent,
  "message-queues-events": messageQueuesEventsContent,
  "data-processing-analytics": dataProcessingAnalyticsContent,
  "third-party-integrations": thirdPartyIntegrationsContent,
  "design-systems-api-design": designSystemsApiDesignContent,
  "error-handling-monitoring": errorHandlingMonitoringContent,
  "testing-backend-services": testingBackendServicesContent,
};

export default function BackendForFrontendPage() {
  return (
    <ContentListPage
      title="Backend for Frontend"
      description="Essential backend knowledge for frontend developers. Learn about databases, APIs, server-side concepts, and everything you need to bridge the gap between frontend and backend development."
      icon={<DatabaseOutlined />}
      iconColor="#1890ff"
      contentMap={contentMap}
      baseRoute="/backend-for-frontend"
      breadcrumbLabel="Backend for Frontend"
    />
  );
} 