import { useRef, useEffect } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { useLanguage } from "../hooks/useLanguage";
import Breadcrumbs from "./Breadcrumbs";
import styles from "../styles/PageTemplate.module.scss";

interface PageTemplateProps {
  children?: React.ReactNode;
}

const PageTemplate = ({ children }: PageTemplateProps) => {
  const { t } = useLanguage();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
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
    }
  }, []);

  return (
    <Container maxWidth="xl" className={styles.pageContainer}>
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
};

export default PageTemplate;
