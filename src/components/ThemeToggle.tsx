import { useRef } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Icon } from '@iconify/react';
import gsap from 'gsap';
import { useLanguage } from '../hooks/useLanguage';
import styles from '../styles/ThemeToggle.module.scss';

interface ThemeToggleProps {
  mode: 'light' | 'dark';
  onToggle: () => void;
}

const ThemeToggle = ({ mode, onToggle }: ThemeToggleProps) => {
  const { t } = useLanguage();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.1,
        rotation: 15,
        duration: 0.2,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'power2.inOut'
      });
    }
  };

  const handleClick = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        rotation: 0,
        duration: 0.2,
        ease: 'power2.inOut'
      });
    }
    onToggle();
  };

  return (
    <div className={styles.themeToggle}>
      <Tooltip title={t('theme.toggle')}>
        <IconButton
          ref={buttonRef}
          onClick={handleClick}
          size="large"
          aria-label={t('accessibility.themeToggle')}
          className={styles.iconButton}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {mode === 'light' ? (
            <Icon icon="material-symbols:dark-mode-outline" width={24} height={24} />
          ) : (
            <Icon icon="material-symbols:light-mode-outline" width={24} height={24} />
          )}
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ThemeToggle;
