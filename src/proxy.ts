import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|images|favicon.ico|sw.js|sw_prod.js|sitemap.xml|robots.txt|opengraph-image.png|twitter-image.png|site.webmanifest).*)",
  ],
};

export function proxy(request: NextRequest) {
  // Bring control back to next-intl
  const handleI18nRouting = createMiddleware(routing);
  const response = handleI18nRouting(request);
  return response;
}
