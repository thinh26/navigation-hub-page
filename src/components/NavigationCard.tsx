"use client";

import { useRef } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "@/i18n/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { NavigationCardProps } from "../types";
import { useTranslations } from "next-intl";
import styles from "@/styles/NavigationCard.module.scss";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

const NavigationCard = ({ route }: NavigationCardProps) => {
  const t = useTranslations();
  const navigate = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    (_, contextSafe) => {
      if (!cardRef.current || !contextSafe) {
        return;
      }

      const handleMouseEnter = contextSafe(() => {
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
      });

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

      cardRef.current.addEventListener("mouseenter", handleMouseEnter);
      cardRef.current.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        cardRef.current?.removeEventListener("mouseenter", handleMouseEnter);
        cardRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: cardRef },
  );

  const handleNavigateToDetails = () => {
    navigate.push(route.path);
  };

  const handleWebsiteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const url = event.currentTarget.getAttribute("data-website-url");
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleButtonMouseEnter = contextSafe(
    (event: React.MouseEvent<HTMLElement>) => {
      const target = event.currentTarget;
      gsap.to(target, {
        y: -2,
        boxShadow: "0px 4px 12px rgba(0, 106, 106, 0.3)",
        duration: 0.2,
        ease: "power2.out",
      });
    },
  );

  const handleButtonMouseLeave = contextSafe(
    (event: React.MouseEvent<HTMLElement>) => {
      const target = event.currentTarget;
      gsap.to(target, {
        y: 0,
        boxShadow: "0px 2px 8px rgba(0, 106, 106, 0.2)",
        duration: 0.2,
        ease: "power2.out",
      });
    },
  );

  return (
    <Card
      ref={cardRef}
      className={styles.navigationCard}
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
            {t(route.shortDescription)}
          </Typography>

          <Box className={styles.actions}>
            {route.globalWebsiteUrl && (
              <Button
                variant="outlined"
                size="medium"
                data-website-url={route.globalWebsiteUrl}
                onClick={handleWebsiteClick}
                startIcon={<Icon icon="material-symbols:language" />}
                className={styles.detailsButton}
                onMouseEnter={handleButtonMouseEnter}
                onMouseLeave={handleButtonMouseLeave}
                fullWidth
              >
                {t("actions.globalWebsite")}
              </Button>
            )}
            {route.vietnamWebsiteUrl && (
              <Button
                variant="outlined"
                size="medium"
                data-website-url={route.vietnamWebsiteUrl}
                onClick={handleWebsiteClick}
                startIcon={<Icon icon="material-symbols:location-on-outline" />}
                className={styles.websiteButton}
                onMouseEnter={handleButtonMouseEnter}
                onMouseLeave={handleButtonMouseLeave}
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
