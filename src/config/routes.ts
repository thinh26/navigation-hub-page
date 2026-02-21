import { PageRoute } from "@/types";

export const pageRoutes: Array<PageRoute> = [
  {
    path: "/portfolio",
    title: "pages.portfolio.title",
    shortDescription: "pages.portfolio.description",
    longDescription: "pages.portfolio.detailedDescription",
    icon: "material-symbols:person-outline",
    category: "pages.portfolio.category",
    image: "/images/opengraph-image.png",
    globalWebsiteUrl: "https://www.thinh26.com",
    vietnamWebsiteUrl: "https://www.thinh26.vn",
  },
  {
    path: "/countdown",
    title: "pages.countdown.title",
    shortDescription: "pages.countdown.description",
    longDescription: "pages.countdown.detailedDescription",
    icon: "material-symbols:timer-play-outline-rounded",
    category: "pages.countdown.category",
    image: "/images/lunar_new_year_2026_countdown_og_image.png",
    globalWebsiteUrl: "https://tet.thinh26.com",
    vietnamWebsiteUrl: "https://tet.thinh26.vn",
  },
];
