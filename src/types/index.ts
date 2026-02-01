/**
 * Type definitions for the application
 */

export interface PageRoute {
  path: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  component: React.ComponentType;
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
