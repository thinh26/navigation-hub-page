import { useState, useRef } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { useLanguage } from "../hooks/useLanguage";
import styles from "../styles/LanguageSwitcher.module.scss";

const LanguageSwitcher = () => {
  const { t, currentLanguage, changeLanguage, supportedLanguages } =
    useLanguage();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (languageCode: string) => {
    changeLanguage(languageCode);
    handleClose();
  };

  const getCurrentLanguageIcon = () => {
    const iconMap: Record<string, string> = {
      en: "circle-flags:us",
      vi: "circle-flags:vn",
    };
    return iconMap[currentLanguage] || "material-symbols:language";
  };

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleMenuItemMouseEnter = (event: React.MouseEvent<HTMLLIElement>) => {
    gsap.to(event.currentTarget, {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      duration: 0.2,
      ease: "power2.inOut",
    });
  };

  const handleMenuItemMouseLeave = (event: React.MouseEvent<HTMLLIElement>) => {
    gsap.to(event.currentTarget, {
      backgroundColor: "transparent",
      duration: 0.2,
      ease: "power2.inOut",
    });
  };

  return (
    <div className={styles.languageSwitcher}>
      <Tooltip title={t("language.select")}>
        <IconButton
          ref={buttonRef}
          onClick={handleClick}
          size="large"
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
        MenuListProps={{
          "aria-labelledby": "language-button",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {supportedLanguages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={currentLanguage === language.code}
            className={styles.menuItem}
            onMouseEnter={handleMenuItemMouseEnter}
            onMouseLeave={handleMenuItemMouseLeave}
          >
            <ListItemIcon>
              <Icon
                icon={
                  language.code === "en" ? "circle-flags:us" : "circle-flags:vn"
                }
                width={24}
                height={24}
              />
            </ListItemIcon>
            <ListItemText>{language.nativeName}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageSwitcher;
