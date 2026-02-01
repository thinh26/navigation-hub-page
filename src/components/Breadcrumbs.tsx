import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useLanguage } from '../hooks/useLanguage';
import { pageRoutes } from '../config/routes';
import styles from '../styles/Breadcrumbs.module.scss';

const Breadcrumbs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const pathnames = location.pathname.split('/').filter((x) => x);

  const getBreadcrumbLabel = (path: string): string => {
    if (path === '') return t('breadcrumb.home');

    const route = pageRoutes.find((r) => r.path === `/${path}`);
    return route ? t(route.title) : path.charAt(0).toUpperCase() + path.slice(1);
  };

  const handleClick = (path: string) => {
    navigate(path === '' ? '/' : `/${path}`);
  };

  const handleLinkMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    gsap.to(event.currentTarget, {
      x: 2,
      color: '#006A6A',
      duration: 0.2,
      ease: 'power2.inOut'
    });
  };

  const handleLinkMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    gsap.to(event.currentTarget, {
      x: 0,
      color: 'inherit',
      duration: 0.2,
      ease: 'power2.inOut'
    });
  };

  return (
    <div className={styles.breadcrumbsContainer}>
      <MuiBreadcrumbs
        aria-label="breadcrumb"
        separator={<Icon icon="material-symbols:chevron-right" />}
        className={styles.breadcrumbs}
      >
        <Link
          component="button"
          onClick={() => handleClick('')}
          className={styles.breadcrumbLink}
          onMouseEnter={handleLinkMouseEnter}
          onMouseLeave={handleLinkMouseLeave}
        >
          <Icon icon="material-symbols:home-outline" className={styles.homeIcon} />
          {t('breadcrumb.home')}
        </Link>
        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;
          const path = pathnames.slice(0, index + 1).join('/');

          return isLast ? (
            <Typography key={path} color="text.primary" className={styles.currentPage}>
              {getBreadcrumbLabel(value)}
            </Typography>
          ) : (
            <Link
              key={path}
              component="button"
              onClick={() => handleClick(path)}
              className={styles.breadcrumbLink}
              onMouseEnter={handleLinkMouseEnter}
              onMouseLeave={handleLinkMouseLeave}
            >
              {getBreadcrumbLabel(value)}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </div>
  );
};

export default Breadcrumbs;
