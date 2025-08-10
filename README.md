
# My Bias Test - Next.js scaffold

Included:
- pages/index.js (landing)
- pages/quiz.js (30-question quiz)
- pages/result.js (result + image download via html2canvas)
- components/QuestionCard.js, AdPlaceholder.js
- styles/App.css and index.css (App.css taken from uploaded file if provided)
- basic package.json

How to run locally:
1. npm install
2. npm run dev

How to deploy:
- Push this repository to GitHub.
- Connect the repo to Netlify (Import from GitHub). Build command: `npm run build`, Publish directory: `.next`
- Alternatively use Vercel (recommended for Next.js).

Notes:
- Add Google AdSense script in components/AdPlaceholder.js or in _document.js if needed.
- Add detailed translations to locales/*.json and wire up i18n (next-i18next) as desired.
