from MDAnalysis.coordinates import PDB
import MDAnalysis as mda
import os
from pathlib import Path

#constants
PDB_FILE = "md_mohit_system.pdb"  # Change this to your PDB file path

u = mda.Universe(PDB_FILE)

pdb_name = Path(PDB_FILE).stem
main_folder = pdb_name

#create main folder for the pdb file
os.makedirs(main_folder, exist_ok=True)

#iterate through frames
for i, ts in enumerate(u.trajectory):
    frame_folder = os.path.join(main_folder, f"frame_{i+1}")
    os.makedirs(frame_folder, exist_ok=True)

    frame_file = os.path.join(frame_folder, f"frame_{i+1}.pdb")
    with PDB.PDBWriter(frame_file) as W:
        W.write(u.atoms)
