This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Components

- Resume viewer, parser, and html generator.
- MongoDB to manage text content; quotes and bio.
- The Wilting Demo, a unity game I am making. _STILL UNDER CONSTRUCTION ETA 3/24/25_

## Secrets

- NEXT_PUBLIC_CURRENT_RESUME: Location of the current Resume PDF.
- NEXT_PUBLIC_UNITY_ENABLED: Feature flag to enable Unity WebGL player.
- MONGODB_URI: MongoDB connection string.
- MONGODB_DB: Collection name.

## Hosting

- Hosted on Vercel, utilizing their Hobby plan and taking advantage of their speed and analytics packages.
