import { lazy } from "react";
import { PageRoute } from "../types";

/**
 * Route configuration for the application
 * Automatically discovers and configures all available pages
 */

// Lazy load page components for better performance
const Portfolio = lazy(() => import("../pages/Portfolio"));
const Countdown = lazy(() => import("../pages/Countdown"));

/**
 * Define all available routes
 * These are automatically displayed in the Hub navigation
 */
export const pageRoutes: PageRoute[] = [
  {
    path: "/portfolio",
    title: "pages.portfolio.title",
    description: "pages.portfolio.description",
    icon: "material-symbols:person-outline",
    category: "pages.portfolio.category",
    component: Portfolio,
    image: "/images/opengraph-image.png",
    globalWebsiteUrl: "https://www.thinh26.com",
    vietnamWebsiteUrl: "https://www.thinh26.vn",
  },
  {
    path: "/countdown",
    title: "pages.countdown.title",
    description: "pages.countdown.description",
    icon: "material-symbols:timer-play-outline-rounded",
    category: "pages.countdown.category",
    component: Countdown,
    image: "/images/lunar_new_year_2026_countdown_og_image.png",
    globalWebsiteUrl: "https://tet.thinh26.com",
    vietnamWebsiteUrl: "https://tet.thinh26.vn",
  },
];
