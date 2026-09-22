# Cadence - Organizational Audit & Automation Platform

MVP website for Cadence featuring AI-powered organizational diagnostic questionnaire powered by Claude API.

## Quick Start

### 1. Installation

```bash
npm install
```

### 2. Environment Setup

Create a `.env.local` file with your API keys:

```bash
CLAUDE_API_KEY=your_anthropic_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
cadence-web/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   ├── questionnaire/
│   │   ├── page.tsx       # Questionnaire form
│   │   └── results/
│   │       └── page.tsx   # Results display
│   └── api/
│       └── analyze/
│           └── route.ts   # Claude API endpoint
├── components/
│   └── QuestionnaireForm.tsx    # Form component
├── lib/
│   └── claude.ts          # Claude API client
├── public/                # Static files
└── package.json
```

## Features

### Current (MVP)
- **Home Page** - Value proposition and how-it-works
- **10-Question Diagnostic** - Mobile-optimized form
- **Claude API Integration** - Real-time analysis with streaming
- **Results Page** - Score, summary, and top 3 recommendations
- **Trust Signals** - RGPD badge, France hosting callout
- **Responsive Design** - Mobile-first Tailwind CSS

### In Development
- Google Analytics 4 integration
- Sentry error monitoring
- Performance monitoring

## API Integration

The application uses Claude API for real-time diagnostic analysis:

- **Model:** claude-3-5-sonnet-20241022
- **Streaming:** Yes (real-time token streaming)
- **Max Tokens:** 1024 per request
- **System Prompt:** Custom diagnostic framework

### Claude API Response Format

```json
{
  "score": 75,
  "scoreLabel": "Good",
  "summary": "Your organization has moderate automation...",
  "recommendations": [
    {
      "title": "Process Automation",
      "description": "...",
      "priority": "high",
      "estimatedImpact": "30% time savings"
    }
  ],
  "nextSteps": ["...", "...", "..."]
}
```

## Deployment

### Netlify

1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard:
   - `CLAUDE_API_KEY`
   - `NEXT_PUBLIC_SITE_URL`

### Build

```bash
npm run build
npm run start
```

## Technology Stack

- **Framework:** Next.js 14 (React 18)
- **Styling:** Tailwind CSS + Lucide React icons
- **API:** Claude 3.5 Sonnet (Anthropic)
- **Language:** TypeScript
- **Deployment:** Netlify

## Development

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## Monitoring & Analytics

### Google Analytics 4
- Add your GA4 Measurement ID to:
  - `app/layout.tsx` (replace `G-PLACEHOLDER`)
  - Environment variable: `NEXT_PUBLIC_GA_ID`

### Sentry (Coming Soon)
- Error tracking and performance monitoring

## Privacy & Compliance

- ✅ RGPD Compliant
- ✅ No unnecessary data collection
- ✅ Hosted in France (via Netlify)
- 🔄 Privacy Policy (template)
- 🔄 Terms of Service (template)

## Timeline

- **Days 1-3:** Setup & Architecture (✅ Complete)
- **Days 4-7:** Frontend Development (🔄 In Progress)
- **Days 8-10:** Claude Integration & Deployment
- **Days 11-14:** Launch Polish & Monitoring

## Support

For issues or feature requests, contact: contact@cadence.ai

---

**Project Status:** MVP Development  
**Last Updated:** 2026-09-22  
**Owner:** Boutaina
