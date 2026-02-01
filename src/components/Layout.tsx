import { useRef } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useLanguage } from '../hooks/useLanguage';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import styles from '../styles/Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
  themeMode: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Layout = ({ children, themeMode, onToggleTheme }: LayoutProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const brandRef = useRef<HTMLDivElement>(null);

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleBrandMouseEnter = () => {
    if (brandRef.current) {
      gsap.to(brandRef.current, {
        x: 4,
        duration: 0.2,
        ease: 'power2.inOut'
      });
    }
  };

  const handleBrandMouseLeave = () => {
    if (brandRef.current) {
      gsap.to(brandRef.current, {
        x: 0,
        duration: 0.2,
        ease: 'power2.inOut'
      });
    }
  };

  return (
    <div className={styles.layout}>
      <AppBar position="sticky" className={styles.appBar} elevation={0}>
        <Toolbar className={styles.toolbar}>
          <Box
            ref={brandRef}
            className={styles.brand}
            onClick={handleHomeClick}
            onMouseEnter={handleBrandMouseEnter}
            onMouseLeave={handleBrandMouseLeave}
          >
            <Icon icon="material-symbols:hub-outline" className={styles.brandIcon} />
            <Typography variant="h6" component="div" className={styles.brandText}>
              {t('app.title')}
            </Typography>
          </Box>

          <Box className={styles.actions}>
            <ThemeToggle mode={themeMode} onToggle={onToggleTheme} />
            <LanguageSwitcher />
          </Box>
        </Toolbar>
      </AppBar>

      <main className={styles.main}>{children}</main>

      <Box component="footer" className={styles.footer}>
        <Typography variant="body2" color="text.secondary">
          {t('app.subtitle')}
        </Typography>
      </Box>
    </div>
  );
};

export default Layout;
