import { useState, useMemo, useRef, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  InputAdornment,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { useLanguage } from "../hooks/useLanguage";
import { pageRoutes } from "../config/routes";
import NavigationCard from "../components/NavigationCard";
import styles from "../styles/Hub.module.scss";

const Hub = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState(0);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setFilterTab(newValue);
  };

  const handleTabMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const tabIndex = Number(target.getAttribute("data-tab-index"));
    const isSelected = target.getAttribute("data-selected") === "true";

    if (!isSelected && !isNaN(tabIndex)) {
      gsap.to(event.currentTarget, {
        // color: "#006A6A",
        opacity: 0.7,
        duration: 0.2,
        ease: "power2.inOut",
      });
    }
  };

  const handleTabMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const tabIndex = Number(target.getAttribute("data-tab-index"));
    const isSelected = target.getAttribute("data-selected") === "true";
    if (!isSelected && !isNaN(tabIndex)) {
      gsap.to(event.currentTarget, {
        // color: "inherit",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
    }
  };

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(pageRoutes.map((route) => t(route.category))),
    );
    return ["All", ...uniqueCategories];
  }, [t]);

  const filteredRoutes = useMemo(() => {
    let routes = pageRoutes;

    if (filterTab > 0) {
      const selectedCategory = categories[filterTab];
      routes = routes.filter((route) => t(route.category) === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      routes = routes.filter(
        (route) =>
          t(route.title).toLowerCase().includes(query) ||
          t(route.description).toLowerCase().includes(query) ||
          t(route.category).toLowerCase().includes(query),
      );
    }

    return routes;
  }, [searchQuery, filterTab, categories, t]);

  useEffect(() => {
    if (cardsGridRef.current) {
      gsap.fromTo(
        cardsGridRef.current,
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
  }, [filteredRoutes]);

  return (
    <Container maxWidth="xl" className={styles.hubContainer}>
      <Box className={styles.header}>
        <Typography variant="h3" component="h1" className={styles.title}>
          {t("hub.title")}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          className={styles.subtitle}
        >
          {t("hub.subtitle")}
        </Typography>
      </Box>

      <Box className={styles.controls}>
        <TextField
          fullWidth
          placeholder={t("hub.search")}
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon icon="material-symbols:search" />
              </InputAdornment>
            ),
          }}
          className={styles.searchField}
          aria-label={t("accessibility.searchInput")}
        />

        <Tabs
          value={filterTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          className={styles.tabs}
        >
          {categories.map((category, index) => (
            <Tab
              key={index}
              label={index === 0 ? t("hub.filterAll") : category}
              data-tab-index={index}
              data-selected={filterTab === index}
              className={styles.tab}
              onMouseEnter={handleTabMouseEnter}
              onMouseLeave={handleTabMouseLeave}
              sx={{
                "&.Mui-selected": {
                  color: "#006A6A",
                  fontWeight: 600,
                },
              }}
            />
          ))}
        </Tabs>
      </Box>

      {filteredRoutes.length > 0 ? (
        <Grid ref={cardsGridRef} container spacing={3}>
          {filteredRoutes.map((route) => (
            <Grid item xs={12} md={6} key={route.path}>
              <NavigationCard route={route} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box className={styles.noResults}>
          <Icon
            icon="material-symbols:search-off"
            className={styles.noResultsIcon}
          />
          <Typography variant="h6">{t("hub.noResults")}</Typography>
        </Box>
      )}
    </Container>
  );
};

export default Hub;
