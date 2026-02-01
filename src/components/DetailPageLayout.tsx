import { useEffect, useRef } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { Icon } from "@iconify/react";
import { useLanguage } from "../hooks/useLanguage";
import gsap from "gsap";

interface DetailPageLayoutProps {
  image?: string;
  titleKey: string;
  categoryKey: string;
  detailedDescriptionKey: string;
  globalWebsiteUrl?: string;
  vietnamWebsiteUrl?: string;
  highlightWords?: string[];
}

const DetailPageLayout = ({
  image,
  titleKey,
  detailedDescriptionKey,
  globalWebsiteUrl,
  vietnamWebsiteUrl,
  highlightWords = [],
}: DetailPageLayoutProps) => {
  const { t } = useLanguage();
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const ctx = gsap.context(() => {
      gsap.from(leftColumnRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          scale: 0.95,
          ease: "power3.in",
          duration: 0.5,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.2,
        },
      );

      gsap.from(buttonsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.7,
      });

      gsap.from(rightColumnRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.from(".chip-item", {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.5,
      });

      gsap.from(".content-title", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.6,
      });

      gsap.from(".content-description", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.7,
      });
    });

    return () => ctx.revert();
  }, []);

  const handleWebsiteClick = (url?: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const highlightText = (text: string, words: string[]): string => {
    let highlighted = text;
    words.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi");
      highlighted = highlighted.replace(regex, "<strong>$1</strong>");
    });
    return highlighted;
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={5}>
        <Box
          ref={leftColumnRef}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            height: "100%",
          }}
        >
          <Box
            ref={imageRef}
            component="img"
            src={image}
            alt={t(titleKey)}
            sx={{
              width: "100%",
              height: "auto",
              minHeight: 200,
              objectFit: "contain",
              borderRadius: 2,
              boxShadow: 3,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: 6,
              },
            }}
          />

          <Stack ref={buttonsRef} spacing={2}>
            {globalWebsiteUrl && (
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={() => handleWebsiteClick(globalWebsiteUrl)}
                startIcon={<Icon icon="material-symbols:language" />}
                sx={{
                  background: "linear-gradient(135deg, #006A6A, #4DD8D5)",
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1.5,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #004D4D, #00A5A2)",
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                  },
                  "&:active": {
                    transform: "translateY(0)",
                  },
                }}
              >
                {t("actions.detailGlobalWebsite")}
              </Button>
            )}
            {vietnamWebsiteUrl && (
              <Button
                variant="outlined"
                size="large"
                fullWidth
                onClick={() => handleWebsiteClick(vietnamWebsiteUrl)}
                startIcon={<Icon icon="material-symbols:location-on-outline" />}
                sx={{
                  borderColor: "#006A6A",
                  color: "#006A6A",
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1.5,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    borderColor: "#004D4D",
                    background: "rgba(0, 106, 106, 0.05)",
                    transform: "translateY(-2px)",
                    boxShadow: 2,
                  },
                  "&:active": {
                    transform: "translateY(0)",
                  },
                }}
              >
                {t("actions.detailVietnamWebsite")}
              </Button>
            )}
          </Stack>
        </Box>
      </Grid>

      <Grid item xs={12} md={7}>
        <Box
          ref={rightColumnRef}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            height: "100%",
          }}
        >
          {/* Category */}
          {/* <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
            <Chip
              className="chip-item"
              label={t(categoryKey)}
              sx={{
                background: "rgba(0, 106, 106, 0.1)",
                color: "#006A6A",
                fontWeight: 500,
                border: "1px solid rgba(0, 106, 106, 0.2)",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  background: "rgba(0, 106, 106, 0.15)",
                  transform: "translateY(-2px)",
                  boxShadow: 2,
                },
              }}
            />
            <Chip
              className="chip-item"
              label="Premium"
              sx={{
                background: "#FFE4B3",
                color: "#B8860B",
                fontWeight: 500,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  background: "#FFD699",
                  transform: "translateY(-2px)",
                  boxShadow: 2,
                },
              }}
            />
            <Chip
              className="chip-item"
              label="Featured"
              sx={{
                background: "#FFB3B3",
                color: "#8B0000",
                fontWeight: 500,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  background: "#FF9999",
                  transform: "translateY(-2px)",
                  boxShadow: 2,
                },
              }}
            />
          </Stack> */}

          <Box>
            <Typography
              className="content-title"
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 500,
                color: "#006A6A",
                mb: 2,
                transition: "color 0.3s ease-in-out",
              }}
            >
              {t(titleKey)}
            </Typography>
            <Typography
              className="content-description"
              variant="body1"
              sx={{
                lineHeight: 1.8,
                color: "text.secondary",
                transition: "color 0.3s ease-in-out",
                "& strong": {
                  color: "#006A6A",
                  fontWeight: 600,
                  transition: "color 0.3s ease-in-out",
                },
              }}
              dangerouslySetInnerHTML={{
                __html: highlightText(
                  t(detailedDescriptionKey),
                  highlightWords,
                ),
              }}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DetailPageLayout;
