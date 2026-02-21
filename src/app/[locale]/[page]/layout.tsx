"use client";
import { PropsWithChildren, useRef } from "react";
import { Icon } from "@iconify/react";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "@/styles/PageTemplate.module.scss";
import { useTranslations } from "next-intl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@/components/Breadcrumbs";

function PageTemplate({ children }: PropsWithChildren) {
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!contentRef.current) {
        return;
      }

      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <Container
      ref={containerRef}
      maxWidth="xl"
      className={styles.pageContainer}
    >
      <Breadcrumbs />
      <Paper ref={contentRef} className={styles.content}>
        {children || (
          <Box className={styles.placeholder}>
            <Icon
              icon="material-symbols:construction-outline"
              className={styles.placeholderIcon}
            />
            <Typography variant="h6" color="text.secondary">
              {t("common.underConstruction")}
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default PageTemplate;
