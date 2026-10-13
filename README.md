# LaunchLoop AI

LaunchLoop AI is an AI-powered marketing campaign planner built for independent restaurants. Restaurant owners often have limited time and resources to research competitors, decide how to promote their business, and organize a marketing campaign. LaunchLoop AI brings these steps into one simple dashboard, helping owners move from an idea to a structured plan.

The project lets an owner enter their restaurant name, location, marketing goal, and budget, then uses Tavily web research and NVIDIA Nemotron through Nebius Token Factory to suggest three marketing strategies. After selecting a strategy, the owner can generate a detailed campaign with an audience, promotion, timeline, budget breakdown, success metrics, and an editable email draft. Campaigns can be saved and reopened, while tasks and performance results can be tracked manually. This is a hackathon MVP: it does not buy advertisements or send emails automatically.

## Features

- Competitor research with Tavily and source links
- Three AI-generated strategies to compare and choose from
- Detailed campaign plans, timelines, and budget breakdowns
- Editable email drafts for owner review
- Campaign history, task progress, and manual performance tracking
- Browser-based saving with `localStorage` (same browser only)

## Technologies

- **Frontend:** React, Vite, JavaScript, CSS, Lucide icons
- **Backend:** Node.js, Express
- **AI:** NVIDIA Nemotron 3 Super 120B A12B via Nebius Token Factory
- **Research:** Tavily
- **Storage:** Browser `localStorage` for the MVP

## How to Run Locally

### Requirements

- Node.js and npm installed
- A Nebius Token Factory API key with access to the configured NVIDIA model
- A Tavily API key

### Step 1: Clone the repository

```bash
git clone https://github.com/AkshatKapo/LaunchLoopAI.git
cd LaunchLoopAI
```

### Step 2: Set up the backend

Open a terminal and run:

```bash
cd backend
npm install
```

Create a file named `.env` inside `backend/` and add your own API keys:

```env
NEBIUS_API_KEY=your_nebius_api_key
TAVILY_API_KEY=your_tavily_api_key
PORT=5000
```

Start the backend:

```bash
node server.js
```

Keep this terminal running. Never commit your real `.env` file or API keys to GitHub.

### Step 3: Start the frontend

Open a **second terminal** from the repository root:

```bash
cd frontend
npm install
npm run dev
```

Open the local address shown in the terminal (usually `http://localhost:5173`). The frontend uses `http://localhost:5000` for the backend by default. To change it, create `frontend/.env` with `VITE_API_URL=http://localhost:5000` (replace the URL as needed).

### Step 4: Try the application

1. Enter a restaurant name, location, marketing goal, and budget in **Campaign Studio**.
2. Generate and compare three marketing strategies.
3. Select one to create a detailed campaign plan.
4. Review the campaign details, budget, and email draft.
5. Save and reopen the campaign through **Campaign History**.
6. Use **Campaign Tracker** to mark tasks complete and manually record results.

## NVIDIA Nemotron and Nebius Token Factory

LaunchLoop AI uses **NVIDIA Nemotron 3 Super 120B A12B** through the **Nebius Token Factory** hosted inference API. The Node.js backend sends restaurant details and Tavily-supported research context to the model. Nemotron first produces three strategy options, then expands the selected option into a structured marketing plan.

**How Token Factory accelerated development:** Its hosted inference API allowed us to build and iterate on AI-driven campaign generation without setting up GPUs, hosting model weights, or operating our own model-serving infrastructure. This let us focus on the user experience and campaign workflow. Token Factory is the Nebius service used in this MVP; we do not claim other Nebius integrations.

## Important Notes

- AI-generated claims, discounts, and business details should be reviewed before use.
- Email drafts are not sent automatically, and no ads are purchased.
- Campaign progress and performance numbers are manually entered, not pulled from advertising platforms.
- Saved campaigns use browser `localStorage`; data does not sync across devices and may be lost if browser storage is cleared.

## Hackathon

Created for the **Nebius × NVIDIA Global AI Hackathon**, Best Apps and Agents track.

## License

Licensed under the [MIT License](LICENSE).
