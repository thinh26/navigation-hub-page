"use client";
import { useRouter } from "@/i18n/navigation";
import { PropsWithChildren, useCallback } from "react";
import styles from "../styles/Layout.module.scss";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { useRef } from "react";
import { Icon } from "@iconify/react";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

interface LayoutProps {
  themeMode: "light" | "dark";
  onToggleTheme: () => void;
}

function Layout({
  themeMode,
  onToggleTheme,
  children,
}: PropsWithChildren<LayoutProps>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useRouter();
  const t = useTranslations();
  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleHomeClick = useCallback(() => {
    navigate.push("/");
  }, [navigate]);

  const handleBrandMouseEnter = contextSafe(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const target = event.currentTarget;
      gsap.to(target, {
        x: 4,
        duration: 0.2,
        ease: "power2.inOut",
      });
    },
  );

  const handleBrandMouseLeave = contextSafe(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const target = event.currentTarget;
      gsap.to(target, {
        x: 0,
        duration: 0.2,
        ease: "power2.inOut",
      });
    },
  );

  return (
    <div className={styles.layout} ref={containerRef}>
      <AppBar position="sticky" className={styles.appBar} elevation={0}>
        <Toolbar className={styles.toolbar}>
          <Box
            className={styles.brand}
            onClick={handleHomeClick}
            onMouseEnter={handleBrandMouseEnter}
            onMouseLeave={handleBrandMouseLeave}
          >
            <Icon
              icon="material-symbols:hub-outline"
              className={styles.brandIcon}
            />
            <Typography
              variant="h6"
              component="div"
              className={styles.brandText}
            >
              {t("app.title")}
            </Typography>
          </Box>

          <Box className={styles.actions}>
            <ThemeToggle mode={themeMode} onToggle={onToggleTheme} />
            <LanguageSwitcher />
          </Box>
        </Toolbar>
      </AppBar>

      <main className={styles.main}>{children}</main>

      <Box component="footer" className={styles.footer}>
        <Typography variant="body2" color="text.secondary">
          {t("app.subtitle")}
        </Typography>
      </Box>
    </div>
  );
}

export default Layout;
