# Dynamic Navigation Hub - Multi-Page Application

A comprehensive, fully internationalized React application featuring a dynamic navigation hub with Material You (Material 3) design principles.

## Features

### Core Functionality
- **Dynamic Hub Page**: Automatically discovers and displays navigation links to all child pages
- **Smart Search & Filter**: Real-time search functionality with category-based filtering
- **Breadcrumb Navigation**: Automatic breadcrumb generation based on current route
- **Active Page Indicators**: Visual feedback for current location

### Internationalization (i18n)
- **3 Languages Supported**: English, Spanish, and French
- **react-i18next Integration**: Comprehensive translation management
- **Language Switcher**: Easy language selection with flag icons
- **RTL Support Ready**: Architecture supports right-to-left languages

### Design & UI
- **Material You Design**: Following Material Design 3 guidelines from Google
- **Dark/Light Mode**: Seamless theme switching with persistent preferences
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Card-Based Layout**: Clean, intuitive navigation cards with icons
- **Smooth Animations**: Hover effects and transitions throughout
- **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML

### Technical Stack
- **React 18**: Latest React with functional components and hooks
- **TypeScript**: Full type safety throughout the application
- **Material-UI (MUI)**: Customized to follow Material You design
- **SCSS Modules**: Scoped styling with Sass preprocessing
- **React Router v6**: Modern routing with lazy loading
- **Vite**: Fast build tool and development server

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Breadcrumbs.tsx
│   ├── ErrorBoundary.tsx
│   ├── LanguageSwitcher.tsx
│   ├── Layout.tsx
│   ├── LoadingState.tsx
│   ├── NavigationCard.tsx
│   ├── PageTemplate.tsx
│   └── ThemeToggle.tsx
├── config/             # Application configuration
│   └── routes.tsx      # Route definitions
├── hooks/              # Custom React hooks
│   ├── useLanguage.ts
│   └── useThemeMode.ts
├── i18n/               # Internationalization setup
│   └── config.ts
├── locales/            # Translation files
│   ├── en/
│   ├── es/
│   └── fr/
├── pages/              # Page components
│   ├── Hub.tsx
│   ├── Dashboard.tsx
│   ├── Analytics.tsx
│   ├── Settings.tsx
│   ├── Profile.tsx
│   ├── Reports.tsx
│   ├── Users.tsx
│   ├── Projects.tsx
│   └── Tasks.tsx
├── styles/             # SCSS modules
│   ├── Breadcrumbs.module.scss
│   ├── Hub.module.scss
│   ├── LanguageSwitcher.module.scss
│   ├── Layout.module.scss
│   ├── LoadingState.module.scss
│   ├── NavigationCard.module.scss
│   ├── PageTemplate.module.scss
│   └── ThemeToggle.module.scss
├── theme/              # MUI theme configuration
│   └── theme.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## Key Components

### Hub Page
The central navigation hub that automatically discovers and displays all available pages from the route configuration. Features include:
- Grid layout with responsive cards
- Real-time search across titles, descriptions, and categories
- Category-based filtering with tabs
- Smooth animations and transitions

### NavigationCard
Reusable card component for displaying page information:
- Icon with gradient background
- Title and description
- Category chip
- Last updated date
- Hover effects with transform animations

### Layout
Main layout wrapper providing:
- Sticky app bar with branding
- Theme toggle button
- Language switcher
- Footer with app information

### Error Boundary
Catches JavaScript errors and displays a user-friendly fallback UI instead of crashing the application.

## Custom Hooks

### useThemeMode
Manages theme mode (light/dark) with localStorage persistence:
```typescript
const { theme, mode, toggleTheme } = useThemeMode();
```

### useLanguage
Wraps i18next functionality with utilities:
```typescript
const { t, currentLanguage, changeLanguage, supportedLanguages } = useLanguage();
```

## Adding New Pages

To add a new page to the navigation hub:

1. Create your page component in `src/pages/`:
```typescript
import PageTemplate from '../components/PageTemplate';

const MyNewPage = () => {
  return (
    <PageTemplate
      titleKey="pages.myPage.title"
      descriptionKey="pages.myPage.description"
      icon="material-symbols:your-icon"
    />
  );
};

export default MyNewPage;
```

2. Add translations to all language files in `src/locales/`:
```json
{
  "pages": {
    "myPage": {
      "title": "My Page",
      "description": "Description of my page",
      "category": "Category Name"
    }
  }
}
```

3. Register the route in `src/config/routes.tsx`:
```typescript
const MyNewPage = lazy(() => import('../pages/MyNewPage'));

export const pageRoutes: PageRoute[] = [
  // ... existing routes
  {
    path: '/my-page',
    title: 'pages.myPage.title',
    description: 'pages.myPage.description',
    icon: 'material-symbols:your-icon',
    category: 'pages.myPage.category',
    component: MyNewPage,
    lastUpdated: '2024-01-24',
  },
];
```

The page will automatically appear in the hub navigation!

## Theme Customization

The theme is configured in `src/theme/theme.ts` following Material You (Material 3) design principles:

- **Color System**: Primary, secondary, and semantic colors for both light and dark modes
- **Typography**: Consistent font sizes and weights following Material Design guidelines
- **Shape**: Rounded corners (12px border radius)
- **Components**: Custom styling for buttons, cards, chips, and text fields

## Internationalization

### Adding a New Language

1. Create translation file in `src/locales/[language-code]/translation.json`
2. Update `src/i18n/config.ts` to import and register the language
3. Add language to `supportedLanguages` in `src/hooks/useLanguage.ts`
4. Add flag icon to `LanguageSwitcher.tsx`

### Translation Keys

All text is translated using keys. Common patterns:
- `app.*` - Application-wide text
- `nav.*` - Navigation labels
- `pages.*` - Page-specific content
- `actions.*` - Action buttons
- `theme.*` - Theme-related text
- `language.*` - Language-related text
- `common.*` - Common/shared text

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck

# Linting
npm run lint
```

## Performance Optimizations

- **Lazy Loading**: All page components are lazy-loaded using React.lazy()
- **Code Splitting**: Automatic code splitting via Vite
- **Memoization**: Strategic use of useMemo for expensive computations
- **SCSS Modules**: CSS is scoped to components, preventing style conflicts
- **Tree Shaking**: Unused code is eliminated during build

## Accessibility Features

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management
- Screen reader friendly
- High contrast ratios for text

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.
