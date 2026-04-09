<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/778e0155-6448-4727-b1e6-aaafee9ce395

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

---

## About

**SowCast AI** is an AI-powered planting calendar designed to help farmers make smarter, data-driven decisions. Enter your location and crop of choice, and SowCast AI uses Google's Gemini AI to generate a personalized planting schedule — complete with optimal sowing windows, expected harvest dates, a phased growing timeline, rainfall analysis, and seasonal advice.

> _"Precision planting schedules tailored to your local climate and crop needs."_

## Features

- 🌱 **AI-Generated Planting Calendar** — Get tailored planting and harvest windows for any crop and location.
- 📍 **Location-Aware Insights** — Advice is customized to regional climate and seasonal rainfall patterns.
- 📅 **Growing Timeline** — A phased breakdown (land prep → sowing → vegetative → flowering → harvest) with activities and rainfall requirements per phase.
- 🌧️ **Rainfall Analysis** — AI-powered analysis of expected precipitation and its impact on your crop cycle.
- 💡 **Seasonal Advice** — Practical tips for optimizing yield based on current and historical weather trends.
- ✨ **Smooth Animations** — Polished UI with Motion (Framer Motion) transitions and loading skeletons.
- 🎨 **Beautiful Design** — Custom earth & leaf color palette, glassmorphism cards, responsive layout, and serif/sans-serif typography.

## Tech Stack

| Layer        | Technology                                                                 |
| ------------ | -------------------------------------------------------------------------- |
| **Framework**    | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool**   | [Vite 6](https://vitejs.dev/)                                             |
| **AI Model**     | [Google Gemini](https://ai.google.dev/) (`gemini-3-flash-preview`) via `@google/genai` |
| **Styling**      | [Tailwind CSS v4](https://tailwindcss.com/) + custom theme tokens          |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) (Button, Card, Input, Badge, etc.)    |
| **Animations**   | [Motion](https://motion.dev/) (Framer Motion)                              |
| **Icons**        | [Lucide React](https://lucide.dev/)                                        |
| **Typography**   | Inter, Playfair Display, JetBrains Mono (Google Fonts)                     |

## Project Structure

```
SowCast-AI/
├── components/
│   └── ui/              # shadcn/ui components (Button, Card, Input, Badge, etc.)
├── lib/
│   └── utils.ts         # Utility functions (cn helper)
├── src/
│   ├── App.tsx           # Main application component (UI + form logic)
│   ├── index.css         # Global styles, Tailwind theme, custom classes
│   ├── main.tsx          # React entry point
│   └── services/
│       └── gemini.ts     # Gemini AI integration & structured response schema
├── .env.example          # Environment variable template
├── index.html            # HTML entry point
├── metadata.json         # App metadata (name, description)
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite config with Tailwind, React plugin, and path aliases
```

## How It Works

1. The user enters a **location** (e.g., _"Nairobi, Kenya"_) and a **crop** (e.g., _"Maize"_).
2. The app sends a prompt to **Google Gemini AI** (`gemini-3-flash-preview`) requesting structured planting advice.
3. Gemini returns a **JSON response** conforming to a strict schema, including:
   - Optimal planting window (start, end, reason)
   - Expected harvest window
   - A multi-phase growing timeline with activities and rainfall requirements
   - Rainfall analysis and seasonal advice
4. The UI renders the results as interactive, animated cards with a visual timeline.

## Environment Variables

| Variable         | Description                                         | Required |
| ---------------- | --------------------------------------------------- | -------- |
| `GEMINI_API_KEY` | Your Google Gemini API key                          | ✅        |
| `APP_URL`        | The URL where the app is hosted (for deployments)   | Optional |

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

## Available Scripts

| Script          | Description                     |
| --------------- | ------------------------------- |
| `npm run dev`   | Start the dev server on port 3000 |
| `npm run build` | Build for production            |
| `npm run preview` | Preview the production build  |
| `npm run lint`  | Run TypeScript type checking    |
| `npm run clean` | Remove the `dist/` directory    |

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).
