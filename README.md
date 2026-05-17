# ShopEase Support — Vite + React
live-demo: [https://customer-support-n.netlify.app/]

AI-powered customer support chat, connected to your n8n workflow.

## Project Structure

```
shopease-support/
├── index.html
├── vite.config.js
├── package.json
├── .env
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx
    ├── App.css
    └── components/
        ├── ChatHeader.jsx / .css
        ├── ChatMessages.jsx / .css
        ├── QuickChips.jsx / .css
        ├── ChatInput.jsx / .css
        └── ConfigPanel.jsx / .css
```

## This is our n8n workflow:
<img width="1375" height="484" alt="image" src="https://github.com/user-attachments/assets/7c2b1098-4671-4e77-8877-6d6ad7f56a68" />

## Setup & Run Locally

### 1. Install dependencies
```bash
npm install
```

### 2. Add your n8n webhook URL
Open `.env` and paste your Production URL:
```
VITE_N8N_WEBHOOK_URL=https://your-instance.app.n8n.cloud/webhook/customer-support
```

### 3. Start dev server
```bash
npm run dev
```
Opens at → http://localhost:5173

---

## Deploy

### Build for production
```bash
npm run build
```
Outputs to `dist/` folder — deploy this anywhere.

### Netlify (free, easiest)
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Vercel (free, one command)
```bash
npm install -g vercel
vercel --prod
```

---

## n8n CORS Setup (important!)
In n8n → Settings → **Allowed Origins (CORS)** → set to `*`

## n8n Respond to Webhook format
```json
{ "reply": "={{ $json.output }}" }
```

> Note: Vite uses `VITE_` prefix for env variables (not `REACT_APP_`).
> Access them in code with `import.meta.env.VITE_N8N_WEBHOOK_URL`



