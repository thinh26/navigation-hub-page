/**
 * Type definitions for the application
 */

export interface PageRoute {
  path: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  category: string;
  image: string;
  globalWebsiteUrl?: string;
  vietnamWebsiteUrl?: string;
  lastUpdated?: string;
  isFavorite?: boolean;
}

export interface NavigationCardProps {
  route: PageRoute;
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export type ThemeMode = 'light' | 'dark';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}
