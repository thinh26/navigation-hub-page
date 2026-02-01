import PageTemplate from "../components/PageTemplate";
import DetailPageLayout from "../components/DetailPageLayout";
import { pageRoutes } from "../config/routes";

const Portfolio = () => {
  const route = pageRoutes.find((r) => r.path === "/portfolio");

  return (
    <PageTemplate>
      <DetailPageLayout
        image={route?.image}
        titleKey="pages.portfolio.title"
        categoryKey="pages.portfolio.category"
        detailedDescriptionKey="pages.portfolio.detailedDescription"
        globalWebsiteUrl={route?.globalWebsiteUrl}
        vietnamWebsiteUrl={route?.vietnamWebsiteUrl}
        highlightWords={[
          "real-time",
          "key performance indicators",
          "customizable widgets",
        ]}
      />
    </PageTemplate>
  );
};

export default Portfolio;
