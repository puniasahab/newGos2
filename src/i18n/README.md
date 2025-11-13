# Internationalization (i18n) Implementation

This project includes a comprehensive internationalization system using react-i18next with support for English, Arabic, and Polish languages.

## Features

- ✅ **Multi-language Support**: English (default), Arabic (RTL), Polish
- ✅ **Language Selector**: Header component with flag indicators
- ✅ **RTL Support**: Automatic direction change for Arabic
- ✅ **Persistent Selection**: Language preference saved in localStorage
- ✅ **Type Safety**: TypeScript support for all translation keys
- ✅ **Dynamic Loading**: Languages load on demand

## Installation

The required packages are already installed:
```bash
npm install react-i18next i18next
```

## File Structure

```
src/
├── i18n/
│   ├── index.ts                    # i18n configuration
│   └── locales/
│       ├── en.json                # English translations
│       ├── ar.json                # Arabic translations
│       └── pl.json                # Polish translations
├── contexts/
│   └── LanguageContext.tsx       # Language context provider
├── components/
│   └── LanguageSelector/
│       └── index.tsx              # Language selector component
├── utils/
│   └── i18nHelpers.ts            # i18n utility functions
└── main.tsx                       # i18n initialization
```

## Usage

### Basic Translation in Components

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <button>{t('common.submit')}</button>
    </div>
  );
};
```

### Using Language Context

```tsx
import { useLanguage } from '../contexts/LanguageContext';

const MyComponent = () => {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  
  const handleLanguageChange = (languageCode: string) => {
    changeLanguage(languageCode);
  };
  
  return (
    <select value={currentLanguage} onChange={e => handleLanguageChange(e.target.value)}>
      {availableLanguages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.nativeName}
        </option>
      ))}
    </select>
  );
};
```

### Translation Keys Structure

```json
{
  "common": {
    "skip": "Skip",
    "next": "Next",
    "submit": "Submit"
  },
  "auth": {
    "login": "Login",
    "email": "Email",
    "password": "Password"
  },
  "game": {
    "score": "Score",
    "played": "Played",
    "timeLeft": "Time Left"
  }
}
```

## Language Configuration

### Supported Languages

| Language | Code | Direction | Flag | Status |
|----------|------|-----------|------|---------|
| English  | `en` | LTR       | 🇺🇸   | ✅ Default |
| Arabic   | `ar` | RTL       | 🇸🇦   | ✅ Complete |
| Polish   | `pl` | LTR       | 🇵🇱   | ✅ Complete |

### Adding New Languages

1. **Create translation file**:
   ```bash
   src/i18n/locales/[language_code].json
   ```

2. **Update language utilities**:
   ```typescript
   // src/utils/i18nHelpers.ts
   export const getAvailableLanguages = () => {
     return [
       // ... existing languages
       { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' }
     ];
   };
   ```

3. **Import in i18n config**:
   ```typescript
   // src/i18n/index.ts
   import fr from './locales/fr.json';
   
   const resources = {
     // ... existing languages
     fr: { translation: fr }
   };
   ```

## RTL Support

Arabic language automatically enables RTL (Right-to-Left) support:

- Document direction changes to `rtl`
- Body text alignment adjusts
- Component layouts mirror appropriately
- All text elements align to the right

## Implementation Details

### Components Updated with i18n

✅ **Header Component**
- Language selector with flags
- Profile and menu translations

✅ **Questions Component**
- Game stats (Played, Score)
- Timer text
- Skip button
- Navigation warnings

✅ **Timer Component**
- "seconds left" text
- Timer duration labels

✅ **Login Component** (Partial)
- Form placeholders and labels
- Error messages
- Button text

### Translation Categories

- **common**: Buttons, actions, general UI
- **auth**: Login, registration, verification
- **navigation**: Menu items, routing
- **game**: Game-specific terms, scoring
- **results**: Score displays, statistics
- **profile**: User profile management
- **leaderboard**: Rankings, positions
- **messages**: Alerts, notifications
- **timer**: Time-related text
- **errors**: Error messages, validation

## Best Practices

1. **Namespace Organization**: Group related translations in logical namespaces
2. **Key Naming**: Use descriptive, hierarchical keys (`game.score` vs `score`)
3. **Placeholder Support**: Use interpolation for dynamic values
4. **Fallback Strategy**: English serves as fallback language
5. **Component Isolation**: Each component imports `useTranslation` independently

## Testing Languages

1. **Open the application** in your browser
2. **Click the language selector** in the header (Globe icon with current language)
3. **Select desired language** from the dropdown
4. **Observe changes**:
   - Text translations
   - RTL layout for Arabic
   - Persistent selection on refresh

## Development Notes

- Language preference persists across browser sessions
- RTL support includes document direction and text alignment
- Translation loading is optimized for performance
- TypeScript provides type safety for translation keys
- Components gracefully handle missing translations

## Future Enhancements

- [ ] Add more languages (French, German, Spanish)
- [ ] Implement translation validation tools
- [ ] Add number and date localization
- [ ] Create translation management dashboard
- [ ] Add pluralization support
- [ ] Implement lazy loading for large translation files

## Troubleshooting

### Common Issues

1. **Missing translations**: Check if key exists in all language files
2. **RTL layout issues**: Verify CSS supports RTL direction
3. **Language not persisting**: Check localStorage implementation
4. **Component not updating**: Ensure component uses `useTranslation` hook

### Debug Mode

Enable i18n debug mode in development:

```typescript
// src/i18n/index.ts
i18n.init({
  debug: process.env.NODE_ENV === 'development',
  // ... other config
});
```

## Contributing

When adding new features:

1. Add translation keys to all language files
2. Use semantic key naming
3. Test with all supported languages
4. Verify RTL layout for Arabic
5. Update this documentation
