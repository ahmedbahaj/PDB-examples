# PDB Analysis Frontend

Vue.js 3 frontend for the PDB Analysis application.

## Setup

1. **Install dependencies:**
```bash
cd frontend
npm install
```

2. **Run development server:**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

**Note:** Make sure the Flask backend is running on port 5000 for the frontend to work properly.

## Build

```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── charts/          # Chart components
│   │   ├── Sidebar.vue
│   │   ├── ChartSelector.vue
│   │   ├── ControlsPanel.vue
│   │   ├── ChartContainer.vue
│   │   └── UploadModal.vue
│   ├── stores/
│   │   └── dataStore.js     # Pinia store
│   ├── services/
│   │   └── api.js           # API client
│   ├── utils/
│   │   ├── constants.js
│   │   └── chartHelpers.js
│   ├── views/
│   │   └── Home.vue
│   ├── router/
│   │   └── index.js
│   ├── App.vue
│   └── main.js
├── package.json
└── vite.config.js
```

## Features

- Vue 3 Composition API
- Pinia for state management
- Vue Router for routing
- Highcharts for visualizations
- Axios for API calls
- Vite for fast development

