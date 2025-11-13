# Flask Backend - Quick Start Guide

## Phase 1 Complete! ✅

The Flask backend structure has been created with all necessary API endpoints.

## Installation

1. **Install dependencies:**
```bash
cd backend
pip install -r requirements.txt
```

2. **Run the server:**
```bash
python run.py
# OR
python backend/app.py
```

The API will start on `http://localhost:5000`

## API Endpoints

### Systems
- **GET** `/api/systems` - List all available systems
- **GET** `/api/systems/<system_id>` - Get specific system details

### Data Retrieval
- **GET** `/api/systems/<system_id>/interactions` - Get all interaction data with consistency scores
- **GET** `/api/systems/<system_id>/area` - Get buried surface area data (Total, POLAR, NON POLAR)
- **GET** `/api/systems/<system_id>/trends` - Get interaction type trends across frames

### Upload & Processing
- **POST** `/api/upload` - Upload PDB file for processing
- **GET** `/api/status/<pdb_id>` - Check processing status

## Testing

Run the test script to verify endpoints:
```bash
python backend/test_api.py
```

## Project Structure

```
backend/
├── app.py                 # Main Flask application
├── run.py                 # Run script
├── routes/
│   ├── systems.py        # System management endpoints
│   ├── data.py           # Data retrieval endpoints
│   └── upload.py         # Upload/processing endpoints
├── requirements.txt       # Dependencies
└── test_api.py           # API test script
```

## Response Formats

### Systems List
```json
[
  {
    "id": "1ULL",
    "name": "1ULL",
    "path": "1ULL",
    "frames": 7
  }
]
```

### Interactions
```json
{
  "system": "1ULL",
  "totalFrames": 7,
  "interactions": [
    {
      "resName1": "G",
      "resNum1": 1,
      "chain1": "A",
      "resName2": "ARG",
      "resNum2": 11,
      "chain2": "B",
      "frameCount": 7,
      "consistency": 1.0,
      "id1": "A-G1",
      "id2": "B-ARG11",
      "typesArray": ["Proximal contact"]
    }
  ]
}
```

### Area Data
```json
{
  "system": "1ULL",
  "frames": [
    {
      "frame": 1,
      "totalBSA": 2331.8,
      "polarBSA": 1471.3,
      "nonPolarBSA": 860.6
    }
  ]
}
```

### Trends
```json
{
  "system": "1ULL",
  "trends": {
    "H-bonds": [12, 10, 11, ...],
    "Salt-bridges": [16, 15, 17, ...],
    ...
  }
}
```

## Next Steps

- **Phase 2**: Create Vue.js frontend structure
- **Phase 3**: Migrate data loading to use API
- **Phase 4**: Migrate chart components one by one

