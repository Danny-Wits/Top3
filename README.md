# Top 3

> **Your class. Your vote. Completely anonymous.**

A "funky but clean" mobile-first class superlatives voting app for a closed group of 50 classmates (MCA 2025). Students vote for their top 3 picks across positive and negative categories — and the results are displayed on a real-time leaderboard.

---

## Features

- **Anonymous Voting** — the database never links a voter to their specific picks. Security is enforced via Supabase RLS + a `SECURITY DEFINER` RPC function.
- **9 Superlative Categories** — from "Highest IQ" to "Most Likely to Sleep in Class", split into *Hall of Fame* and *Drama Club* sections.
- **Weighted Scoring** — 1st place = 3 pts, 2nd place = 2 pts, 3rd place = 1 pt.
- **Swipeable Leaderboard** — browse categories with horizontal pills, touch-swipe navigation, and animated gradient score bars.
- **Profile Page** — upload an avatar via file or URL.
- **Mobile-First Design** — Mantine AppShell with glassmorphic bottom navigation, tonal surface layering, and smooth micro-animations.

---

## Tech Stack

| Layer       | Technology                                |
|-------------|-------------------------------------------|
| Framework   | [Vite](https://vitejs.dev/) + React       |
| UI Library  | [Mantine v7](https://mantine.dev/)        |
| Icons       | [@tabler/icons-react](https://tabler.io/) |
| Data        | [TanStack Query](https://tanstack.com/query) |
| Backend     | [Supabase](https://supabase.com/) (Auth, Postgres, Storage) |
| Fonts       | Epilogue (headings) + Manrope (body)      |

---

## Project Structure

```
src/
├── lib/
│   ├── supabaseClient.js    # Supabase client init
│   ├── categoryConfig.js    # Icon + description per category
│   └── studentNames.js      # Static map of 50 student names
├── hooks/
│   └── useVotes.js          # TanStack Query hooks (categories, votes, profile, leaderboard)
├── components/
│   └── BottomNav.jsx        # 4-tab mobile navigation (Vote, Leaderboard, Profile, Logout)
├── pages/
│   ├── Login.jsx            # Animated login with glassmorphic card
│   ├── Dashboard.jsx        # Category Hub (Hall of Fame / Drama Club)
│   ├── VotingInterface.jsx  # 3-pick voting form with name dropdowns
│   ├── Leaderboard.jsx      # Swipeable categories + score bars
│   └── Profile.jsx          # Avatar upload (file + URL)
├── App.jsx                  # Routing + AppShell + ProtectedRoute
├── main.jsx                 # MantineProvider + theme + QueryClient
└── style.css                # Minimal reset + login animations
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project with the required tables, RPC functions, and storage bucket.

### Setup

```bash
# Clone & install
git clone <repo-url>
cd Top3
npm install

# Create .env.local with your Supabase credentials
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Run locally
npm run dev
```

### Database

The Supabase backend requires:

- **Tables:** `profiles`, `categories`, `votes`, `vote_tracking`
- **RPC Functions:** `cast_vote` (anonymous vote submission), `get_leaderboard` (weighted score aggregation)
- **Storage Bucket:** `avatars` (public, with per-user upload policies)
- **RLS Policies:** Strict row-level security on all tables.

---

## Authentication Flow

1. Student enters their Roll Number (1–50) and a 6+ character PIN.
2. The app constructs a dummy email: `roll01@classvote.local` → `roll50@classvote.local`.
3. First login → auto-signup. Subsequent logins → sign-in with password.
4. Auth state is persisted via Supabase session management.

---

## Design System

- **Primary Color:** Indigo (`#4C6EF5`)
- **Fonts:** Epilogue 800 (headings) / Manrope 400-700 (body)
- **Radius:** `xl` on everything (cards, buttons, inputs, badges)
- **Surface:** Tonal layering — white cards on `#f1f7ff` background, no hard borders
- **Navigation:** Glassmorphic bottom bar with `backdrop-filter: blur(12px)`

---

## License

Built for the MCA 2025 batch. Not intended for public distribution.
