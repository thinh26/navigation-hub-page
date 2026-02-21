"use client";
import { useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { pageRoutes } from "@/config/routes";
import Grid from "@mui/material/GridLegacy";
import { gsap, useGSAP } from "@/lib/gsap";
import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function DetailPage() {
  const { page } = useParams<{ page: string }>();
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const routeDetailInfo = useMemo(
    () => pageRoutes.find((route) => route.path === `/${page}`),
    [page],
  );

  const handleWebsiteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const url = event.currentTarget.getAttribute("data-website-url");
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  useGSAP(
    () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
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
    },
    { scope: containerRef },
  );

  return (
    <Grid container spacing={4} ref={containerRef}>
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
            src={routeDetailInfo?.image}
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
            {routeDetailInfo?.globalWebsiteUrl && (
              <Button
                variant="contained"
                size="large"
                data-website-url={routeDetailInfo.globalWebsiteUrl}
                fullWidth
                onClick={handleWebsiteClick}
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
            {routeDetailInfo?.vietnamWebsiteUrl && (
              <Button
                variant="outlined"
                size="large"
                data-website-url={routeDetailInfo?.vietnamWebsiteUrl}
                fullWidth
                onClick={handleWebsiteClick}
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
              {t(routeDetailInfo?.title ?? "")}
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
            >
              {t(routeDetailInfo?.longDescription ?? "")}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default DetailPage;
