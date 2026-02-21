"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "@/styles/LoadingState.module.scss";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

function Loading() {
  const spinnerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();

  useGSAP(
    () => {
      const currentSpinnerRef = spinnerRef.current;
      if (currentSpinnerRef) {
        gsap.to(currentSpinnerRef, {
          opacity: 0.5,
          duration: 0.75,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
    },
    { scope: spinnerRef },
  );

  return (
    <Box className={styles.loadingContainer}>
      <div ref={spinnerRef}>
        <CircularProgress size={60} thickness={4} className={styles.spinner} />
      </div>
      <Typography
        variant="h6"
        color="text.secondary"
        className={styles.message}
      >
        {t("hub.loading")}
      </Typography>
    </Box>
  );
}

export default Loading;
