import { Inter, Google_Sans_Flex } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import MuiThemeWrapper from "@/components/wrappers/theme";
import { NextIntlClientProvider } from "next-intl";
import { PropsWithChildren } from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const google_sans_flex = Google_Sans_Flex({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-google-sans-flex",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<
  PropsWithChildren & {
    params: Promise<{ locale: string }>;
  }
>) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className={`${google_sans_flex.variable} ${inter.variable}`}>
        <AppRouterCacheProvider>
          <NextIntlClientProvider>
            <MuiThemeWrapper>{children}</MuiThemeWrapper>
          </NextIntlClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
