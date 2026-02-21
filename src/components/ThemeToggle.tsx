"use client";

import { useRef } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@iconify/react";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "../styles/ThemeToggle.module.scss";
import { useTranslations } from "next-intl";

interface ThemeToggleProps {
  mode: "light" | "dark";
  onToggle: () => void;
}

function ThemeToggle({ mode, onToggle }: ThemeToggleProps) {
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleMouseEnter = contextSafe(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const target = event.currentTarget;
      gsap.to(target, {
        scale: 1.1,
        rotation: 15,
        duration: 0.2,
        ease: "power2.out",
      });
    },
  );

  const handleMouseLeave = contextSafe(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const target = event.currentTarget;
      gsap.to(target, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    },
  );

  const handleClick = contextSafe(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const target = event.currentTarget;
      gsap.to(target, {
        rotation: 0,
        duration: 0.2,
        ease: "power2.inOut",
      });
      onToggle();
    },
  );

  return (
    <div className={styles.themeToggle} ref={containerRef}>
      <Tooltip title={t("theme.toggle")}>
        <IconButton
          onClick={handleClick}
          size="large"
          aria-label={t("accessibility.themeToggle")}
          className={styles.iconButton}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {mode === "light" ? (
            <Icon
              icon="material-symbols:dark-mode-outline"
              width={24}
              height={24}
            />
          ) : (
            <Icon
              icon="material-symbols:light-mode-outline"
              width={24}
              height={24}
            />
          )}
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default ThemeToggle;
