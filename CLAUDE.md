# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

- **Development**: `npm run dev` - Start development server
- **Build**: `npm run build` - Build for production
- **Start**: `npm start` - Start production server
- **Lint**: `npm run lint` - Run Next.js linting

## Architecture Overview

This is a Next.js application implementing a bias assessment quiz with the following structure:

### Core Flow
1. **Landing page** (`pages/index.js`) - Introduction and start button
2. **Quiz page** (`pages/quiz.js`) - 30-question assessment with progress tracking
3. **Result page** (`pages/result.js`) - Score display and image download via html2canvas

### Question Structure
- Questions 1-10: Demographic collection (no scoring)
- Questions 11-30: Attitude assessment (scored 0=positive, 1=neutral, 2=biased)
- Final score calculated as percentage based on attitude questions only

### Key Components
- **QuestionCard** (`components/QuestionCard.js`) - Reusable question/option selector
- **AdPlaceholder** (`components/AdPlaceholder.js`) - Ad placement component

### Internationalization
- Uses next-i18next for i18n support
- Locale files in `locales/` directory (currently Korean primary, English minimal)
- Currently hardcoded to Korean text but infrastructure exists for full i18n

### Styling
- Custom CSS in `styles/` directory
- Dark mode toggle implemented with localStorage persistence
- Responsive design for mobile-first approach

### Deployment
- Configured for Vercel (recommended) or Netlify deployment
- Build command: `npm run build`, Output: `.next` directory