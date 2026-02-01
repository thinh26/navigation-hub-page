import { useRef } from "react";
import { Card, CardMedia, Typography, Button, Chip, Box } from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { NavigationCardProps } from "../types";
import { useLanguage } from "../hooks/useLanguage";
import styles from "../styles/NavigationCard.module.scss";

const NavigationCard = ({ route }: NavigationCardProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const globalBtnRef = useRef<HTMLButtonElement>(null);
  const vietnamBtnRef = useRef<HTMLButtonElement>(null);

  const handleNavigateToDetails = () => {
    navigate(route.path);
  };

  const handleWebsiteClick = (url?: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleMouseEnter = () => {
    if (beforeRef.current) {
      gsap.to(beforeRef.current, {
        scaleX: 1,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.05,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        scale: 1.1,
        rotation: 5,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  };

  const handleMouseLeave = () => {
    if (beforeRef.current) {
      gsap.to(beforeRef.current, {
        scaleX: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  };

  const handleButtonMouseEnter = (
    btnRef: React.RefObject<HTMLButtonElement>,
  ) => {
    if (btnRef.current) {
      gsap.to(btnRef.current, {
        y: -2,
        boxShadow: "0px 4px 12px rgba(0, 106, 106, 0.3)",
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleButtonMouseLeave = (
    btnRef: React.RefObject<HTMLButtonElement>,
  ) => {
    if (btnRef.current) {
      gsap.to(btnRef.current, {
        y: 0,
        boxShadow: "0px 2px 8px rgba(0, 106, 106, 0.2)",
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  return (
    <Card
      ref={cardRef}
      className={styles.navigationCard}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleNavigateToDetails}
    >
      <div ref={beforeRef} className={styles.beforeElement} />
      <div className={styles.cardLayout}>
        <div className={styles.imageContainer}>
          <CardMedia
            ref={imageRef}
            component="img"
            image={route.image}
            alt={t(route.title)}
            className={styles.cardImage}
          />
          {/* <div ref={iconRef} className={styles.iconOverlay}>
            <Icon icon={route.icon} className={styles.icon} />
          </div> */}
        </div>

        <div className={styles.contentContainer}>
          <Box className={styles.header}>
            <Typography variant="h6" component="h2" className={styles.title}>
              {t(route.title)}
            </Typography>
            <Chip
              label={t(route.category)}
              size="small"
              className={styles.categoryChip}
            />
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            className={styles.description}
          >
            {t(route.description)}
          </Typography>

          <Box className={styles.actions}>
            {route.globalWebsiteUrl && (
              <Button
                ref={globalBtnRef}
                variant="outlined"
                size="medium"
                onClick={() => handleWebsiteClick(route.globalWebsiteUrl)}
                startIcon={<Icon icon="material-symbols:language" />}
                className={styles.detailsButton}
                onMouseEnter={() => handleButtonMouseEnter(globalBtnRef)}
                onMouseLeave={() => handleButtonMouseLeave(globalBtnRef)}
                fullWidth
              >
                {t("actions.globalWebsite")}
              </Button>
            )}
            {route.vietnamWebsiteUrl && (
              <Button
                ref={vietnamBtnRef}
                variant="outlined"
                size="medium"
                onClick={() => handleWebsiteClick(route.vietnamWebsiteUrl)}
                startIcon={<Icon icon="material-symbols:location-on-outline" />}
                className={styles.websiteButton}
                onMouseEnter={() => handleButtonMouseEnter(vietnamBtnRef)}
                onMouseLeave={() => handleButtonMouseLeave(vietnamBtnRef)}
                fullWidth
              >
                {t("actions.vietnamWebsite")}
              </Button>
            )}
          </Box>
        </div>
      </div>
    </Card>
  );
};

export default NavigationCard;
