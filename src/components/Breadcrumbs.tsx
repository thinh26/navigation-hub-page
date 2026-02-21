"use client";
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { pageRoutes } from "../config/routes";
import styles from "../styles/Breadcrumbs.module.scss";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useRef } from "react";

const Breadcrumbs = () => {
  const navigate = useRouter();
  const location = usePathname();
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  const pathnames = useMemo(
    () => location.split("/").filter((x) => x),
    [location],
  );

  const getBreadcrumbLabel = useCallback(
    (path: string): string => {
      if (path === "") return t("breadcrumb.home");

      const route = pageRoutes.find((r) => r.path === `/${path}`);
      return route
        ? t(route.title)
        : path.charAt(0).toUpperCase() + path.slice(1);
    },
    [t],
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const path = event.currentTarget.dataset.link;
      if (!path) {
        navigate.push("/");
      }
      navigate.push(`/${path}`);
    },
    [navigate],
  );

  const handleLinkMouseEnter = contextSafe(
    (event: React.MouseEvent<HTMLElement>) => {
      gsap.to(event.currentTarget, {
        x: 2,
        color: "#006A6A",
        duration: 0.2,
        ease: "power2.inOut",
      });
    },
  );

  const handleLinkMouseLeave = contextSafe(
    (event: React.MouseEvent<HTMLElement>) => {
      gsap.to(event.currentTarget, {
        x: 0,
        color: "inherit",
        duration: 0.2,
        ease: "power2.inOut",
      });
    },
  );

  return (
    <div ref={containerRef} className={styles.breadcrumbsContainer}>
      <MuiBreadcrumbs
        aria-label="breadcrumb"
        separator={<Icon icon="material-symbols:chevron-right" />}
        className={styles.breadcrumbs}
      >
        <Link
          component="button"
          data-link=""
          onClick={handleClick}
          className={styles.breadcrumbLink}
          onMouseEnter={handleLinkMouseEnter}
          onMouseLeave={handleLinkMouseLeave}
        >
          <Icon
            icon="material-symbols:home-outline"
            className={styles.homeIcon}
          />
          {t("breadcrumb.home")}
        </Link>
        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;
          const path = pathnames.slice(0, index + 1).join("/");

          return isLast ? (
            <Typography
              key={path}
              color="text.primary"
              className={styles.currentPage}
            >
              {getBreadcrumbLabel(value)}
            </Typography>
          ) : (
            <Link
              key={path}
              component="button"
              data-link={path}
              onClick={handleClick}
              className={styles.breadcrumbLink}
              onMouseEnter={handleLinkMouseEnter}
              onMouseLeave={handleLinkMouseLeave}
            >
              {getBreadcrumbLabel(value)}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </div>
  );
};

export default Breadcrumbs;
