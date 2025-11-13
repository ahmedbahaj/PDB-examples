# PDB Analysis Backend API

Flask REST API for serving PDB analysis data to the Vue.js frontend.

## Setup

1. **Install dependencies:**
```bash
pip install -r requirements.txt
```

2. **Run the server:**
```bash
# From project root
python run_backend.py

# Or from backend directory
cd backend
python run.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Systems
- `GET /api/systems` - List all available systems
- `GET /api/systems/<system_id>` - Get system details

### Data
- `GET /api/systems/<system_id>/interactions` - Get all interaction data
- `GET /api/systems/<system_id>/area` - Get buried surface area data
- `GET /api/systems/<system_id>/trends` - Get interaction type trends

### Upload
- `POST /api/upload` - Upload and process PDB file
- `GET /api/status/<pdb_id>` - Get processing status

## Project Structure

```
backend/
├── app.py              # Main Flask application
├── routes/
│   ├── systems.py     # System management endpoints
│   ├── data.py        # Data retrieval endpoints
│   └── upload.py      # Upload and processing endpoints
└── requirements.txt   # Python dependencies
```

