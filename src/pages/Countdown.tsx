import PageTemplate from "../components/PageTemplate";
import DetailPageLayout from "../components/DetailPageLayout";
import { pageRoutes } from "../config/routes";

const Countdown = () => {
  const route = pageRoutes.find((r) => r.path === "/countdown");

  return (
    <PageTemplate>
      <DetailPageLayout
        image={route?.image}
        titleKey="pages.countdown.title"
        categoryKey="pages.countdown.category"
        detailedDescriptionKey="pages.countdown.detailedDescription"
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

export default Countdown;
