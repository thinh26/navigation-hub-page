"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import styles from "../styles/LanguageSwitcher.module.scss";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Icon } from "@iconify/react";
import { useCallback, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import MenuItem from "@mui/material/MenuItem";
import { languageLists } from "@/i18n/settings";
import { useParams } from "next/navigation";

function LanguageSwitcher() {
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (event: React.MouseEvent<HTMLLIElement>) => {
    const selectedLanguage = event.currentTarget.dataset.language;
    if (!selectedLanguage) return;
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: selectedLanguage },
    );
    handleClose();
  };

  const getCurrentLanguageIcon = useCallback(
    (languageCode?: string) => {
      const iconMap: Record<string, string> = {
        en: "circle-flags:us",
        vi: "circle-flags:vn",
      };
      if (!languageCode) {
        return iconMap[locale] || "material-symbols:language";
      }

      return iconMap[languageCode] || "material-symbols:language";
    },
    [locale],
  );

  const handleMouseEnter = contextSafe(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const target = event.currentTarget;
      gsap.to(target, {
        scale: 1.1,
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
        duration: 0.2,
        ease: "power2.out",
      });
    },
  );

  const handleMenuItemMouseEnter = contextSafe(
    (event: React.MouseEvent<HTMLLIElement>) => {
      gsap.to(event.currentTarget, {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        duration: 0.2,
        ease: "power2.inOut",
      });
    },
  );

  const handleMenuItemMouseLeave = contextSafe(
    (event: React.MouseEvent<HTMLLIElement>) => {
      gsap.to(event.currentTarget, {
        backgroundColor: "transparent",
        duration: 0.2,
        ease: "power2.inOut",
      });
    },
  );

  return (
    <div ref={containerRef} className={styles.languageSwitcher}>
      <Tooltip title={t("language.select")}>
        <IconButton
          size="large"
          onClick={handleClick}
          aria-label={t("accessibility.languageMenu")}
          aria-controls={open ? "language-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          className={styles.iconButton}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Icon icon={getCurrentLanguageIcon()} width={24} height={24} />
        </IconButton>
      </Tooltip>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "language-button",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {languageLists.map((language) => (
          <MenuItem
            key={language.code}
            data-language={language.code}
            onClick={handleLanguageChange}
            selected={locale === language.code}
            className={styles.menuItem}
            onMouseEnter={handleMenuItemMouseEnter}
            onMouseLeave={handleMenuItemMouseLeave}
          >
            <ListItemIcon>
              <Icon icon={getCurrentLanguageIcon(language.code)} />
            </ListItemIcon>
            <ListItemText>{language.nativeName}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default LanguageSwitcher;
