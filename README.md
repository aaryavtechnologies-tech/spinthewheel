# FestiveKart Navratri Spin

A production-ready, mobile-first Navratri spin-to-win landing page. The prize wheel uses equal, cryptographically seeded client-side odds and keeps the visual pointer aligned with the selected prize.

## Highlights

- Eight prizes with equal 12.5% odds
- Responsive wheel-first layout for phones, tablets, and desktops
- Accessible controls, reduced-motion support, sound preference, keyboard navigation, and focus states
- Prize modal, coupon copy flow, countdown, testimonials, FAQ, and festive offer cards
- Static Next.js export, ready for Cloudflare Pages

## Local development

Requires Node.js 22 or newer.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
npm run test:ui
```

The production output is generated in `out/`.

## Deploy to Cloudflare Pages

1. In Cloudflare, open **Workers & Pages**, select **Create application**, then choose **Pages** and **Import an existing Git repository**.
2. Connect this GitHub repository and choose `main` as the production branch.
3. Select the **Next.js (Static HTML Export)** framework preset.
4. Confirm these settings:
   - Build command: `npx next build`
   - Build output directory: `out`
   - Root directory: `/`
5. Select **Save and Deploy**. Future pushes to `main` will deploy automatically.

Cloudflare guide: https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/

## Direct upload alternative

After `npm run build`, deploy the generated folder with:

```bash
npx wrangler pages deploy out
```

Git integration is recommended for this repository because it provides automatic production and preview deployments.
