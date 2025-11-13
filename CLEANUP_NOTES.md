# Cleanup Notes

## Files Status

### Archived
- ✅ `index.html` → `archive/index.html.legacy` - Original single-file HTML application

### Active Files
- ✅ `backend/` - Flask REST API (active)
- ✅ `frontend/` - Vue.js application (active)
- ✅ `run_backend.py` - Main entry point for backend (active)

### Archived Files
- ✅ `upload_server.py` → `archive/upload_server.py` - Original upload server (logic integrated into backend)
- ✅ `serve.py` → `archive/serve.py` - Simple HTTP server for old HTML (replaced by Vite)

### Legacy Files (May Still Be Used)
- `run.py` - CoCoMaps analysis runner script (standalone utility, may be used independently)
- `PDB-splitter.py` - PDB file splitting utility (may be used independently)

### System Data Folders
- `1ULL/` - Analysis data
- `md_mohit_protein/` - Analysis data
- `md_mohit_system/` - Analysis data

These folders contain the actual PDB analysis results and are required for the application to function.

## Recommendations

1. **Keep legacy files** - They may be useful for reference or independent use
2. **Document purpose** - Each legacy file should have a comment explaining its purpose
3. **Consider deprecation** - If files are no longer needed, add deprecation notices

## Migration Complete

All functionality from the original `index.html` has been successfully migrated to the Vue.js + Flask architecture. The old HTML file is preserved in `archive/` for reference.

