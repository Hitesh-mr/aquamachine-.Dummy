<div align="center">

# 💧 Aqua Machines Solutions

**A modern, responsive website for a water purifier (RO/UV) sales & service business.**

Built with React, TypeScript, and Material UI — showcasing a full product catalog, service plans, and customer enquiry flow with WhatsApp integration.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-7-007FFF?logo=mui&logoColor=white)
![License](https://img.shields.io/badge/license-Private-lightgrey)

</div>

---

## 📖 About

**Aqua Machines Solutions** is the marketing and catalog website for a water purification business. It presents the brand, lets customers browse and filter **26+ RO/UV purifier products**, explore **5 service plans** (installation, servicing, AMC, etc.), read testimonials, and get in touch instantly via a contact form that forwards straight to WhatsApp.

## ✨ Features

| Section | What it does |
|---|---|
| 🏠 **Hero** | Animated landing banner with brand tagline, trust badges, and a "Explore Products" CTA |
| 📊 **Stats Bar** | Highlights customers served, product range, years of experience, satisfaction rate |
| ✅ **Why Choose Us** | Quality assurance, expert guidance, pro installation, 24x7 support, doorstep service |
| 🔄 **How It Works** | Simple 3-step journey: choose → book → enjoy pure water |
| 🛒 **Product Catalog** | Search, filter by category & price range, sort by price/discount, detailed product modal |
| ⭐ **Testimonials** | Customer reviews with star ratings |
| 🛠️ **Services** | Priced service plans (regular servicing, installation, AMC, commercial maintenance) with duration & inclusions |
| 🏢 **About** | Company story and mission |
| 📞 **Contact** | Validated enquiry form that opens a pre-filled WhatsApp message; phone, WhatsApp & service-area cards |
| 🛍️ **Cart & Floating CTA** | Persistent call-to-action button and a cart drawer for product enquiries |

## 🧰 Tech Stack

- **React 19** + **TypeScript**
- **Vite 6** — build tool & dev server
- **Material UI (MUI) 7** — component library (`@mui/material`, `@mui/icons-material`)
- **Emotion** — CSS-in-JS styling engine (used by MUI)
- **React Router DOM** — routing
- **Fontsource** — self-hosted Poppins & Roboto fonts

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── FloatingCTA.tsx
│   ├── CartDrawer.tsx
│   ├── ProductCard.tsx
│   └── ProductDetailModal.tsx
├── context/
│   └── CartContext.tsx        # Cart state management
├── data/
│   └── products.ts            # Product & service catalog data
├── pages/
│   ├── HomePage.tsx            # Main single-page layout
│   ├── ProductsPage.tsx
│   ├── ProductDetailPage.tsx
│   ├── ServicesPage.tsx
│   └── AboutPage.tsx
├── theme.ts                    # MUI theme configuration
├── App.tsx
└── main.tsx
public/
├── Products/                   # Product images
└── ...                         # Brand & marketing images
```

## 🚀 Getting Started

**Prerequisites:** Node.js

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Type-check and build the app for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |


## 📄 License

Private project — all rights reserved.
