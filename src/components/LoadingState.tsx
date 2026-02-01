import { useRef, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import gsap from 'gsap';
import { useLanguage } from '../hooks/useLanguage';
import styles from '../styles/LoadingState.module.scss';

interface LoadingStateProps {
  message?: string;
}

const LoadingState = ({ message }: LoadingStateProps) => {
  const { t } = useLanguage();
  const spinnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (spinnerRef.current) {
      gsap.to(spinnerRef.current, {
        opacity: 0.5,
        duration: 0.75,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }

    return () => {
      gsap.killTweensOf(spinnerRef.current);
    };
  }, []);

  return (
    <Box className={styles.loadingContainer}>
      <div ref={spinnerRef}>
        <CircularProgress
          size={60}
          thickness={4}
          className={styles.spinner}
        />
      </div>
      <Typography variant="h6" color="text.secondary" className={styles.message}>
        {message || t('hub.loading')}
      </Typography>
    </Box>
  );
};

export default LoadingState;
