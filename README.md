# Better Notes

Still in active development.

A simple note-taking app that works in the browser and as a desktop app via Electron.

***Backend:***
https://github.com/furkankizilbuga/better-notes-server

## Tech Stack
- React + Vite
- TypeScript
- Electron
- TailwindCSS
- Shadcn/ui
- Tiptap editor
- TanStack Query & Router
- ESLint

## Setup & Running

1. Clone the project:
```bash
git clone https://github.com/furkankizilbuga/better-notes.git
cd better-notes
```

2. Create a .env file in the root directory and add the following value:
```env
VITE_BASEURL=<your_backend_url>
```

3. Install dependencies and run:
```bash
npm install
npm run dev
```
or
```bash
npm run dev:electron
```